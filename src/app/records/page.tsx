"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PATIENTS } from '@/lib/patients';
import PatientCard from '@/components/PatientCard';
import ClinicalNotes from '@/components/ClinicalNotes';

function RecordsContent() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get('patientId') || '1';

  // Load patient from reference case archive
  const patient = PATIENTS.find(p => p.id === patientId) || PATIENTS[0];

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-6">
      
      {/* Header Back Bar */}
      <header className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <Link 
            href="/"
            className="px-3.5 py-1.5 bg-gray-800 hover:bg-gray-700/80 active:scale-95 text-gray-300 font-bold border border-gray-700 rounded-lg text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>⬅</span> Patient Hub
          </Link>
          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight leading-none">
              Patient Case Records
            </h1>
            <p className="text-[10px] text-gray-500 mt-1 hidden sm:block">
              EMR Record management, vital parameters, and SOAP clinical documentation
            </p>
          </div>
        </div>

        {/* Selected Patient Banner Badge */}
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono hidden md:block">Active Case:</span>
          <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full text-xs font-bold shadow-md truncate max-w-[200px]">
            👤 {patient.name}
          </span>
        </div>
      </header>

      {/* Main Core Records Layout */}
      <div className="flex flex-col gap-6 mt-2">
        
        {/* Comprehensive EMR Detail Card */}
        <PatientCard patient={patient} />

        {/* EMR Note-Making Station */}
        <ClinicalNotes patient={patient} safetyResult={null} proposedDrug="" />

      </div>

    </div>
  );
}

export default function RecordsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading Patient EMR Records...</div>}>
      <RecordsContent />
    </Suspense>
  );
}
