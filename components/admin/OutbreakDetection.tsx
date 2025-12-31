
import React, { useState } from 'react';

interface OutbreakDetectionProps {
  onBack?: () => void;
}

const OutbreakDetection: React.FC<OutbreakDetectionProps> = ({ onBack }) => {
  const [auditTarget, setAuditTarget] = useState<any>(null);

  const outbreaks = [
    { id: 'ob1', disease: 'Dengue Fever', location: 'Mumbai, Maharashtra', cases: 156, growth: 45, severity: 'Critical', detected: '8 days ago' },
    { id: 'ob2', disease: 'Malaria', location: 'Kolkata, West Bengal', cases: 89, growth: 22, severity: 'Critical', detected: '3 days ago' },
    { id: 'ob3', disease: 'Influenza Type A', location: 'Delhi, NCR', cases: 242, growth: 12, severity: 'High', detected: '5 days ago' },
    { id: 'ob4', disease: 'Cholera', location: 'Bangalore, Karnataka', cases: 28, growth: 65, severity: 'Severe', detected: '2 days ago' },
    { id: 'ob5', disease: 'Heat Exhaustion', location: 'Chennai, Tamil Nadu', cases: 112, growth: 18, severity: 'Moderate', detected: '10 days ago' },
    { id: 'ob6', disease: 'Zika Virus', location: 'Ahmedabad, Gujarat', cases: 12, growth: 8, severity: 'Mild', detected: '14 days ago' }
  ];

  if (auditTarget) {
    return (
      <div className="animate-in slide-in-from-right-4 duration-500 flex flex-col items-center w-full text-left">
        <div className="flex justify-start w-full mb-10">
          <button 
            onClick={() => setAuditTarget(null)}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white dark:bg-gray-900 px-8 py-4 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center shadow-sm"
          >
            ← Back To Threat List
          </button>
        </div>
        <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[3rem] p-12 border border-gray-100 dark:border-gray-800 shadow-sm">
           <div className="flex justify-between items-start mb-12">
              <div>
                 <h2 className="text-4xl font-black tracking-tighter dark:text-white leading-none">Registry Audit: {auditTarget.disease}</h2>
                 <p className="text-ios-blue text-[10px] font-black uppercase tracking-widest mt-3">Target Node: {auditTarget.location}</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Growth Factor</p>
                 <p className="text-3xl font-black text-red-500 leading-none mt-1">+{auditTarget.growth}%</p>
              </div>
           </div>
           
           <div className="space-y-4">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Anonymized Patient Signals (Recent)</p>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-6 bg-gray-50 dark:bg-black/20 rounded-2xl border border-black/5 flex items-center justify-between">
                   <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-lg">🧬</div>
                      <div>
                        <p className="font-bold text-sm dark:text-white">Signal-X88{i}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Detected: 14:02 IST • Mobile Node</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="text-[9px] font-black text-ios-orange uppercase">Unverified</span>
                      <button className="text-ios-blue text-[10px] font-black uppercase underline">Track</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center w-full">
      {onBack && (
        <div className="flex justify-start w-full mb-8">
          <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white dark:bg-gray-900 px-8 py-4 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center shadow-sm hover:text-gray-900 dark:hover:text-white transition-all active:scale-95">← Back To Dashboard</button>
        </div>
      )}
      <div className="mb-12 text-center">
        <h2 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] mb-3">Threat Monitoring</h2>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Active Pathogen Signals</h1>
      </div>
      <div className="space-y-6 w-full max-w-4xl pb-24">
        {outbreaks.map(ob => (
          <div key={ob.id} className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
            <div className="flex items-center gap-10">
              <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-5xl shrink-0 transition-transform group-hover:scale-110 ${ob.severity === 'Critical' ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : ob.severity === 'Severe' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'}`}>{ob.severity === 'Critical' ? '☣️' : ob.severity === 'Severe' ? '⚠️' : '🚨'}</div>
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-4 mb-2"><h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{ob.disease}</h3><span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${ob.severity === 'Critical' ? 'bg-red-500 text-white' : ob.severity === 'Severe' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'}`}>{ob.severity}</span></div>
                <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest">📍 {ob.location} • <span className="text-gray-400 italic">DETECTED {ob.detected}</span></p>
                <div className="flex items-center gap-10 mt-6"><div className="flex flex-col items-start"><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Confirmed Cases</p><p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">{ob.cases}</p></div><div className="flex flex-col items-start"><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Spread Velocity</p><p className="text-2xl font-black text-red-600 tracking-tighter">+{ob.growth}%</p></div></div>
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <button onClick={() => setAuditTarget(ob)} className="px-8 py-4 bg-gray-900 dark:bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">Registry Audit</button>
              <button onClick={() => alert('Authorities alerted for ' + ob.location)} className="px-8 py-4 bg-white dark:bg-transparent border-2 border-red-200 dark:border-red-900/50 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-95 transition-all">Alert Authority</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutbreakDetection;
