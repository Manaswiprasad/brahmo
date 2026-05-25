export function calculateEGFR(creatinine: number, age: number, sex: 'M' | 'F'): number {
  // CKD-EPI 2021 formula
  const kappa = sex === 'F' ? 0.7 : 0.9;
  const alpha = sex === 'F' ? -0.241 : -0.302;
  const multiplier = sex === 'F' ? 1.012 : 1.0;
  
  const minScrKappa = Math.min(creatinine / kappa, 1);
  const maxScrKappa = Math.max(creatinine / kappa, 1);
  
  const eGFR = 142 * Math.pow(minScrKappa, alpha) * Math.pow(maxScrKappa, -1.200) * Math.pow(0.9938, age) * multiplier;
  
  return Math.round(eGFR * 10) / 10;
}

export function calculateCha2ds2Vasc(patient: { age: number; sex: 'M' | 'F'; conditions: string[] }): number {
  let score = 0;
  
  const has = (cond: string) => patient.conditions.some(c => c.toLowerCase().includes(cond.toLowerCase()));
  
  if (has('HF') || has('CHF') || has('heart failure')) score += 1; // C
  if (has('HTN') || has('hypertension')) score += 1; // H
  
  if (patient.age >= 75) score += 2; // A2
  else if (patient.age >= 65 && patient.age <= 74) score += 1; // A
  
  if (has('DM') || has('diabetes') || has('T2DM')) score += 1; // D
  
  if (has('stroke') || has('TIA')) score += 2; // S2
  if (has('vascular') || has('MI') || has('PAD')) score += 1; // V
  
  if (patient.sex === 'F') score += 1; // Sc
  
  return score;
}
