import { supabase } from './supabase';
import { Drug, DrugInteraction, Patient, SafetyCheckResult, SafetyAlert, AllergyCrossReactivity } from './types';
import { calculateEGFR, calculateCha2ds2Vasc } from './calculators';

import { mockDrugs, mockInteractions, mockAllergies } from './mockData';

// In-memory cache for deterministic checks under 100ms
let drugsCache: Map<string, Drug> | null = null;
let interactionsCache: DrugInteraction[] | null = null;
let allergiesCache: AllergyCrossReactivity[] | null = null;

async function ensureCache() {
  if (drugsCache && interactionsCache && allergiesCache) return;

  let drugs: any[] = [];
  let interactions: any[] = [];
  let allergies: any[] = [];

  try {
    const [drugsRes, interactionsRes, allergiesRes] = await Promise.all([
      supabase.from('drugs').select('*'),
      supabase.from('drug_interactions').select('*'),
      supabase.from('allergy_cross_reactivity').select('*')
    ]);

    if (!drugsRes.error && drugsRes.data && drugsRes.data.length > 0) {
      drugs = drugsRes.data;
      interactions = interactionsRes.data || [];
      allergies = allergiesRes.data || [];
    } else {
      throw new Error('Supabase fetch failed or returned empty data');
    }
  } catch (err) {
    console.warn('Falling back to local mock data due to Supabase error:', err);
    drugs = mockDrugs;
    interactions = mockInteractions;
    allergies = mockAllergies;
  }

  drugsCache = new Map((drugs || []).map(d => [d.generic_name_normalized.toLowerCase(), d]));
  interactionsCache = interactions || [];
  allergiesCache = allergies || [];
}

export async function runSafetyChecks(newDrugName: string, patient: Patient): Promise<SafetyCheckResult> {
  await ensureCache();
  
  const alerts: SafetyAlert[] = [];
  const normalizedNewDrugName = newDrugName.toLowerCase().trim();
  const newDrug = drugsCache?.get(normalizedNewDrugName);

  // Compute Calculators based on the prompt's scenarios
  const eGFR = patient.labs?.eGFR || (patient.creatinine ? calculateEGFR(patient.creatinine, patient.age, patient.sex) : undefined);
  const cha2ds2Vasc = calculateCha2ds2Vasc(patient);

  if (!newDrug) {
    alerts.push({
      level: 'INFO',
      message: `Drug ${newDrugName} not found in safety database. Caution advised.`,
      icon: 'ℹ️'
    });
    return { alerts, constraintText: generateConstraintText(alerts), eGFR, cha2ds2Vasc };
  }

  // 1. checkDrugInteractions
  const allMeds = [...patient.medications.map(m => m.toLowerCase().trim())];
  
  // Find interactions where new drug interacts with any existing med
  for (const existingMedName of allMeds) {
    const existingDrug = drugsCache?.get(existingMedName);
    if (!existingDrug) continue;

    // Check both directions
    const interaction = interactionsCache?.find(i => 
      (i.drug_a_id === newDrug.id && i.drug_b_id === existingDrug.id) ||
      (i.drug_b_id === newDrug.id && i.drug_a_id === existingDrug.id)
    );

    if (interaction) {
      alerts.push({
        level: interaction.severity === 'CONTRAINDICATED' ? 'HARD BLOCK' : interaction.severity === 'SEVERE' ? 'SEVERE' : 'MODERATE',
        message: `${newDrug.generic_name} + ${existingDrug.generic_name} → ${interaction.mechanism} → ${interaction.clinical_effect}. ${interaction.management}`,
        icon: interaction.severity === 'CONTRAINDICATED' ? '⛔' : '⚠️'
      });
    }
  }

  // Bonus: check interactions among existing meds (triple whammy catch)
  for (let i = 0; i < allMeds.length; i++) {
    for (let j = i + 1; j < allMeds.length; j++) {
      const d1 = drugsCache?.get(allMeds[i]);
      const d2 = drugsCache?.get(allMeds[j]);
      if (!d1 || !d2) continue;

      const interaction = interactionsCache?.find(ix => 
        (ix.drug_a_id === d1.id && ix.drug_b_id === d2.id) ||
        (ix.drug_b_id === d1.id && ix.drug_a_id === d2.id)
      );

      if (interaction) {
        alerts.push({
          level: interaction.severity === 'CONTRAINDICATED' ? 'HARD BLOCK' : interaction.severity === 'SEVERE' ? 'SEVERE' : 'MODERATE',
          message: `Existing Meds: ${d1.generic_name} + ${d2.generic_name} → ${interaction.mechanism} → ${interaction.clinical_effect}`,
          icon: interaction.severity === 'CONTRAINDICATED' ? '⛔' : '⚠️'
        });
      }
    }
  }

  // 2. checkAllergyConflicts
  if (patient.allergies.length > 0 && patient.allergies[0] !== 'NKDA') {
    for (const allergyString of patient.allergies) {
      // e.g. "Penicillin (ANAPHYLAXIS)" -> base = "penicillin", "NSAID (rash)" -> "nsaid"
      const baseAllergyMatch = allergyString.match(/^([a-zA-Z\s\-]+)/);
      const baseAllergy = baseAllergyMatch ? baseAllergyMatch[1].trim().toLowerCase() : '';
      const isAnaphylaxis = allergyString.toLowerCase().includes('anaphylaxis');

      if (baseAllergy) {
        // Direct match check (by drug class)
        // Some drugs may match the base allergy directly by class
        const crossReactivity = allergiesCache?.find(a => 
          (a.drug_class_a.toLowerCase() === baseAllergy && a.drug_class_b.toLowerCase() === newDrug.drug_class.toLowerCase()) ||
          (a.drug_class_b.toLowerCase() === baseAllergy && a.drug_class_a.toLowerCase() === newDrug.drug_class.toLowerCase())
        );

        if (crossReactivity) {
          if (crossReactivity.cross_reactivity_pct === 100) {
            alerts.push({
              level: 'HARD BLOCK',
              message: `${newDrug.generic_name} is a ${newDrug.drug_class}. Documented allergy to ${baseAllergy}. ${crossReactivity.clinical_guidance}.`,
              icon: '⛔'
            });
          } else {
             const level = isAnaphylaxis ? 'HARD BLOCK' : 'SEVERE';
             alerts.push({
               level: level,
               message: `${newDrug.generic_name} (${newDrug.drug_class}) has ${crossReactivity.cross_reactivity_pct}% cross-reactivity with ${baseAllergy}. ${crossReactivity.clinical_guidance}.`,
               icon: level === 'HARD BLOCK' ? '⛔' : '⚠️'
             });
          }
        }
      }
    }
  }

  // 3. checkRenalDosing
  if (eGFR !== undefined && newDrug.renal_dosing?.rules) {
    for (const rule of newDrug.renal_dosing.rules) {
      const matchLess = rule.eGFR_less_than ? eGFR < rule.eGFR_less_than : true;
      const matchGreater = rule.eGFR_greater_equal ? eGFR >= rule.eGFR_greater_equal : true;

      if (matchLess && matchGreater) {
        const isContraindicated = rule.action.toLowerCase().includes('contraindicated') || rule.action.toLowerCase().includes('avoid');
        alerts.push({
          level: isContraindicated ? 'SEVERE' : 'MODERATE',
          message: `${newDrug.generic_name} renal dosing: eGFR is ${eGFR}. ${rule.action.toUpperCase()}`,
          icon: '⚠️'
        });
        break; // apply only the most specific rule matched
      }
    }
  }

  // 4. check Score based specific logic
  if (cha2ds2Vasc >= 2 && patient.sex === 'M' || cha2ds2Vasc >= 3 && patient.sex === 'F') {
    // If asking about anticoagulation or AF
    alerts.push({
      level: 'INFO',
      message: `CHA₂DS₂-VASc = ${cha2ds2Vasc}. Stroke risk is elevated. Anticoagulation STRONGLY indicated.`,
      icon: 'ℹ️'
    });
  }

  return {
    alerts,
    constraintText: generateConstraintText(alerts, eGFR, cha2ds2Vasc),
    eGFR,
    cha2ds2Vasc
  };
}

function generateConstraintText(alerts: SafetyAlert[], eGFR?: number, cha2ds2Vasc?: number): string {
  if (alerts.length === 0) return '';
  
  let text = 'YOU MUST ADHERE TO THE FOLLOWING DETERMINISTIC SAFETY CONSTRAINTS. DO NOT OVERRIDE THEM.\n\n';
  
  if (eGFR !== undefined) text += `Calculated eGFR: ${eGFR} mL/min/1.73m²\n`;
  if (cha2ds2Vasc !== undefined) text += `Calculated CHA₂DS₂-VASc Score: ${cha2ds2Vasc}\n`;
  text += '\n';

  // Sort: HARD BLOCK first, then SEVERE, then MODERATE, then INFO
  const sorted = [...alerts].sort((a, b) => {
    const priority = { 'HARD BLOCK': 0, 'SEVERE': 1, 'MODERATE': 2, 'INFO': 3 };
    return priority[a.level] - priority[b.level];
  });

  for (const alert of sorted) {
    if (alert.level === 'HARD BLOCK') {
      text += `⛔ HARD BLOCK (Importance 10): ${alert.message}\n`;
    } else if (alert.level === 'SEVERE') {
      text += `⚠️ SEVERE WARNING: ${alert.message}\n`;
    } else if (alert.level === 'MODERATE') {
      text += `⚠️ MODERATE WARNING: ${alert.message}\n`;
    } else {
      text += `ℹ️ INFO: ${alert.message}\n`;
    }
  }

  return text;
}
