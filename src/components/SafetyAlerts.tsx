"use client";

import React from 'react';
import { SafetyAlert } from '@/lib/types';

interface SafetyAlertsProps {
  alerts: SafetyAlert[];
  isLoading: boolean;
}

export default function SafetyAlerts({ alerts, isLoading }: SafetyAlertsProps) {
  if (isLoading) {
    return (
      <div className="glass-panel p-6 mb-6 animate-pulse">
        <div className="h-6 w-1/3 bg-white/10 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-16 w-full bg-white/5 rounded"></div>
        </div>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="glass-panel p-6 mb-6 border-green-500/30 bg-green-500/5">
        <div className="flex items-center text-green-400">
          <span className="text-2xl mr-3">✅</span>
          <div>
            <h3 className="font-bold">Safety Checks Passed</h3>
            <p className="text-sm text-green-200/70">No interactions, allergy conflicts, or renal dosing issues detected.</p>
          </div>
        </div>
      </div>
    );
  }

  const getAlertStyle = (level: string) => {
    switch (level) {
      case 'HARD BLOCK': return 'border-red-600 bg-red-900/20 text-red-100 shadow-[0_0_15px_rgba(220,38,38,0.15)]';
      case 'SEVERE': return 'border-orange-500 bg-orange-900/20 text-orange-100';
      case 'MODERATE': return 'border-yellow-500 bg-yellow-900/20 text-yellow-100';
      case 'INFO': return 'border-blue-500 bg-blue-900/20 text-blue-100';
      default: return 'border-gray-500 bg-gray-900/20 text-gray-100';
    }
  };

  const hasHardBlock = alerts.some(a => a.level === 'HARD BLOCK');

  return (
    <div className={`glass-panel p-6 mb-6 ${hasHardBlock ? 'border-red-500/50' : 'border-orange-500/30'}`}>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">🛡️</span> Deterministic Safety Engine Results
      </h2>
      
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div key={i} className={`p-4 rounded-lg border-l-4 flex items-start ${getAlertStyle(alert.level)}`}>
            <span className="text-2xl mr-3 leading-none">{alert.icon}</span>
            <div>
              <div className="font-bold text-sm tracking-wider mb-1 opacity-90">{alert.level}</div>
              <p className="text-sm">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
