"use client";

import React, { useState } from 'react';
import { Patient } from '@/lib/types';

interface CustomPatientFormProps {
  onAddPatient: (patient: Patient) => void;
}

export default function CustomPatientForm({ onAddPatient }: CustomPatientFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    age: '',
    sex: 'M',
    medications: '',
    allergies: '',
    creatinine: '',
    conditions: '',
    egfr: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age) return;

    const newPatient: Patient = {
      id: `custom-${Date.now()}`,
      name: form.name,
      age: parseInt(form.age),
      sex: form.sex as 'M' | 'F',
      medications: form.medications.split(',').map(m => m.trim().toLowerCase()).filter(Boolean),
      allergies: form.allergies.split(',').map(a => a.trim()).filter(Boolean) || ['NKDA'],
      creatinine: parseFloat(form.creatinine) || 1.0,
      conditions: form.conditions.split(',').map(c => c.trim()).filter(Boolean),
      labs: form.egfr ? { eGFR: parseFloat(form.egfr) } : {},
      summary: `${form.age}${form.sex} | Meds: ${form.medications} | Allergies: ${form.allergies || 'NKDA'} | Cr ${form.creatinine || 'N/A'}, eGFR ${form.egfr || 'N/A'}`
    };

    onAddPatient(newPatient);
    setIsOpen(false);
    setForm({ name: '', age: '', sex: 'M', medications: '', allergies: '', creatinine: '', conditions: '', egfr: '' });
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mt-3 py-2 px-4 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 font-medium rounded-lg transition-colors border border-purple-500/30 text-sm flex items-center justify-center gap-2"
      >
        <span>➕</span> {isOpen ? 'Cancel' : 'Add Custom Patient'}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 glass-panel p-4 border-purple-500/20">
          <h3 className="font-bold text-purple-300 text-sm uppercase tracking-wide">New Custom Patient</h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Patient Name *</label>
              <input
                required
                type="text"
                placeholder="e.g. John Doe"
                className="w-full bg-black/30 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 outline-none focus:border-purple-500"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Age *</label>
              <input
                required
                type="number"
                placeholder="e.g. 65"
                className="w-full bg-black/30 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 outline-none focus:border-purple-500"
                value={form.age}
                onChange={e => setForm({...form, age: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Sex</label>
              <select
                className="w-full bg-black/30 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 outline-none focus:border-purple-500"
                value={form.sex}
                onChange={e => setForm({...form, sex: e.target.value})}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Creatinine (mg/dL)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 1.2"
                className="w-full bg-black/30 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 outline-none focus:border-purple-500"
                value={form.creatinine}
                onChange={e => setForm({...form, creatinine: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">eGFR (if known)</label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 45 — or leave blank to auto-calculate"
              className="w-full bg-black/30 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 outline-none focus:border-purple-500"
              value={form.egfr}
              onChange={e => setForm({...form, egfr: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Current Medications (comma-separated)</label>
            <textarea
              placeholder="e.g. Metformin, Atorvastatin, Warfarin"
              className="w-full bg-black/30 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 outline-none focus:border-purple-500 h-16 resize-none"
              value={form.medications}
              onChange={e => setForm({...form, medications: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Allergies (comma-separated, write NKDA if none)</label>
            <input
              type="text"
              placeholder="e.g. Penicillin (ANAPHYLAXIS), Sulfonamide"
              className="w-full bg-black/30 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 outline-none focus:border-purple-500"
              value={form.allergies}
              onChange={e => setForm({...form, allergies: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Medical Conditions (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g. AF, HTN, T2DM, CHF, TIA"
              className="w-full bg-black/30 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 outline-none focus:border-purple-500"
              value={form.conditions}
              onChange={e => setForm({...form, conditions: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors text-sm"
          >
            ✅ Add Patient to Demo
          </button>
        </form>
      )}
    </div>
  );
}
