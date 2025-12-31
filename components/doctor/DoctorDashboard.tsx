
import React, { useState, useEffect } from 'react';
import { User, Prediction } from '../../types';
import PredictionVerifier from './PredictionVerifier';
import PrescriptionCreator from './PrescriptionCreator';
import PatientMessaging from './PatientMessaging';

interface DoctorDashboardProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (data: Partial<User>) => void;
  toggleDarkMode: () => void;
  isDark: boolean;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ user, onLogout, onUpdateUser, toggleDarkMode, isDark }) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);
  const [activeView, setActiveView] = useState<'review' | 'prescriptions' | 'messaging' | 'patients' | 'account'>('review');
  const [editForm, setEditForm] = useState<Partial<User>>(user);
  const [patientSearch, setPatientSearch] = useState('');
  const [detailedPatient, setDetailedPatient] = useState<Prediction | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('docai_predictions') || '[]');
    setPredictions(stored);

    const interval = setInterval(() => {
      const latest = JSON.parse(localStorage.getItem('docai_predictions') || '[]');
      setPredictions(latest);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setEditForm(user);
  }, [user]);

  const handleVerify = (id: string, status: 'Verified' | 'Rejected', note: string) => {
    const updated = predictions.map(p => 
      p.id === id ? { ...p, status, doctorNote: note, verifiedBy: user.name } : p
    );
    setPredictions(updated);
    localStorage.setItem('docai_predictions', JSON.stringify(updated));
    setSelectedPrediction(null);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(editForm);
    alert('Professional profile synchronized successfully.');
    setActiveView('review');
  };

  const pendingCount = predictions.filter(p => p.status === 'Pending').length;

  const navigationItems = [
    { 
      id: 'review', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .415.162.798.425 1.081.263.283.623.46 1.02.46s.757-.177 1.02-.46c.263-.283.425-.666.425-1.081 0-.231-.035-.454-.1-.664m-5.801 0A44.216 44.216 0 0112 2.25c2.156 0 4.23.15 6.251.442m-14.13 1.591A48.402 48.402 0 013 6.108V18.25A2.25 2.25 0 005.25 20.5h13.5A2.25 2.25 0 0021 18.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08" />
        </svg>
      ), 
      label: 'Queue', count: pendingCount 
    },
    { 
      id: 'prescriptions', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      ), 
      label: 'Rx Pad' 
    },
    { 
      id: 'messaging', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785 0.534 0.534 0 00.416.858 6.603 6.603 0 004.226-1.752c.341-.117.73-.147 1.102-.147z" />
        </svg>
      ), 
      label: 'Secure Comms' 
    },
    { 
      id: 'patients', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ), 
      label: 'Registry' 
    },
    { 
      id: 'account', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      label: 'Practitioner' 
    }
  ];

  const BackToMainButton = () => (
    <div className="w-full flex justify-start mb-10">
      <button 
        onClick={() => {setActiveView('review'); setSelectedPrediction(null); setDetailedPatient(null);}}
        className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-3 bg-white dark:bg-gray-900 px-6 py-3.5 rounded-2xl transition-all border border-gray-100 dark:border-gray-800 shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        DASHBOARD
      </button>
    </div>
  );

  const renderView = () => {
    if (detailedPatient) {
      return (
        <div className="animate-in slide-in-from-right-4 duration-500 flex flex-col items-center w-full pb-32 text-left">
          <BackToMainButton />
          <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-[3rem] p-10 shadow-sm border border-gray-100 dark:border-gray-800">
             <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-4xl">👤</div>
                <div>
                   <h2 className="text-3xl font-black tracking-tighter dark:text-white leading-none">{detailedPatient.patientName}</h2>
                   <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2">Verified Identity • Mumbai Node</p>
                </div>
             </div>
             <div className="space-y-8">
                <div className="p-8 bg-ios-grey dark:bg-black/20 rounded-2xl border border-black/5">
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Diagnostic History</p>
                   <div className="flex justify-between items-end">
                      <div>
                         <p className="text-xl font-black dark:text-white">{detailedPatient.diseaseName}</p>
                         <p className="text-[10px] font-bold text-ios-blue uppercase tracking-widest mt-1">{detailedPatient.confidence}% AI Confidence</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${detailedPatient.status === 'Verified' ? 'bg-ios-green/10 text-ios-green' : 'bg-ios-orange/10 text-ios-orange'}`}>
                         {detailedPatient.status}
                      </span>
                   </div>
                </div>
                <div>
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Reported Symptoms</p>
                   <div className="flex flex-wrap gap-2">
                      {detailedPatient.symptoms.map(s => (
                        <span key={s} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs font-bold dark:text-white rounded-xl uppercase tracking-widest">
                          {s}
                        </span>
                      ))}
                   </div>
                </div>
                {detailedPatient.doctorNote && (
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Practitioner Feedback</p>
                    <p className="text-sm text-gray-500 font-medium italic leading-relaxed">"{detailedPatient.doctorNote}"</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'review':
        return selectedPrediction ? (
          <div className="max-w-3xl animate-in slide-in-from-right-4 duration-500 mx-auto flex flex-col items-center w-full">
            <PredictionVerifier 
              prediction={selectedPrediction} 
              onComplete={handleVerify}
              onBack={() => setSelectedPrediction(null)}
            />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500 flex flex-col items-center w-full">
            <div className="mb-12 text-center">
              <h2 className="text-[10px] font-black text-ios-blue uppercase tracking-[0.3em] mb-2">Professional Protocol</h2>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Diagnostic Registry</h1>
            </div>

            {predictions.length === 0 ? (
              <div className="w-full h-96 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 bg-white dark:bg-gray-900 rounded-[3rem] border border-dashed border-gray-200 dark:border-gray-800">
                <svg className="w-16 h-16 mb-6 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196 7.5 7.5 0 0010.607 10.607z" /></svg>
                <p className="text-sm font-black uppercase tracking-widest">No cases pending review</p>
              </div>
            ) : (
              <div className="grid gap-4 w-full max-w-4xl">
                {predictions.filter(p => p.status === 'Pending').map(p => (
                  <div key={p.id} className="p-8 bg-white dark:bg-gray-900 rounded-ios-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm group">
                    <div className="flex items-center gap-8 text-left">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-ios-blue shrink-0"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg></div>
                      <div className="flex flex-col items-start"><h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{p.diseaseName}</h3><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Patient Registry: <span className="text-gray-900 dark:text-white">{p.patientName}</span></p></div>
                    </div>
                    <button onClick={() => setSelectedPrediction(p)} className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[9px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-sm active:scale-95 transition-all">Review Case</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'prescriptions': return <div className="w-full"><BackToMainButton /><PrescriptionCreator doctorName={user.name} /></div>;
      case 'messaging': return <div className="w-full h-full"><BackToMainButton /><PatientMessaging /></div>;
      case 'patients':
        const filteredPredictions = predictions.filter(p => p.patientName.toLowerCase().includes(patientSearch.toLowerCase()) || p.diseaseName.toLowerCase().includes(patientSearch.toLowerCase()));
        return (
          <div className="animate-in fade-in duration-500 flex flex-col items-center w-full pb-32 text-left">
            <BackToMainButton />
            <div className="w-full mb-10"><h2 className="text-4xl font-black tracking-tighter mb-6 dark:text-white">Patient Registry</h2><div className="relative"><input type="text" value={patientSearch} onChange={(e) => setPatientSearch(e.target.value)} placeholder="Filter by name, ID or pathology..." className="w-full px-6 py-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 outline-none text-sm font-bold shadow-sm dark:text-white" /></div></div>
            <div className="grid gap-4 w-full">
              {filteredPredictions.map(p => (
                <div key={p.id} className="p-6 bg-white dark:bg-gray-900 rounded-ios-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-6"><div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg></div><div className="text-left"><h4 className="font-bold text-base leading-none dark:text-white">{p.patientName}</h4><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Diagnosis: {p.diseaseName}</p><p className={`text-[9px] font-black uppercase mt-1 ${p.status === 'Verified' ? 'text-ios-green' : 'text-ios-orange'}`}>{p.status}</p></div></div>
                  <button onClick={() => setDetailedPatient(p)} className="text-ios-blue font-bold text-xs uppercase tracking-widest active:opacity-50 transition-all">Details</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto flex flex-col items-center pb-32 text-left">
            <BackToMainButton />
            <div className="mb-12 text-center"><h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Credentials</h1><p className="text-[10px] font-black text-ios-blue uppercase tracking-[0.3em] mt-2">Verified Practitioner Profile</p></div>
            <div className="w-full bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 mb-10 text-left flex items-start gap-10 relative overflow-hidden"><div className="absolute top-0 right-0 p-8 opacity-5 text-gray-900 dark:text-white"><svg className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84a51.39 51.39 0 00-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg></div><div className="bg-white p-3 rounded-2xl shadow-2xl shrink-0 border border-gray-100 z-10"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DOC_LICENSE_${user.licenseNumber}`} alt="Doctor QR" className="w-24 h-24" /></div><div className="flex-1 z-10"><h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 leading-none">{user.name}</h3><p className="text-ios-blue text-[10px] font-black uppercase tracking-[0.2em]">{user.specialty} Specialist</p><div className="mt-8 space-y-3"><p className="text-[10px] font-bold text-gray-500"><span className="text-gray-400 uppercase tracking-widest mr-3">License Protocol:</span> {user.licenseNumber}</p><p className="text-[10px] font-bold text-gray-500"><span className="text-gray-400 uppercase tracking-widest mr-3">Grid Affiliation:</span> {user.hospitalAffiliation}</p></div></div></div>
            <form onSubmit={handleUpdateProfile} className="w-full space-y-6"><div className="text-left bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"><p className="px-10 pt-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Personal Matrix</p><div className="px-10 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between"><label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label><input className="bg-transparent text-right outline-none text-ios-blue font-bold text-sm" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} /></div><div className="px-10 py-6 flex items-center justify-between"><label className="text-xs font-bold uppercase tracking-widest text-gray-400">Consultation Fee</label><input className="bg-transparent text-right outline-none text-ios-blue font-bold text-sm" type="number" value={editForm.consultationFee} onChange={e => setEditForm({...editForm, consultationFee: Number(e.target.value)})} /></div></div><button type="submit" className="w-full py-5 bg-ios-blue text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-sm active:scale-95 transition-all">Synchronize Protocol</button></form>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 dark:bg-black transition-colors overflow-hidden text-left">
      <aside className="w-80 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col p-10 hidden lg:flex shrink-0">
        <div className="flex items-center gap-5 mb-16"><div className="w-12 h-12 bg-gray-900 dark:bg-ios-blue rounded-2xl flex items-center justify-center text-white shadow-sm"><svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg></div><div><h1 className="text-2xl font-bold tracking-tight dark:text-white leading-tight">DocAI</h1><p className="text-[9px] font-black uppercase tracking-[0.3em] text-ios-blue">Professional</p></div></div>
        <nav className="flex-1 space-y-2">{navigationItems.map(item => (<button key={item.id} onClick={() => { setActiveView(item.id as any); setDetailedPatient(null); }} className={`w-full flex items-center justify-between p-4 px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeView === item.id ? 'bg-gray-900 dark:bg-ios-blue text-white shadow-sm' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}><div className="flex items-center gap-5">{item.icon} {item.label}</div>{item.count ? <span className="bg-ios-red text-white px-2 py-0.5 rounded-full text-[8px]">{item.count}</span> : null}</button>))}</nav>
        <div className="mt-auto pt-10 border-t border-gray-100 dark:border-gray-800"><button onClick={onLogout} className="w-full py-4 bg-ios-red/5 text-ios-red rounded-2xl font-black uppercase text-[9px] tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>Terminals</button></div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 md:p-14 pb-32"><header className="lg:hidden flex justify-between items-center mb-10 pt-4"><div className="flex items-center gap-4 text-left"><div className="w-10 h-10 bg-gray-900 dark:bg-ios-blue rounded-xl flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg></div><h1 className="text-xl font-black dark:text-white leading-tight">DocAI Pro</h1></div><button onClick={onLogout} className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg></button></header>{renderView()}</main>
      <nav className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 glass bg-white/90 dark:bg-gray-950/90 border border-white/20 dark:border-gray-800 shadow-2xl rounded-[2.5rem] px-10 py-5 flex items-center justify-center gap-12 z-50">{navigationItems.map(item => (<button key={item.id} onClick={() => { setActiveView(item.id as any); setDetailedPatient(null); }} className={`transition-all ${activeView === item.id ? 'text-ios-blue scale-125' : 'text-gray-300'}`}>{item.icon}</button>))}</nav>
    </div>
  );
};

export default DoctorDashboard;
