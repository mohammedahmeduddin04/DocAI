
import React, { useState } from 'react';
import { DOCTORS } from '../../constants';
import { Prediction } from '../../types';
import { GoogleGenAI } from "@google/genai";

interface PatientCommsProps {
  latestPrediction?: Prediction;
}

const PatientComms: React.FC<PatientCommsProps> = ({ latestPrediction }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [msgInput, setMsgInput] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  const [messages, setMessages] = useState<Record<string, any[]>>({
    '1': [
      { id: 1, type: 'out', text: 'Hello Dr. Rajesh, I recently completed my AI health scan.', time: 'Yesterday' },
      { id: 2, type: 'in', text: 'Hello! I have received your report. Please ensure you stay hydrated while we review your vitals.', time: 'Yesterday' }
    ]
  });

  const handleSend = () => {
    if (!msgInput.trim() || !selectedDoctor) return;
    const newMsg = {
      id: Date.now(),
      type: 'out',
      text: msgInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => ({
      ...prev,
      [selectedDoctor.id]: [...(prev[selectedDoctor.id] || []), newMsg]
    }));
    setMsgInput('');
  };

  const draftSmartInquiry = async () => {
    if (!latestPrediction) return;
    setIsDrafting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `As a patient who just received a preliminary AI diagnosis of ${latestPrediction.diseaseName} based on symptoms (${latestPrediction.symptoms.join(', ')}), draft a concise, professional message to my specialist (${selectedDoctor?.name || 'Doctor'}) asking for next steps and clarification on the diagnosis. Keep it under 60 words.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setMsgInput((response.text || "").trim());
    } catch (e) {
      console.error("Gemini API Error:", e);
      alert("AI Drafter unavailable. Check your connection.");
    } finally {
      setIsDrafting(false);
    }
  };

  if (selectedDoctor) {
    return (
      <div className="animate-in slide-in-from-right-4 duration-500 w-full flex flex-col h-[70vh] bg-white dark:bg-ios-grey-dark rounded-ios-2xl shadow-xl border border-black/5 overflow-hidden">
        <div className="p-6 border-b border-black/5 flex items-center justify-between bg-gray-50/50 dark:bg-black/20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedDoctor(null)} className="text-ios-blue font-bold">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="text-left">
              <h4 className="font-bold text-sm dark:text-white leading-none">{selectedDoctor.name}</h4>
              <p className="text-[9px] text-ios-green font-black uppercase tracking-widest mt-1">Verified Specialist</p>
            </div>
          </div>
          {latestPrediction && (
            <button 
              onClick={draftSmartInquiry}
              disabled={isDrafting}
              className="px-4 py-2 bg-ios-blue/10 text-ios-blue rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all"
            >
              {isDrafting ? 'Drafting...' : '✨ Smart Draft'}
            </button>
          )}
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4 text-left">
          {(messages[selectedDoctor.id] || []).map(m => (
            <div key={m.id} className={`flex flex-col ${m.type === 'out' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl max-w-[85%] text-sm font-medium leading-relaxed ${
                m.type === 'out' ? 'bg-ios-blue text-white rounded-tr-none' : 'bg-ios-grey dark:bg-white/5 text-gray-800 dark:text-gray-200 rounded-tl-none'
              }`}>
                {m.text}
              </div>
              <span className="text-[8px] font-black text-gray-400 mt-1.5 uppercase tracking-widest">{m.time}</span>
            </div>
          ))}
          {(messages[selectedDoctor.id] || []).length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-20 py-20 text-center">
              <p className="text-xs font-black uppercase tracking-widest">Encrypted connection established.<br/>Send a message to begin consultation.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-black/5 bg-gray-50/50 dark:bg-black/20">
          <form className="flex gap-3" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input 
              value={msgInput}
              onChange={e => setMsgInput(e.target.value)}
              className="flex-1 bg-white dark:bg-ios-grey-dark border border-black/5 dark:border-white/5 rounded-xl px-5 py-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-ios-blue/20 dark:text-white"
              placeholder="Clinical inquiry..."
            />
            <button type="submit" className="w-12 h-12 bg-ios-blue text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all">
              <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 w-full flex flex-col text-left">
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tighter dark:text-white">Secure Comms</h2>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">End-to-End Encrypted Protocols</p>
      </div>

      <div className="space-y-3">
        <p className="text-[9px] font-black text-ios-blue uppercase tracking-widest mb-4 ml-1">Consulted Specialists</p>
        {DOCTORS.slice(0, 4).map(doc => (
          <button 
            key={doc.id}
            onClick={() => setSelectedDoctor(doc)}
            className="w-full p-5 bg-white dark:bg-ios-grey-dark rounded-ios shadow-sm border border-black/5 flex items-center justify-between group active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-ios-blue/5 rounded-full flex items-center justify-center text-xl">👨‍⚕️</div>
              <div className="text-left">
                <h4 className="font-bold text-sm dark:text-white leading-none">{doc.name}</h4>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2">{doc.specialty} • {doc.hospital}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {messages[doc.id] && <div className="w-2 h-2 bg-ios-blue rounded-full"></div>}
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 p-8 bg-ios-indigo/5 dark:bg-ios-indigo/10 rounded-[2.5rem] border border-ios-indigo/10 text-center">
         <div className="text-3xl mb-4">🛡️</div>
         <h4 className="text-xs font-black text-ios-indigo uppercase tracking-widest mb-2">Privacy Assurance</h4>
         <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">All communications are routed through DocAI's private clinical node. Your identity is anonymized unless clinical verification is requested by the practitioner.</p>
      </div>
    </div>
  );
};

export default PatientComms;
