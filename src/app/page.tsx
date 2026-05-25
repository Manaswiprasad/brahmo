"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PATIENTS } from '@/lib/patients';
import { Patient } from '@/lib/types';
import CustomPatientForm from '@/components/CustomPatientForm';

export default function Home() {
  const [allPatients, setAllPatients] = useState<Patient[]>(PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(PATIENTS[0].id);

  const patient = allPatients.find(p => p.id === selectedPatientId) || allPatients[0];

  const handleAddCustomPatient = (newPatient: Patient) => {
    setAllPatients(prev => [...prev, newPatient]);
    setSelectedPatientId(newPatient.id);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-6">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight">
              🛡️ BRAHMO
            </h1>
            <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full text-xs font-semibold uppercase tracking-wider">
              Clinical Decision Support (CDSS) Console
            </span>
          </div>
          <p className="text-gray-400 mt-1.5 text-sm">
            Deterministic Drug Safety Engine &mdash; Securing LLM clinical reasoning with absolute mathematical certainty.
          </p>
        </div>
      </header>

      {/* Main Core Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
        
        {/* Left Column: Patients Registry Select */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="glass-panel p-5">
            <h3 className="font-bold mb-3 text-gray-200 uppercase tracking-wider text-xs flex items-center justify-between">
              <span>📋 Clinical Cases Archive</span>
              <span className="text-[10px] text-gray-500 font-mono">({allPatients.length} Patients)</span>
            </h3>
            
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Select an archived patient record below to load their clinical profile preview and access their workspaces.
            </p>

            <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
              {allPatients.map((p) => {
                const isActive = p.id === selectedPatientId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatientId(p.id)}
                    className={`w-full text-left p-3.5 rounded-lg text-xs font-medium border transition-all flex items-center justify-between ${
                      isActive 
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-semibold shadow-md shadow-blue-950/20' 
                        : 'bg-black/20 hover:bg-white/5 border-gray-800 text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <span className="truncate max-w-[80%]">{p.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${isActive ? 'bg-blue-500/30' : 'bg-gray-800'}`}>
                      {p.age}{p.sex}
                    </span>
                  </button>
                );
              })}
            </div>
            
            {/* Divider */}
            <div className="border-t border-white/5 my-4"></div>

            {/* Custom Patient Intake Trigger */}
            <CustomPatientForm onAddPatient={handleAddCustomPatient} />
          </div>
        </div>

        {/* Right Column: EMR Profile Preview & Workspace Router */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Patient Overview Preview Card */}
          <div className="glass-panel p-6 border-blue-500/10 bg-gradient-to-br from-blue-950/10 to-transparent">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Active Profile</span>
                <h2 className="text-2xl font-bold text-gray-100 mt-1">{patient.name}</h2>
              </div>
              <span className="px-3.5 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider">
                {patient.age}yo {patient.sex}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">Current Medications</h4>
                  <ul className="list-disc list-inside text-gray-200 space-y-1">
                    {patient.medications.map((med, i) => (
                      <li key={i} className="capitalize truncate">{med}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">Allergies & Sensitivities</h4>
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map((allergy, i) => (
                      <span key={i} className={`px-2 py-1 rounded text-[10px] font-medium border ${
                        allergy === 'NKDA' 
                          ? 'bg-green-500/10 border-green-500/20 text-green-300' 
                          : 'bg-red-500/10 border-red-500/20 text-red-300'
                      }`}>
                        {allergy}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] mt-4 mb-1.5">Co-existing Conditions</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.conditions.length > 0 ? patient.conditions.map((cond, i) => (
                      <span key={i} className="px-2 py-0.5 bg-purple-500/15 text-purple-300 border border-purple-500/20 rounded text-[10px]">
                        {cond}
                      </span>
                    )) : <span className="text-gray-500 italic text-[11px]">No conditions documented</span>}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-2 flex flex-wrap gap-5 text-gray-400">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-[10px] mr-2">Serum Creatinine:</span>
                  <span className="font-mono text-blue-400 font-bold">{patient.creatinine} mg/dL</span>
                </div>
                {patient.labs && Object.entries(patient.labs).map(([key, val]) => (
                  <div key={key}>
                    <span className="font-semibold uppercase tracking-wider text-[10px] mr-2">{key}:</span>
                    <span className="font-mono text-blue-400 font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5 my-5"></div>

            {/* Premium Action Workspace Router Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <Link 
                href={`/consultation?patientId=${patient.id}`}
                className="py-3.5 px-4 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/25 text-xs tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <span>🛡️</span>
                <span>Open Consultation Console</span>
              </Link>

              <Link 
                href={`/records?patientId=${patient.id}`}
                className="py-3.5 px-4 bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 active:scale-98 font-bold rounded-lg transition-all shadow-lg shadow-indigo-950/20 text-xs tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <span>📂</span>
                <span>Open EMR Case Notes</span>
              </Link>

            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
