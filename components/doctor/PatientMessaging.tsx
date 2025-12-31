
import React, { useState } from 'react';

const PatientMessaging: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [msgInput, setMsgInput] = useState('');
  const [messages, setMessages] = useState<Record<string, any[]>>({
    't1': [
      { id: 1, type: 'in', text: 'Doctor, I have been following the prescription for 3 days now. The headache has subsided, but I feel slightly dizzy in the mornings. Is this normal?', time: '10:40 AM' },
      { id: 2, type: 'out', text: "Morning dizziness can be a mild side effect. Ensure you are taking the medicine exactly after a meal and staying hydrated. Let's monitor this for 2 more days.", time: '10:45 AM' }
    ],
    't2': [],
    't3': []
  });

  const threads = [
    { id: 't1', name: 'John Doe', lastMsg: 'I still have a slight fever...', time: '10:42 AM', unread: 2 },
    { id: 't2', name: 'Jane Smith', lastMsg: 'The meds are working well!', time: 'Yesterday', unread: 0 },
    { id: 't3', name: 'Mike Ross', lastMsg: 'Should I continue the syrup?', time: 'Oct 24', unread: 0 }
  ];

  const handleSend = () => {
    if (!msgInput.trim() || !selectedPatient) return;
    const newMsg = {
      id: Date.now(),
      type: 'out',
      text: msgInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => ({
      ...prev,
      [selectedPatient.id]: [...(prev[selectedPatient.id] || []), newMsg]
    }));
    setMsgInput('');
  };

  return (
    <div className="h-full flex gap-8 animate-in fade-in duration-700 pb-20">
      <div className="w-96 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 p-8 flex flex-col shadow-sm shrink-0">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 text-left uppercase tracking-tight">Clinical Comms</h3>
        <div className="space-y-2 flex-1 overflow-y-auto">
          {threads.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedPatient(t)}
              className={`w-full p-6 rounded-3xl flex items-center justify-between transition-all text-left ${
                selectedPatient?.id === t.id ? 'bg-ios-blue text-white shadow-xl' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex flex-col overflow-hidden">
                <p className={`font-black tracking-tight leading-tight ${selectedPatient?.id === t.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{t.name}</p>
                <p className={`text-[10px] truncate mt-1 ${selectedPatient?.id === t.id ? 'text-blue-100 opacity-70' : 'text-gray-400'}`}>{t.lastMsg}</p>
              </div>
              {t.unread > 0 && selectedPatient?.id !== t.id && (
                <span className="w-5 h-5 bg-ios-red text-white text-[9px] font-black rounded-full flex items-center justify-center shrink-0">
                  {t.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex flex-col shadow-sm relative overflow-hidden">
        {selectedPatient ? (
          <>
            <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center font-black text-xl shrink-0">👤</div>
                  <div className="text-left flex flex-col">
                     <h4 className="font-black text-gray-900 dark:text-white text-lg tracking-tight">{selectedPatient.name}</h4>
                     <p className="text-[10px] font-black text-ios-green uppercase tracking-widest">Case ID: Verified-X881</p>
                  </div>
               </div>
               <div className="flex items-center gap-3 px-6 py-3 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 dark:border-gray-700">
                 Secure Channel Active
               </div>
            </div>

            <div className="flex-1 p-10 overflow-y-auto space-y-6 text-left">
               {(messages[selectedPatient.id] || []).map(m => (
                 <div key={m.id} className={`flex flex-col ${m.type === 'out' ? 'items-end' : 'items-start'} w-full`}>
                    <div className={`p-5 rounded-3xl ${m.type === 'out' ? 'bg-ios-blue text-white rounded-tr-none' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-tl-none'} max-w-[80%]`}>
                       <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 mt-2 mx-1">{m.time} {m.type === 'out' && '• Delivered'}</span>
                 </div>
               ))}
               {(messages[selectedPatient.id] || []).length === 0 && (
                 <p className="text-center text-gray-300 text-xs font-bold uppercase tracking-widest py-20">Beginning Secure Transmission...</p>
               )}
            </div>

            <div className="p-8 border-t border-gray-100 dark:border-gray-800">
               <form className="flex items-center gap-4" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                  <input 
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600/20 text-gray-900 dark:text-white"
                    placeholder="Type clinical advice..."
                  />
                  <button type="submit" className="w-16 h-16 bg-ios-blue text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                    <svg className="w-6 h-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
               </form>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-20 p-20">
             <div className="text-7xl mb-8">
               <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785 0.534 0.534 0 00.416.858 6.603 6.603 0 004.226-1.752c.341-.117.73-.147 1.102-.147z" />
               </svg>
             </div>
             <p className="text-xl font-black uppercase tracking-widest text-gray-400">Select a thread to begin follow-up</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMessaging;
