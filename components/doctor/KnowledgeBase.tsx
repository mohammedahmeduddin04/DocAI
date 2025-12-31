
import React, { useState } from 'react';
import { DISEASES } from '../../constants';
import { Disease } from '../../types';

const KnowledgeBase: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  
  const filtered = DISEASES.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center gap-8 animate-in fade-in duration-700 pb-20">
      <div className="w-full max-w-5xl text-center">
         <h2 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] mb-4">Evidence Registry</h2>
         <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-10">Clinical Intelligence Hub</h1>
         
         {!selectedDisease ? (
           <>
            <div className="relative w-full max-w-2xl mx-auto mb-16">
                <input 
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search pathology or specialty guidelines..."
                  className="w-full pl-16 pr-8 py-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-xl outline-none text-sm font-bold focus:ring-4 focus:ring-blue-600/5 transition-all text-gray-900 dark:text-white"
                />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl opacity-30">🔍</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
                {filtered.map((d, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedDisease(d)}
                    className="p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all group hover:-translate-y-2 flex flex-col justify-between text-left h-full"
                  >
                    <div>
                        <div className="flex justify-between items-start mb-6">
                          <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${
                            d.severity === 'Critical' ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                          }`}>{d.severity}</span>
                          <span className="text-xl opacity-20 group-hover:opacity-100 transition-opacity">📖</span>
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2 leading-none">{d.name}</h4>
                        <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-6">{d.specialty}</p>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-50 dark:border-gray-800">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Registry Indicators</p>
                        <div className="flex flex-wrap gap-2">
                          {d.symptoms.slice(0, 3).map(s => (
                            <span key={s} className="text-[9px] font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-lg truncate">
                              {s}
                            </span>
                          ))}
                        </div>
                    </div>
                  </button>
                ))}
            </div>
           </>
         ) : (
           <div className="animate-in slide-in-from-right duration-500 bg-white dark:bg-gray-900 rounded-[3rem] p-12 border border-gray-100 dark:border-gray-800 text-left shadow-2xl w-full">
              <button 
                onClick={() => setSelectedDisease(null)}
                className="mb-8 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
              >
                ← Back to Library
              </button>
              
              <div className="flex justify-between items-start mb-12">
                 <div className="flex flex-col items-start">
                    <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">{selectedDisease.name}</h2>
                    <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em]">{selectedDisease.specialty} Guideline V.2024.1</p>
                 </div>
                 <div className={`px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest ${
                   selectedDisease.severity === 'Critical' ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                 }`}>
                   {selectedDisease.severity} Risk Status
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-12">
                 <div className="space-y-8">
                    <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] border-b border-gray-100 dark:border-gray-800 pb-4">Standard Protocol Steps</h4>
                    <div className="space-y-4">
                       {(selectedDisease.protocol?.steps || ["Differential Diagnosis", "Symptom Management", "Laboratory Confirmation", "Follow-up Strategy"]).map((step, i) => (
                         <div key={i} className="flex gap-4 items-start">
                            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{step}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-8">
                    <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] border-b border-gray-100 dark:border-gray-800 pb-4">Suggestive Pharmacology</h4>
                    <div className="space-y-3">
                       {(selectedDisease.protocol?.medications || [
                         { name: "Supportive Care", dosage: "N/A", frequency: "Continuous" }
                       ]).map((med, i) => (
                         <div key={i} className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex flex-col">
                               <p className="font-black text-lg text-gray-900 dark:text-white leading-tight">{med.name}</p>
                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Dosage: {med.dosage}</p>
                            </div>
                            <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg uppercase">{med.frequency}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-900/50">
                 <p className="text-[10px] font-black text-blue-900 dark:text-blue-200 uppercase tracking-widest mb-2">Clinical Advisor Note</p>
                 <p className="text-sm text-blue-800 dark:text-blue-300 opacity-70 leading-relaxed font-medium italic">"Always cross-reference this protocol with the patient's existing allergies and chronic medical history found in the DocAI Registry before finalizing Rx."</p>
              </div>
           </div>
         )}
      </div>
    </div>
  );
};

export default KnowledgeBase;
