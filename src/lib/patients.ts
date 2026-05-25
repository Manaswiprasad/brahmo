import { Patient } from './types';

export const PATIENTS: Patient[] = [
  {
    id: "1",
    name: "Arthur Pendelton (CKD & T2DM)",
    age: 65,
    sex: "M",
    medications: ["metformin", "glimepiride", "telmisartan", "atorvastatin"],
    allergies: ["Penicillin (ANAPHYLAXIS 2023)"],
    creatinine: 2.1,
    conditions: [],
    vitals: { HR: 110, BP: "90/60", SpO2: "94%" },
    labs: { eGFR: 31.2, HbA1c: 8.4, K: 5.1, Trop: 4.8 },
    summary: "65M | Meds: Metformin 1g BD, Glimepiride 2mg OD, Telmisartan 40mg OD, Atorvastatin 20mg HS | Allergy: Penicillin (ANAPHYLAXIS 2023) | Cr 2.1, eGFR 31.2, HbA1c 8.4, K+ 5.1, Trop 4.8 | HR 110, BP 90/60, SpO2 94%"
  },
  {
    id: "2",
    name: "Eleanor Vance (Post-Op)",
    age: 58,
    sex: "F",
    medications: ["enoxaparin", "paracetamol", "tramadol", "pantoprazole"],
    allergies: ["NKDA"],
    creatinine: 0.9,
    conditions: [],
    labs: { eGFR: 82, Hb: 10.2 },
    summary: "58F | Meds: Enoxaparin 40mg SC, Paracetamol 1g QDS, Tramadol 50mg TDS, Pantoprazole 40mg | Allergy: NKDA | Cr 0.9, eGFR 82, Hb 10.2"
  },
  {
    id: "3",
    name: "George Abernathy (Geriatric Polypharmacy & UTI)",
    age: 78,
    sex: "M",
    medications: ["amlodipine", "telmisartan", "metformin", "glimepiride", "atorvastatin", "aspirin", "pantoprazole", "escitalopram", "tamsulosin", "paracetamol", "diclofenac", "calcium"],
    allergies: ["Sulfonamide (rash)"],
    creatinine: 1.4,
    conditions: [],
    labs: { eGFR: 48, K: 4.8 },
    summary: "78M | Meds: Amlodipine 10mg, Telmisartan 80mg, Metformin 500mg BD, Glimepiride 1mg, Atorvastatin 40mg, Aspirin 75mg, Pantoprazole 20mg, Escitalopram 10mg, Tamsulosin 0.4mg, Paracetamol PRN, Diclofenac PRN (OTC), Calcium+D3 | Allergy: Sulfonamide (rash) | Cr 1.4, eGFR 48, K+ 4.8"
  },
  {
    id: "4",
    name: "Leo Carter (Pediatric Epilepsy)",
    age: 6,
    sex: "M",
    medications: ["sodium valproate", "levetiracetam"],
    allergies: ["NKDA"],
    creatinine: 0.5,
    conditions: [],
    labs: { "Valproate level": 85 },
    summary: "6yo, 20kg | Meds: Sodium Valproate 200mg BD, Levetiracetam 250mg BD | Allergy: NKDA | Valproate level 85"
  },
  {
    id: "5",
    name: "Frank Russo (End-Stage Renal)",
    age: 62,
    sex: "M",
    medications: ["furosemide", "carvedilol", "amlodipine", "erythropoietin", "calcium"],
    allergies: ["ACE inhibitors (angioedema)"],
    creatinine: 4.8,
    conditions: [],
    labs: { eGFR: 12, K: 5.6 },
    summary: "62M | Meds: Furosemide 80mg BD, Carvedilol 12.5mg BD, Amlodipine 5mg, Erythropoietin weekly, Calcium 500mg TDS | Allergy: ACE inhibitors (angioedema) | Cr 4.8, eGFR 12, K+ 5.6"
  },
  {
    id: "6",
    name: "Clara Bennett (Gestational Hypertension)",
    age: 28,
    sex: "F",
    medications: ["methyldopa", "folic acid", "iron"],
    allergies: ["Codeine (nausea)"],
    creatinine: 0.6,
    conditions: ["32 weeks pregnant"],
    labs: { Hb: 10.8, Cr: 0.6 },
    summary: "28F, 32 weeks pregnant | Meds: Methyldopa 250mg TDS, Folic acid 5mg, Iron 200mg | Allergy: Codeine (nausea) | Hb 10.8, Cr 0.6"
  },
  {
    id: "7",
    name: "Elena Rostova (ICU Severe Sepsis)",
    age: 35,
    sex: "F",
    medications: ["meropenem", "noradrenaline", "insulin", "enoxaparin", "pantoprazole"],
    allergies: ["Penicillin (rash, NOT anaphylaxis)"],
    creatinine: 3.2,
    conditions: ["ICU"],
    vitals: { HR: 118, BP: "85/50", SpO2: "92%", RR: 28, Temp: 39.2 },
    labs: { eGFR: 18, WBC: 22, Lactate: 4.8 },
    summary: "35F ICU | Meds: Meropenem 1g IV TDS, Noradrenaline, Insulin infusion, Enoxaparin 40mg, Pantoprazole 40mg IV | Allergy: Penicillin (rash, NOT anaphylaxis) | Cr 3.2, eGFR 18, WBC 22, Lactate 4.8 | HR 118, BP 85/50, SpO2 92%, RR 28, Temp 39.2"
  },
  {
    id: "8",
    name: "Thomas Sterling (AFib & Stroke Risk)",
    age: 68,
    sex: "M",
    medications: ["warfarin", "bisoprolol", "ramipril", "atorvastatin", "furosemide", "spironolactone"],
    allergies: ["NKDA"],
    creatinine: 1.1,
    conditions: ["AF", "HF", "CHF", "HTN", "T2DM", "TIA"],
    labs: { INR: 2.8, eGFR: 62, K: 4.9, BNP: 450 },
    summary: "68M | Meds: Warfarin 5mg, Bisoprolol 5mg, Ramipril 5mg, Atorvastatin 80mg, Furosemide 40mg, Spironolactone 25mg | Allergy: NKDA | Conditions: AF, HF (EF 35%), HTN, T2DM, Previous TIA (2022) | INR 2.8, eGFR 62, K+ 4.9, BNP 450"
  },
  {
    id: "9",
    name: "Samuel Choi (Diabetic Neuropathy)",
    age: 55,
    sex: "M",
    medications: ["metformin", "empagliflozin", "insulin glargine", "pregabalin", "duloxetine", "aspirin"],
    allergies: ["Metoclopramide (dystonia)"],
    creatinine: 1.0,
    conditions: [],
    labs: { eGFR: 72, HbA1c: 7.8 },
    summary: "55M | Meds: Metformin 1g BD, Empagliflozin 10mg, Insulin Glargine 24U, Pregabalin 150mg BD, Duloxetine 60mg, Aspirin 75mg | Allergy: Metoclopramide (dystonia) | Cr 1.0, eGFR 72, HbA1c 7.8"
  },
  {
    id: "10",
    name: "Julian Brooks (Pediatric Asthma)",
    age: 10,
    sex: "M",
    medications: ["salbutamol", "fluticasone", "montelukast"],
    allergies: ["Aspirin (bronchospasm)"],
    creatinine: 0.6,
    conditions: [],
    labs: { FEV1: "78%" },
    summary: "10yo, 35kg | Meds: Salbutamol PRN, Fluticasone 125μg BD, Montelukast 5mg | Allergy: Aspirin (bronchospasm) | FEV1 78%"
  }
];
