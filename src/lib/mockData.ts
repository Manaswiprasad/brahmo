export const mockDrugs = [
  {
    "id": "1",
    "generic_name": "Metformin",
    "generic_name_normalized": "metformin",
    "drug_class": "biguanide",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "contraindicated"
        }
      ]
    }
  },
  {
    "id": "2",
    "generic_name": "Glimepiride",
    "generic_name_normalized": "glimepiride",
    "drug_class": "sulfonylurea",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "avoid"
        }
      ]
    }
  },
  {
    "id": "3",
    "generic_name": "Empagliflozin",
    "generic_name_normalized": "empagliflozin",
    "drug_class": "sglt2i",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 20,
          "action": "avoid"
        }
      ]
    }
  },
  {
    "id": "4",
    "generic_name": "Insulin Glargine",
    "generic_name_normalized": "insulin glargine",
    "drug_class": "insulin",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 100,
          "action": "reduce as eGFR declines"
        }
      ]
    }
  },
  {
    "id": "5",
    "generic_name": "Atorvastatin",
    "generic_name_normalized": "atorvastatin",
    "drug_class": "statin",
    "renal_dosing": {}
  },
  {
    "id": "6",
    "generic_name": "Rosuvastatin",
    "generic_name_normalized": "rosuvastatin",
    "drug_class": "statin",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "start low"
        }
      ]
    }
  },
  {
    "id": "7",
    "generic_name": "Amlodipine",
    "generic_name_normalized": "amlodipine",
    "drug_class": "ccb",
    "renal_dosing": {}
  },
  {
    "id": "8",
    "generic_name": "Telmisartan",
    "generic_name_normalized": "telmisartan",
    "drug_class": "arb",
    "renal_dosing": {
      "rules": [
        {
          "action": "monitor K+ in CKD"
        }
      ]
    }
  },
  {
    "id": "9",
    "generic_name": "Ramipril",
    "generic_name_normalized": "ramipril",
    "drug_class": "ace_inhibitor",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "reduce"
        }
      ]
    }
  },
  {
    "id": "10",
    "generic_name": "Lisinopril",
    "generic_name_normalized": "lisinopril",
    "drug_class": "ace_inhibitor",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "reduce"
        }
      ]
    }
  },
  {
    "id": "11",
    "generic_name": "Furosemide",
    "generic_name_normalized": "furosemide",
    "drug_class": "loop_diuretic",
    "renal_dosing": {
      "rules": [
        {
          "action": "higher doses in CKD"
        }
      ]
    }
  },
  {
    "id": "12",
    "generic_name": "Spironolactone",
    "generic_name_normalized": "spironolactone",
    "drug_class": "k_sparing_diuretic",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "avoid"
        }
      ]
    }
  },
  {
    "id": "13",
    "generic_name": "Bisoprolol",
    "generic_name_normalized": "bisoprolol",
    "drug_class": "beta_blocker",
    "renal_dosing": {}
  },
  {
    "id": "14",
    "generic_name": "Carvedilol",
    "generic_name_normalized": "carvedilol",
    "drug_class": "beta_blocker",
    "renal_dosing": {}
  },
  {
    "id": "15",
    "generic_name": "Aspirin",
    "generic_name_normalized": "aspirin",
    "drug_class": "antiplatelet",
    "renal_dosing": {}
  },
  {
    "id": "16",
    "generic_name": "Clopidogrel",
    "generic_name_normalized": "clopidogrel",
    "drug_class": "antiplatelet",
    "renal_dosing": {}
  },
  {
    "id": "17",
    "generic_name": "Ticagrelor",
    "generic_name_normalized": "ticagrelor",
    "drug_class": "antiplatelet",
    "renal_dosing": {}
  },
  {
    "id": "18",
    "generic_name": "Warfarin",
    "generic_name_normalized": "warfarin",
    "drug_class": "vka",
    "renal_dosing": {
      "rules": [
        {
          "action": "monitor INR"
        }
      ]
    }
  },
  {
    "id": "19",
    "generic_name": "Rivaroxaban",
    "generic_name_normalized": "rivaroxaban",
    "drug_class": "doac",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 15,
          "action": "avoid"
        },
        {
          "eGFR_less_than": 50,
          "action": "reduce"
        }
      ]
    }
  },
  {
    "id": "20",
    "generic_name": "Apixaban",
    "generic_name_normalized": "apixaban",
    "drug_class": "doac",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 25,
          "action": "reduce"
        }
      ]
    }
  },
  {
    "id": "21",
    "generic_name": "Enoxaparin",
    "generic_name_normalized": "enoxaparin",
    "drug_class": "lmwh",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "once daily"
        }
      ]
    }
  },
  {
    "id": "22",
    "generic_name": "Amoxicillin",
    "generic_name_normalized": "amoxicillin",
    "drug_class": "penicillin",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "reduce frequency"
        }
      ]
    }
  },
  {
    "id": "23",
    "generic_name": "Amoxicillin-Clavulanate",
    "generic_name_normalized": "amoxicillin-clavulanate",
    "drug_class": "penicillin",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "reduce frequency"
        }
      ]
    }
  },
  {
    "id": "24",
    "generic_name": "Ampicillin",
    "generic_name_normalized": "ampicillin",
    "drug_class": "penicillin",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "reduce frequency"
        }
      ]
    }
  },
  {
    "id": "25",
    "generic_name": "Clarithromycin",
    "generic_name_normalized": "clarithromycin",
    "drug_class": "macrolide",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "reduce 50%"
        }
      ]
    }
  },
  {
    "id": "26",
    "generic_name": "Azithromycin",
    "generic_name_normalized": "azithromycin",
    "drug_class": "macrolide",
    "renal_dosing": {}
  },
  {
    "id": "27",
    "generic_name": "Levofloxacin",
    "generic_name_normalized": "levofloxacin",
    "drug_class": "fluoroquinolone",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 50,
          "action": "adjust"
        }
      ]
    }
  },
  {
    "id": "28",
    "generic_name": "Ciprofloxacin",
    "generic_name_normalized": "ciprofloxacin",
    "drug_class": "fluoroquinolone",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "reduce 50%"
        }
      ]
    }
  },
  {
    "id": "29",
    "generic_name": "Meropenem",
    "generic_name_normalized": "meropenem",
    "drug_class": "carbapenem",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 26,
          "action": "reduce"
        }
      ]
    }
  },
  {
    "id": "30",
    "generic_name": "Ceftriaxone",
    "generic_name_normalized": "ceftriaxone",
    "drug_class": "cephalosporin_3rd",
    "renal_dosing": {}
  },
  {
    "id": "31",
    "generic_name": "Cefazolin",
    "generic_name_normalized": "cefazolin",
    "drug_class": "cephalosporin_1st",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 35,
          "action": "reduce"
        }
      ]
    }
  },
  {
    "id": "32",
    "generic_name": "Nitrofurantoin",
    "generic_name_normalized": "nitrofurantoin",
    "drug_class": "nitrofuran",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "avoid"
        }
      ]
    }
  },
  {
    "id": "33",
    "generic_name": "Co-trimoxazole",
    "generic_name_normalized": "co-trimoxazole",
    "drug_class": "sulfonamide",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 15,
          "action": "avoid"
        }
      ]
    }
  },
  {
    "id": "34",
    "generic_name": "Gabapentin",
    "generic_name_normalized": "gabapentin",
    "drug_class": "gabapentinoid",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "100mg OD"
        },
        {
          "eGFR_less_than": 60,
          "action": "50%"
        }
      ]
    }
  },
  {
    "id": "35",
    "generic_name": "Pregabalin",
    "generic_name_normalized": "pregabalin",
    "drug_class": "gabapentinoid",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "75% less"
        },
        {
          "eGFR_less_than": 60,
          "action": "reduce"
        }
      ]
    }
  },
  {
    "id": "36",
    "generic_name": "Escitalopram",
    "generic_name_normalized": "escitalopram",
    "drug_class": "ssri",
    "renal_dosing": {}
  },
  {
    "id": "37",
    "generic_name": "Fluoxetine",
    "generic_name_normalized": "fluoxetine",
    "drug_class": "ssri",
    "renal_dosing": {}
  },
  {
    "id": "38",
    "generic_name": "Duloxetine",
    "generic_name_normalized": "duloxetine",
    "drug_class": "snri",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "avoid"
        }
      ]
    }
  },
  {
    "id": "39",
    "generic_name": "Tramadol",
    "generic_name_normalized": "tramadol",
    "drug_class": "opioid",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "reduce"
        }
      ]
    }
  },
  {
    "id": "40",
    "generic_name": "Morphine",
    "generic_name_normalized": "morphine",
    "drug_class": "opioid",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "reduce (metabolites)"
        }
      ]
    }
  },
  {
    "id": "41",
    "generic_name": "Fentanyl",
    "generic_name_normalized": "fentanyl",
    "drug_class": "opioid",
    "renal_dosing": {
      "rules": [
        {
          "action": "Preferred in CKD"
        }
      ]
    }
  },
  {
    "id": "42",
    "generic_name": "Paracetamol",
    "generic_name_normalized": "paracetamol",
    "drug_class": "analgesic",
    "renal_dosing": {}
  },
  {
    "id": "43",
    "generic_name": "Diclofenac",
    "generic_name_normalized": "diclofenac",
    "drug_class": "nsaid",
    "renal_dosing": {
      "rules": [
        {
          "action": "Avoid in CKD"
        }
      ]
    }
  },
  {
    "id": "44",
    "generic_name": "Ibuprofen",
    "generic_name_normalized": "ibuprofen",
    "drug_class": "nsaid",
    "renal_dosing": {
      "rules": [
        {
          "action": "Avoid in CKD"
        }
      ]
    }
  },
  {
    "id": "45",
    "generic_name": "Pantoprazole",
    "generic_name_normalized": "pantoprazole",
    "drug_class": "ppi",
    "renal_dosing": {}
  },
  {
    "id": "46",
    "generic_name": "Omeprazole",
    "generic_name_normalized": "omeprazole",
    "drug_class": "ppi",
    "renal_dosing": {}
  },
  {
    "id": "47",
    "generic_name": "Tamsulosin",
    "generic_name_normalized": "tamsulosin",
    "drug_class": "alpha_blocker",
    "renal_dosing": {}
  },
  {
    "id": "48",
    "generic_name": "Digoxin",
    "generic_name_normalized": "digoxin",
    "drug_class": "cardiac_glycoside",
    "renal_dosing": {
      "rules": [
        {
          "eGFR_less_than": 30,
          "action": "reduce, monitor levels"
        }
      ]
    }
  },
  {
    "id": "49",
    "generic_name": "Phenytoin",
    "generic_name_normalized": "phenytoin",
    "drug_class": "anticonvulsant",
    "renal_dosing": {
      "rules": [
        {
          "action": "Complex in CKD"
        }
      ]
    }
  },
  {
    "id": "50",
    "generic_name": "Sodium Valproate",
    "generic_name_normalized": "sodium valproate",
    "drug_class": "anticonvulsant",
    "renal_dosing": {}
  }
];
export const mockInteractions = [
  {
    "id": 1,
    "drug_a_id": "25",
    "drug_b_id": "5",
    "severity": "SEVERE",
    "mechanism": "CYP3A4 → 4-5x statin",
    "clinical_effect": "rhabdomyolysis",
    "management": "Avoid combination"
  },
  {
    "id": 2,
    "drug_a_id": "5",
    "drug_b_id": "25",
    "severity": "SEVERE",
    "mechanism": "CYP3A4 → 4-5x statin",
    "clinical_effect": "rhabdomyolysis",
    "management": "Avoid combination"
  },
  {
    "id": 3,
    "drug_a_id": "25",
    "drug_b_id": "6",
    "severity": "MODERATE",
    "mechanism": "Weak CYP3A4",
    "clinical_effect": "monitor myopathy",
    "management": "Monitor CK"
  },
  {
    "id": 4,
    "drug_a_id": "6",
    "drug_b_id": "25",
    "severity": "MODERATE",
    "mechanism": "Weak CYP3A4",
    "clinical_effect": "monitor myopathy",
    "management": "Monitor CK"
  },
  {
    "id": 5,
    "drug_a_id": "25",
    "drug_b_id": "7",
    "severity": "MODERATE",
    "mechanism": "CYP3A4",
    "clinical_effect": "hypotension",
    "management": "Monitor BP"
  },
  {
    "id": 6,
    "drug_a_id": "7",
    "drug_b_id": "25",
    "severity": "MODERATE",
    "mechanism": "CYP3A4",
    "clinical_effect": "hypotension",
    "management": "Monitor BP"
  },
  {
    "id": 7,
    "drug_a_id": "25",
    "drug_b_id": "18",
    "severity": "SEVERE",
    "mechanism": "CYP",
    "clinical_effect": "increased INR → bleeding",
    "management": "Monitor INR, consider alternative"
  },
  {
    "id": 8,
    "drug_a_id": "18",
    "drug_b_id": "25",
    "severity": "SEVERE",
    "mechanism": "CYP",
    "clinical_effect": "increased INR → bleeding",
    "management": "Monitor INR, consider alternative"
  },
  {
    "id": 9,
    "drug_a_id": "28",
    "drug_b_id": "18",
    "severity": "MODERATE",
    "mechanism": "CYP1A2",
    "clinical_effect": "increased INR",
    "management": "Monitor INR"
  },
  {
    "id": 10,
    "drug_a_id": "18",
    "drug_b_id": "28",
    "severity": "MODERATE",
    "mechanism": "CYP1A2",
    "clinical_effect": "increased INR",
    "management": "Monitor INR"
  },
  {
    "id": 11,
    "drug_a_id": "37",
    "drug_b_id": "39",
    "severity": "SEVERE",
    "mechanism": "Serotonin syndrome",
    "clinical_effect": "death risk",
    "management": "Avoid combination"
  },
  {
    "id": 12,
    "drug_a_id": "39",
    "drug_b_id": "37",
    "severity": "SEVERE",
    "mechanism": "Serotonin syndrome",
    "clinical_effect": "death risk",
    "management": "Avoid combination"
  },
  {
    "id": 13,
    "drug_a_id": "36",
    "drug_b_id": "39",
    "severity": "MODERATE",
    "mechanism": "Serotonin risk",
    "clinical_effect": "monitor",
    "management": "Monitor for serotonin syndrome"
  },
  {
    "id": 14,
    "drug_a_id": "39",
    "drug_b_id": "36",
    "severity": "MODERATE",
    "mechanism": "Serotonin risk",
    "clinical_effect": "monitor",
    "management": "Monitor for serotonin syndrome"
  },
  {
    "id": 15,
    "drug_a_id": "43",
    "drug_b_id": "8",
    "severity": "SEVERE",
    "mechanism": "Nephrotoxicity \"triple whammy\"",
    "clinical_effect": "renal failure",
    "management": "Avoid NSAIDs"
  },
  {
    "id": 16,
    "drug_a_id": "8",
    "drug_b_id": "43",
    "severity": "SEVERE",
    "mechanism": "Nephrotoxicity \"triple whammy\"",
    "clinical_effect": "renal failure",
    "management": "Avoid NSAIDs"
  },
  {
    "id": 17,
    "drug_a_id": "43",
    "drug_b_id": "9",
    "severity": "SEVERE",
    "mechanism": "Nephrotoxicity \"triple whammy\"",
    "clinical_effect": "renal failure",
    "management": "Avoid NSAIDs"
  },
  {
    "id": 18,
    "drug_a_id": "9",
    "drug_b_id": "43",
    "severity": "SEVERE",
    "mechanism": "Nephrotoxicity \"triple whammy\"",
    "clinical_effect": "renal failure",
    "management": "Avoid NSAIDs"
  },
  {
    "id": 19,
    "drug_a_id": "44",
    "drug_b_id": "15",
    "severity": "MODERATE",
    "mechanism": "Reduced antiplatelet effect",
    "clinical_effect": "reduced efficacy",
    "management": "Space dosing"
  },
  {
    "id": 20,
    "drug_a_id": "15",
    "drug_b_id": "44",
    "severity": "MODERATE",
    "mechanism": "Reduced antiplatelet effect",
    "clinical_effect": "reduced efficacy",
    "management": "Space dosing"
  },
  {
    "id": 21,
    "drug_a_id": "18",
    "drug_b_id": "15",
    "severity": "SEVERE",
    "mechanism": "Additive",
    "clinical_effect": "major hemorrhage",
    "management": "Avoid unless strictly indicated"
  },
  {
    "id": 22,
    "drug_a_id": "15",
    "drug_b_id": "18",
    "severity": "SEVERE",
    "mechanism": "Additive",
    "clinical_effect": "major hemorrhage",
    "management": "Avoid unless strictly indicated"
  },
  {
    "id": 23,
    "drug_a_id": "12",
    "drug_b_id": "9",
    "severity": "MODERATE",
    "mechanism": "Hyperkalemia",
    "clinical_effect": "cardiac arrest risk",
    "management": "Monitor K+"
  },
  {
    "id": 24,
    "drug_a_id": "9",
    "drug_b_id": "12",
    "severity": "MODERATE",
    "mechanism": "Hyperkalemia",
    "clinical_effect": "cardiac arrest risk",
    "management": "Monitor K+"
  },
  {
    "id": 25,
    "drug_a_id": "12",
    "drug_b_id": "8",
    "severity": "MODERATE",
    "mechanism": "Hyperkalemia",
    "clinical_effect": "hyperkalemia",
    "management": "Monitor K+"
  },
  {
    "id": 26,
    "drug_a_id": "8",
    "drug_b_id": "12",
    "severity": "MODERATE",
    "mechanism": "Hyperkalemia",
    "clinical_effect": "hyperkalemia",
    "management": "Monitor K+"
  },
  {
    "id": 27,
    "drug_a_id": "49",
    "drug_b_id": "50",
    "severity": "MODERATE",
    "mechanism": "Altered metabolism",
    "clinical_effect": "altered levels",
    "management": "Monitor levels"
  },
  {
    "id": 28,
    "drug_a_id": "50",
    "drug_b_id": "49",
    "severity": "MODERATE",
    "mechanism": "Altered metabolism",
    "clinical_effect": "altered levels",
    "management": "Monitor levels"
  },
  {
    "id": 29,
    "drug_a_id": "38",
    "drug_b_id": "39",
    "severity": "SEVERE",
    "mechanism": "Serotonin syndrome",
    "clinical_effect": "serotonin syndrome",
    "management": "Avoid combination"
  },
  {
    "id": 30,
    "drug_a_id": "39",
    "drug_b_id": "38",
    "severity": "SEVERE",
    "mechanism": "Serotonin syndrome",
    "clinical_effect": "serotonin syndrome",
    "management": "Avoid combination"
  }
];
export const mockAllergies = [
  {
    "id": "1",
    "drug_class_a": "penicillin",
    "drug_class_b": "penicillin",
    "cross_reactivity_pct": 100,
    "clinical_guidance": "Same class — DIRECT MATCH"
  },
  {
    "id": "2",
    "drug_class_a": "penicillin",
    "drug_class_b": "cephalosporin_1st",
    "cross_reactivity_pct": 2,
    "clinical_guidance": "Avoid if anaphylaxis"
  },
  {
    "id": "3",
    "drug_class_a": "penicillin",
    "drug_class_b": "cephalosporin_3rd",
    "cross_reactivity_pct": 0.5,
    "clinical_guidance": "Use with caution"
  },
  {
    "id": "4",
    "drug_class_a": "penicillin",
    "drug_class_b": "carbapenem",
    "cross_reactivity_pct": 1,
    "clinical_guidance": "Generally safe"
  },
  {
    "id": "5",
    "drug_class_a": "sulfonamide",
    "drug_class_b": "sulfonamide",
    "cross_reactivity_pct": 100,
    "clinical_guidance": "Same class"
  },
  {
    "id": "6",
    "drug_class_a": "ace_inhibitor",
    "drug_class_b": "ace_inhibitor",
    "cross_reactivity_pct": 100,
    "clinical_guidance": "Angioedema risk"
  },
  {
    "id": "7",
    "drug_class_a": "ace_inhibitor",
    "drug_class_b": "arb",
    "cross_reactivity_pct": 0,
    "clinical_guidance": "ARBs are SAFE"
  },
  {
    "id": "8",
    "drug_class_a": "nsaid",
    "drug_class_b": "nsaid",
    "cross_reactivity_pct": 100,
    "clinical_guidance": "Avoid ALL in aspirin-exacerbated"
  },
  {
    "id": "9",
    "drug_class_a": "aspirin",
    "drug_class_b": "nsaid",
    "cross_reactivity_pct": 100,
    "clinical_guidance": "Avoid ALL in aspirin-exacerbated"
  }
];
