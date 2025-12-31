
import React, { useState } from 'react';
import { DISEASES } from '../../constants';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface PrescriptionCreatorProps {
  doctorName: string;
}

const PrescriptionCreator: React.FC<PrescriptionCreatorProps> = ({ doctorName }) => {
  const [meds, setMeds] = useState<Medication[]>([]);
  const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '', duration: '' });
  const [targetDisease, setTargetDisease] = useState('');

  const addMed = () => {
    if (!newMed.name) return;
    setMeds([...meds, { ...newMed, id: Math.random().toString(36).substr(2, 9) }]);
    setNewMed({ name: '', dosage: '', frequency: '', duration: '' });
  };

  const removeMed = (id: string) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  const loadProtocol = () => {
    const disease = DISEASES.find(d => d.name.toLowerCase() === targetDisease.toLowerCase());
    if (disease && disease.protocol) {
      const protocolMeds = disease.protocol.medications.map(m => ({
        ...m,
        id: Math.random().toString(36).substr(2, 9),
        duration: '5 Days'
      }));
      setMeds([...meds, ...protocolMeds]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-12 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col">
        {/* Prescription Header */}
        <div className="flex justify-between items-start mb-12 border-b border-gray-100 dark:border-gray-800 pb-8">
          <div className="text-left">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{doctorName}</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mt-1">Medical License: MD-AI-9922-K</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
              DocAI Integrated Hospital Network<br/>
              Floor 4, Block B, Innovation Hub<br/>
              Reg No: 1254-8890
            </p>
          </div>
          <div className="text-right">
             <div className="text-4xl font-black text-gray-200 dark:text-gray-700 italic select-none">Rx</div>
             <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-4">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Smart Protocol Loader */}
        <div className="mb-8 flex items-end gap-4">
           <div className="flex-1 text-left">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Target Diagnosis for Protocol Suggestion</label>
              <input 
                value={targetDisease}
                onChange={e => setTargetDisease(e.target.value)}
                list="disease-list"
                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-600/20 text-gray-900 dark:text-white transition-all"
                placeholder="Type Diagnosis (e.g. Dengue Fever)..."
              />
              <datalist id="disease-list">
                {DISEASES.filter(d => d.protocol).map(d => <option key={d.name} value={d.name} />)}
              </datalist>
           </div>
           <button 
             onClick={loadProtocol}
             className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
           >
             Load Smart Protocol
           </button>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-4 gap-4 mb-10 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col text-left">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Medication Name</label>
            <input 
              value={newMed.name} 
              onChange={e => setNewMed({...newMed, name: e.target.value})}
              className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-bold outline-none text-gray-900 dark:text-white"
              placeholder="e.g. Paracetamol"
            />
          </div>
          <div className="flex flex-col text-left">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Dosage</label>
            <input 
              value={newMed.dosage} 
              onChange={e => setNewMed({...newMed, dosage: e.target.value})}
              className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-bold outline-none text-gray-900 dark:text-white"
              placeholder="500mg"
            />
          </div>
          <div className="flex flex-col text-left">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Frequency</label>
            <input 
              value={newMed.frequency} 
              onChange={e => setNewMed({...newMed, frequency: e.target.value})}
              className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-bold outline-none text-gray-900 dark:text-white"
              placeholder="1-0-1"
            />
          </div>
          <div className="flex flex-col items-center justify-end">
            <button 
              onClick={addMed}
              className="w-full py-3 bg-gray-900 dark:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-[1.03] transition-all"
            >
              Add Drug
            </button>
          </div>
        </div>

        {/* Medication List */}
        <div className="flex-1 space-y-4 min-h-[300px] text-left">
          {meds.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
              <div className="text-6xl mb-4">✍️</div>
              <p className="font-black text-sm uppercase tracking-widest">No entries listed yet</p>
            </div>
          ) : (
            <div className="space-y-3">
               {meds.map(m => (
                 <div key={m.id} className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl flex items-center justify-between group">
                    <div className="flex items-center gap-6">
                       <span className="text-xl">💊</span>
                       <div>
                          <p className="font-black text-lg text-gray-900 dark:text-white leading-tight">{m.name} <span className="text-blue-600 dark:text-blue-400 ml-2">{m.dosage}</span></p>
                          <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Schedule: {m.frequency} • Duration: {m.duration || 'As directed'}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => removeMed(m.id)}
                      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                 </div>
               ))}
            </div>
          )}
        </div>

        {/* Prescription Footer */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-end">
           <div className="text-left">
              <div className="w-32 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-2 flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700">
                <span className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">Doctor Signature</span>
              </div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Digital Auth Code: AI-SIG-X9822</p>
           </div>
           <button className="px-12 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all">
             Finalize & Print
           </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCreator;
