"use client";

import React from 'react';
import { Patient } from '@/lib/types';

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className="glass-panel p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-400">{patient.name}</h2>
        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
          {patient.age}yo {patient.sex}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h3 className="text-gray-400 font-semibold mb-2 uppercase tracking-wider text-xs">Medications</h3>
          <ul className="list-disc list-inside text-gray-200">
            {patient.medications.map((med, i) => (
              <li key={i} className="capitalize">{med}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-gray-400 font-semibold mb-2 uppercase tracking-wider text-xs">Allergies</h3>
          <div className="flex flex-wrap gap-2">
            {patient.allergies.map((allergy, i) => (
              <span key={i} className={`px-2 py-1 rounded text-xs ${allergy === 'NKDA' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {allergy}
              </span>
            ))}
          </div>
          
          <h3 className="text-gray-400 font-semibold mt-4 mb-2 uppercase tracking-wider text-xs">Conditions</h3>
          <div className="flex flex-wrap gap-2">
            {patient.conditions.length > 0 ? patient.conditions.map((cond, i) => (
              <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                {cond}
              </span>
            )) : <span className="text-gray-500 italic text-xs">None documented</span>}
          </div>
        </div>
        
        <div className="md:col-span-2 mt-2 pt-4 border-t border-white/10 flex flex-wrap gap-6">
          <div>
            <span className="text-gray-400 mr-2 text-xs uppercase tracking-wider">Creatinine:</span>
            <span className="font-mono text-blue-300">{patient.creatinine} mg/dL</span>
          </div>
          {patient.labs && Object.entries(patient.labs).map(([key, val]) => (
            <div key={key}>
              <span className="text-gray-400 mr-2 text-xs uppercase tracking-wider">{key}:</span>
              <span className="font-mono text-blue-300">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
