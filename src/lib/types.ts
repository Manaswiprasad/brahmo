export interface Drug {
  id: string;
  generic_name: string;
  generic_name_normalized: string;
  drug_class: string;
  renal_dosing: Record<string, any>;
}

export interface DrugInteraction {
  id: string;
  drug_a_id: string;
  drug_b_id: string;
  severity: 'CONTRAINDICATED' | 'SEVERE' | 'MODERATE' | 'MINOR';
  mechanism: string;
  clinical_effect: string;
  management: string;
}

export interface AllergyCrossReactivity {
  id: string;
  drug_class_a: string;
  drug_class_b: string;
  cross_reactivity_pct: number;
  clinical_guidance: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: 'M' | 'F';
  medications: string[];
  allergies: string[];
  creatinine: number;
  conditions: string[];
  vitals?: Record<string, any>;
  labs?: Record<string, any>;
  summary: string;
}

export interface SafetyAlert {
  level: 'HARD BLOCK' | 'SEVERE' | 'MODERATE' | 'INFO';
  message: string;
  icon: string; // ⛔, ⚠️, ℹ️
}

export interface SafetyCheckResult {
  alerts: SafetyAlert[];
  constraintText: string;
  eGFR?: number;
  cha2ds2Vasc?: number;
}
