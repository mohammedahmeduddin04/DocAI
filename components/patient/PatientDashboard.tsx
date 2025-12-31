
import React, { useState, useEffect, useMemo } from 'react';
import { User, Prediction, MedicalTest, Vaccine, Doctor } from '../../types';
import DiseasePredictor from './DiseasePredictor';
import PatientComms from './PatientComms';
import OrganDonation from './OrganDonation';
import { DOCTORS, MEDICAL_TESTS, VACCINES, REGISTRY_COUNTS } from '../../constants';

interface PatientDashboardProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (data: Partial<User>) => void;
  toggleDarkMode: () => void;
  isDark: boolean;
}

const SectionHeader: React.FC<{ title: string; value?: string; onClick?: () => void }> = ({ title, value, onClick }) => (
  <div className="flex justify-between items-end mb-8 px-1">
    <div className="text-left">
      <h2 className="text-3xl font-black tracking-tighter dark:text-white leading-none">{title}</h2>
      <div className="h-1 w-10 bg-ios-blue mt-3 rounded-full"></div>
    </div>
    {value && (
      <button 
        onClick={onClick}
        className="text-[10px] font-black text-ios-blue uppercase tracking-widest active:opacity-50"
      >
        {value}
      </button>
    )}
  </div>
);

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user, onLogout, onUpdateUser, toggleDarkMode, isDark }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'prediction' | 'doctors' | 'card' | 'account' | 'tests' | 'vaccines' | 'comms' | 'organDonation'>('home');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [editForm, setEditForm] = useState<Partial<User>>(user);
  const [selectedItem, setSelectedItem] = useState<{data: any, type: 'Doctor' | 'Test' | 'Vaccine'} | null>(null);
  const [confirmationPass, setConfirmationPass] = useState<{title: string, date: string, id: string, venue: string} | null>(null);
  const [isOrganDonor, setIsOrganDonor] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('docai_predictions') || '[]');
    setPredictions(stored);
    
    // Check organ donor status
    const pledge = localStorage.getItem('docai_organ_pledge');
    setIsOrganDonor(!!pledge);
  }, [activeTab]);

  const latestPrediction = predictions[0];

  // Smart Filtering: Move relevant specialists/tests to the top
  const sortedDoctors = useMemo(() => {
    if (!latestPrediction) return DOCTORS;
    return [...DOCTORS].sort((a, b) => {
      const aMatch = a.specialty.toLowerCase() === latestPrediction.specialty.toLowerCase() ? -1 : 1;
      const bMatch = b.specialty.toLowerCase() === latestPrediction.specialty.toLowerCase() ? -1 : 1;
      return aMatch - bMatch;
    });
  }, [latestPrediction]);

  const sortedTests = useMemo(() => {
    if (!latestPrediction) return MEDICAL_TESTS;
    return [...MEDICAL_TESTS].sort((a, b) => {
      const relevance = ["Imaging", "Blood Test"].includes(a.category) ? -1 : 1;
      return relevance;
    });
  }, [latestPrediction]);

  const handleBook = (item: any, type: string) => {
    setConfirmationPass({
      title: item.name,
      date: new Date(Date.now() + 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      id: `PASS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      venue: item.hospital || 'DocAI Clinical Node'
    });
    setSelectedItem(null);
  };

  const BackButton = () => (
    <div className="flex justify-start w-full mb-8">
      <button 
        onClick={() => { setActiveTab('home'); setSelectedItem(null); setConfirmationPass(null); }}
        className="text-ios-blue font-bold flex items-center gap-1 active:opacity-50 text-xs"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        SUMMARY
      </button>
    </div>
  );

  const renderContent = () => {
    if (confirmationPass) {
      return (
        <div className="animate-in zoom-in-95 duration-500 w-full flex flex-col items-center py-10">
          <div className="w-full max-w-sm bg-white dark:bg-ios-grey-dark rounded-ios-2xl shadow-2xl overflow-hidden border border-black/5 flex flex-col items-center">
            <div className="w-full bg-ios-blue p-8 text-white text-center">
               <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <h3 className="text-xl font-black uppercase tracking-tighter">Verified Protocol</h3>
               <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest mt-1">Registry Confirmation</p>
            </div>
            <div className="p-8 w-full space-y-6 text-left">
               <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Subject</p>
                  <p className="font-bold text-lg dark:text-white leading-none">{confirmationPass.title}</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Timestamp</p>
                    <p className="font-bold text-sm dark:text-white">{confirmationPass.date}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Pass Code</p>
                    <p className="font-bold text-sm text-ios-blue">{confirmationPass.id}</p>
                  </div>
               </div>
               <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Clinical Venue</p>
                  <p className="font-bold text-xs dark:text-white">{confirmationPass.venue}</p>
               </div>
               <div className="pt-6 border-t border-dashed border-gray-200 dark:border-gray-800 flex justify-center">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${confirmationPass.id}`} className="w-24 h-24 grayscale dark:invert opacity-80" alt="QR" />
               </div>
            </div>
          </div>
          <button 
            onClick={() => setConfirmationPass(null)}
            className="mt-10 text-[10px] font-black text-ios-blue uppercase tracking-widest"
          >
            Finish & Archive
          </button>
        </div>
      );
    }

    if (selectedItem) {
      return (
        <div className="animate-in slide-in-from-right-4 duration-500 w-full flex flex-col pb-32 text-left">
          <button 
            onClick={() => setSelectedItem(null)}
            className="text-ios-blue font-bold flex items-center gap-1 active:opacity-50 text-xs mb-8"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            BACK TO LIST
          </button>
          
          <div className="bg-white dark:bg-ios-grey-dark p-10 rounded-ios-2xl shadow-sm border border-black/5 mb-8">
            <div className="flex items-center gap-8 mb-10">
               <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-4xl">
                  {selectedItem.type === 'Doctor' ? '👨‍⚕️' : selectedItem.type === 'Test' ? '🔬' : '💉'}
               </div>
               <div>
                  <h2 className="text-3xl font-black tracking-tighter leading-tight dark:text-white">{selectedItem.data.name}</h2>
                  <p className="text-ios-blue text-[10px] font-black uppercase tracking-widest mt-1">
                    {selectedItem.type === 'Doctor' ? selectedItem.data.specialty : selectedItem.data.category}
                  </p>
               </div>
            </div>

            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-ios-grey dark:bg-black/20 rounded-2xl">
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Provider</p>
                     <p className="font-bold text-xs dark:text-white">{selectedItem.data.hospital || 'Apollo Hospitals'}</p>
                  </div>
                  <div className="p-5 bg-ios-grey dark:bg-black/20 rounded-2xl">
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Cost Protocol</p>
                     <p className="font-bold text-xs dark:text-white">₹{selectedItem.data.fee || selectedItem.data.price}</p>
                  </div>
               </div>
               
               <div className="p-6 space-y-8">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                      Clinical Insight
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {selectedItem.data.description}
                    </p>
                  </div>

                  {selectedItem.type === 'Test' && selectedItem.data.clinicalUtility && (
                    <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                       <p className="text-[9px] font-black text-ios-blue uppercase tracking-widest mb-2 flex items-center gap-2">
                         <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                         How This Test Helps You
                       </p>
                       <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed italic">
                         "{selectedItem.data.clinicalUtility}"
                       </p>
                    </div>
                  )}
               </div>
            </div>
          </div>

          <button 
            onClick={() => handleBook(selectedItem.data, selectedItem.type)}
            className="w-full py-5 bg-ios-blue text-white rounded-ios font-black uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all text-xs"
          >
            Confirm Clinical Booking
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'prediction': return <div className="w-full flex flex-col items-center"><BackButton /><DiseasePredictor patientId={user.id} patientName={user.name} onTriage={() => setActiveTab('doctors')} /></div>;
      case 'comms': return <div className="w-full flex flex-col items-center"><BackButton /><PatientComms latestPrediction={latestPrediction} /></div>;
      case 'organDonation': return <div className="w-full flex flex-col items-center"><BackButton /><OrganDonation user={user} onBack={() => setActiveTab('home')} /></div>;
      case 'home':
        return (
          <div className="w-full space-y-8 animate-in fade-in duration-700 pb-20 text-left">
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setActiveTab('prediction')} className="bg-white dark:bg-ios-grey-dark p-6 rounded-ios-xl text-left shadow-sm ring-1 ring-black/5 dark:ring-white/5 active:scale-[0.98] transition-all flex flex-col h-full">
                <div className="flex justify-between items-start mb-6"><div className="text-ios-blue"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg></div><span className="bg-ios-blue text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">AI</span></div>
                <h3 className="text-lg font-bold leading-tight">Health Scan</h3><p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Diagnosis Core</p><div className="mt-auto pt-6 text-ios-blue font-bold text-[9px] uppercase tracking-[0.2em]">Initiate Scan</div>
              </button>
              <button onClick={() => setActiveTab('doctors')} className="bg-white dark:bg-ios-grey-dark p-6 rounded-ios-xl text-left shadow-sm ring-1 ring-black/5 dark:ring-white/5 active:scale-[0.98] transition-all flex flex-col h-full">
                <div className="flex justify-between items-start mb-6"><div className="text-ios-green"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg></div></div>
                <h3 className="text-lg font-bold leading-tight">Consultants</h3><p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Specialist Network</p><div className="mt-auto pt-6 text-ios-green font-bold text-[9px] uppercase tracking-[0.2em]">Browse All</div>
              </button>
            </div>
            
            <div className="space-y-3">
              <button onClick={() => setActiveTab('card')} className="w-full bg-white dark:bg-ios-grey-dark p-5 rounded-ios shadow-sm ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-between active:bg-ios-grey transition-all"><div className="flex items-center gap-5"><div className="w-12 h-12 bg-ios-indigo/5 rounded-ios flex items-center justify-center text-ios-indigo"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg></div><div className="text-left"><p className="font-bold text-sm">Health Passport</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Digital Verified ID</p></div></div><span className="text-gray-300"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></span></button>
              <button onClick={() => setActiveTab('tests')} className="w-full bg-white dark:bg-ios-grey-dark p-5 rounded-ios shadow-sm ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-between active:bg-ios-grey transition-all"><div className="flex items-center gap-5"><div className="w-12 h-12 bg-ios-blue/5 rounded-ios flex items-center justify-center text-ios-blue"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg></div><div className="text-left"><p className="font-bold text-sm">Diagnostics</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{REGISTRY_COUNTS.TESTS} Tests Listed</p></div></div><span className="text-ios-blue"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></span></button>
              <button onClick={() => setActiveTab('vaccines')} className="w-full bg-white dark:bg-ios-grey-dark p-5 rounded-ios shadow-sm ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-between active:bg-ios-grey transition-all"><div className="flex items-center gap-5"><div className="w-12 h-12 bg-ios-orange/5 rounded-ios flex items-center justify-center text-ios-orange"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><div className="text-left"><p className="font-bold text-sm">Vaccinations</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{REGISTRY_COUNTS.VACCINES} Available</p></div></div><span className="text-ios-blue"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></span></button>
              
              {/* Organ Donation Button */}
              <button onClick={() => setActiveTab('organDonation')} className="w-full bg-white dark:bg-ios-grey-dark p-5 rounded-ios shadow-sm ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-between active:bg-ios-grey transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-ios flex items-center justify-center text-rose-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm">Organ Donation</p>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${isOrganDonor ? 'text-rose-600' : 'text-gray-400'}`}>
                      {isOrganDonor ? 'Verified Hero Pledge' : 'Join Global Registry'}
                    </p>
                  </div>
                </div>
                <span className="text-rose-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>

            <div className="bg-white dark:bg-ios-grey-dark p-8 rounded-ios-xl shadow-sm ring-1 ring-black/5 dark:ring-white/5">
              <div className="flex justify-between items-center mb-6"><div className="flex items-center gap-3"><span className="text-ios-red"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg></span><span className="text-xs font-black uppercase tracking-widest">Latest Scan</span></div><span className="text-[9px] font-black text-ios-blue uppercase tracking-[0.3em]">Protocol Verified</span></div>
              {latestPrediction ? (<div className="flex items-end gap-3"><span className="text-4xl font-black tracking-tighter leading-none">{latestPrediction.diseaseName}</span><span className="text-ios-blue font-bold text-xs uppercase tracking-widest mb-1">{latestPrediction.confidence}% Confidence</span></div>) : (<div className="text-gray-400 font-bold text-xs uppercase tracking-widest py-4">No Data Registered. Start Scan.</div>)}
            </div>

            {/* Organ Donation Data Summary */}
            {isOrganDonor && (
              <div className="p-8 bg-rose-50 dark:bg-rose-900/10 rounded-ios-xl border border-rose-100 dark:border-rose-900/30 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black italic">H</div>
                  <h4 className="text-xs font-black text-rose-600 uppercase tracking-widest">Global Donor Profile</h4>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Your verified pledge is active in the national registry. In an emergency, your biological directive is visible to all Level-5 surgical nodes.</p>
              </div>
            )}
          </div>
        );
      case 'doctors':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full flex flex-col pb-32 text-left">
            <BackButton />
            <SectionHeader title="Expert Network" />
            <div className="grid gap-3 grid-cols-1">
              {sortedDoctors.map(doc => (
                <div 
                  key={doc.id} 
                  onClick={() => setSelectedItem({data: doc, type: 'Doctor'})}
                  className={`bg-white dark:bg-ios-grey-dark p-5 rounded-ios shadow-sm ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-between cursor-pointer hover:bg-ios-grey/50 dark:hover:bg-white/5 transition-all ${latestPrediction?.specialty === doc.specialty ? 'border-l-4 border-ios-green' : ''}`}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-400">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base leading-tight dark:text-white">{doc.name}</h4>
                        {latestPrediction?.specialty === doc.specialty && <span className="bg-ios-green/10 text-ios-green text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">Relevant</span>}
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{doc.specialty}</p>
                      <div className="flex items-center gap-1 mt-2 text-[10px] font-black text-gray-600 dark:text-gray-400">
                        <span className="text-ios-orange">★</span><span>{doc.rating}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-ios-blue uppercase tracking-widest">₹{doc.fee}</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="uppercase tracking-widest">{doc.experience}y Exp</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-300"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'tests':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full flex flex-col pb-32 text-left">
            <BackButton />
            <SectionHeader title="Diagnostics" />
            <div className="grid gap-3 grid-cols-1">
              {sortedTests.map(test => (
                <div 
                  key={test.id} 
                  onClick={() => setSelectedItem({data: test, type: 'Test'})}
                  className="bg-white dark:bg-ios-grey-dark p-6 rounded-ios shadow-sm ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-between cursor-pointer hover:bg-ios-grey/50 transition-all"
                >
                  <div className="text-left max-w-[85%]">
                    <h4 className="font-bold text-base leading-tight dark:text-white">{test.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{test.category} • {test.duration}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2 line-clamp-1 italic">"{test.description}"</p>
                  </div>
                  <span className="text-gray-300"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'vaccines':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full flex flex-col pb-32 text-left">
            <BackButton />
            <SectionHeader title="Immunization" />
            <div className="grid gap-3 grid-cols-1">
              {VACCINES.map(v => (
                <div 
                  key={v.id} 
                  onClick={() => setSelectedItem({data: v, type: 'Vaccine'})}
                  className="bg-white dark:bg-ios-grey-dark p-6 rounded-ios shadow-sm ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-between cursor-pointer hover:bg-ios-grey/50 transition-all"
                >
                  <div className="text-left">
                    <h4 className="font-bold text-base leading-tight dark:text-white">{v.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{v.ageEligibility} • {v.category}</p>
                  </div>
                  <span className="text-gray-300"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'card':
        return (
          <div className="animate-in fade-in duration-500 w-full flex flex-col pb-32 items-center text-left">
            <BackButton />
            <SectionHeader title="ID Protocol" value="Update" onClick={() => setActiveTab('account')} />
            <div className="w-full bg-black p-10 rounded-ios-2xl text-white shadow-2xl relative overflow-hidden ring-1 ring-white/10 mb-8"><div className="absolute top-0 right-0 p-10 opacity-10"><svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg></div><div className="flex justify-between items-start mb-12 relative z-10"><div className="flex flex-col"><h3 className="text-2xl font-bold tracking-tight">{user.name}</h3><p className="text-ios-blue text-[9px] font-black uppercase tracking-[0.3em] mt-1">Verified Member • {user.id.toUpperCase()}</p></div><div className="bg-white p-2 rounded-xl shadow-2xl"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`DOCAI_PATIENT_IDENTITY_VERIFIED_${user.id}_${user.name}`)}&bgcolor=FFFFFF&color=000000`} alt="Patient QR Code" className="w-20 h-20" /></div></div><div className="grid grid-cols-2 gap-10 relative z-10"><div><p className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em] mb-1">Blood Registry</p><p className="text-xl font-bold text-ios-red">{user.bloodGroup || 'O POSITIVE'}</p></div><div><p className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em] mb-1">Vital Statistics</p><p className="text-xl font-bold">{user.dob ? (new Date().getFullYear() - new Date(user.dob).getFullYear()) : '28'}y • {user.gender || 'Male'}</p></div></div></div>
            <div className="w-full space-y-4"><div className="bg-white dark:bg-ios-grey-dark p-8 rounded-ios-xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 space-y-6 text-left"><div className="grid grid-cols-2 gap-6 border-b border-black/5 dark:border-white/5 pb-6"><div className="flex flex-col"><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Allergies</span><span className="font-bold text-ios-orange text-xs">{user.allergies || 'NONE REGISTERED'}</span></div><div className="flex flex-col"><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</span><span className="font-bold text-xs uppercase tracking-widest text-ios-green">Active Member</span></div></div><div className="flex flex-col border-b border-black/5 dark:border-white/5 pb-6"><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Emergency Command</span><div className="flex justify-between items-center"><span className="font-bold text-xs">{user.emergencyContact || 'ADMIN PROTOCOL'}</span><span className="text-ios-blue text-xs font-black tracking-widest">{user.emergencyPhone || 'N/A'}</span></div></div><div className="flex flex-col"><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Insurance Protocol</span><div className="flex justify-between items-center"><span className="font-bold text-xs">{user.insuranceProvider || 'N/A'}</span><span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Policy: {user.insurancePolicy || 'SECURE'}</span></div></div></div><div className="p-6 bg-ios-grey dark:bg-white/5 rounded-ios text-center border border-black/5 dark:border-white/5 cursor-pointer active:scale-[0.98] transition-all" onClick={() => handleBook({name: 'ID Transmission Protocol'}, 'Broadcast')}><p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em]">SECURE ACCESS PROTOCOL</p><p className="text-[10px] text-gray-500 font-bold mt-1">Tap to broadcast digital ID to nearby clinical nodes.</p></div></div>
          </div>
        );
      case 'account':
        return (
          <div className="animate-in slide-in-from-bottom-4 duration-500 w-full flex flex-col pb-32 text-left">
            <BackButton />
            <SectionHeader title="Profile Matrix" />
            <form onSubmit={(e) => { e.preventDefault(); handleBook({name: 'Profile Synchronization'}, 'System Sync'); }} className="space-y-6">
              <div className="text-left bg-white dark:bg-ios-grey-dark rounded-ios-xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 overflow-hidden"><p className="px-8 pt-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Identification</p><div className="px-8 py-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between"><label className="text-xs font-bold uppercase tracking-widest text-gray-500 w-32">Display Name</label><input className="flex-1 bg-transparent text-right outline-none text-ios-blue font-bold text-sm" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} /></div><div className="px-8 py-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between"><label className="text-xs font-bold uppercase tracking-widest text-gray-500 w-32">Email Code</label><input className="flex-1 bg-transparent text-right outline-none text-ios-blue font-bold text-sm" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} /></div></div>
              <div className="text-left bg-white dark:bg-ios-grey-dark rounded-ios-xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 overflow-hidden"><p className="px-8 pt-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Clinical Parameters</p><div className="px-8 py-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between"><label className="text-xs font-bold uppercase tracking-widest text-gray-500 w-32">Blood Registry</label><select className="bg-transparent text-right outline-none text-ios-blue font-bold text-sm cursor-pointer" value={editForm.bloodGroup} onChange={e => setEditForm({...editForm, bloodGroup: e.target.value})}>{["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}</select></div><div className="px-8 py-5 flex flex-col items-start gap-3"><label className="text-xs font-bold uppercase tracking-widest text-gray-500">Manifested Allergies</label><textarea className="w-full bg-ios-grey dark:bg-white/5 p-4 rounded-ios outline-none text-sm font-bold text-ios-blue resize-none h-24" placeholder="List all known hazards..." value={editForm.allergies} onChange={e => setEditForm({...editForm, allergies: e.target.value})} /></div></div>
              <button type="submit" className="w-full py-5 bg-ios-blue text-white rounded-ios font-black uppercase tracking-[0.2em] shadow-sm active:scale-[0.98] transition-all text-xs">Sync Command Matrix</button>
            </form>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen px-6 pt-12 pb-32">
      <header className="flex justify-between items-center mb-10 w-full">
        <div className="flex flex-col text-left"><p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] mb-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p><h1 className="text-3xl font-bold tracking-tight dark:text-white">Summary</h1></div>
        <div className="flex items-center gap-3"><button onClick={toggleDarkMode} className="w-10 h-10 bg-white dark:bg-ios-grey-dark rounded-full shadow-sm ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-center text-gray-400 hover:text-ios-blue transition-all">{isDark ? (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M17.72 17.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M17.72 6.28l1.06-1.06M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>) : (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>)}</button><button onClick={onLogout} className="w-10 h-10 bg-white dark:bg-ios-grey-dark rounded-full shadow-sm ring-1 ring-black/5 dark:ring-white/5 flex items-center justify-center text-gray-400 hover:text-ios-red transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg></button></div>
      </header>
      {renderContent()}
      <nav className="fixed bottom-0 left-0 right-0 h-24 glass bg-white/80 dark:bg-black/80 border-t border-black/5 dark:border-white/5 flex items-center justify-center gap-10 z-50 px-6">
        <button onClick={() => { setActiveTab('home'); setSelectedItem(null); setConfirmationPass(null); }} className={`flex flex-col items-center gap-1.5 transition-all ${['home', 'tests', 'vaccines'].includes(activeTab) ? 'text-ios-blue' : 'text-gray-300'}`}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg><span className="text-[8px] font-black uppercase tracking-widest">Summary</span></button>
        <button onClick={() => { setActiveTab('prediction'); setSelectedItem(null); setConfirmationPass(null); }} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'prediction' ? 'text-ios-blue' : 'text-gray-300'}`}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg><span className="text-[8px] font-black uppercase tracking-widest">Health</span></button>
        <button onClick={() => { setActiveTab('doctors'); setSelectedItem(null); setConfirmationPass(null); }} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'doctors' ? 'text-ios-blue' : 'text-gray-300'}`}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg><span className="text-[8px] font-black uppercase tracking-widest">Network</span></button>
        <button onClick={() => { setActiveTab('comms'); setSelectedItem(null); setConfirmationPass(null); }} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'comms' ? 'text-ios-blue' : 'text-gray-300'}`}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785 0.534 0.534 0 00.416.858 6.603 6.603 0 004.226-1.752c.341-.117.73-.147 1.102-.147z" /></svg><span className="text-[8px] font-black uppercase tracking-widest">Comms</span></button>
        <button onClick={() => { setActiveTab('card'); setSelectedItem(null); setConfirmationPass(null); }} className={`flex flex-col items-center gap-1.5 transition-all ${['card', 'account', 'organDonation'].includes(activeTab) ? 'text-ios-blue' : 'text-gray-300'}`}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg><span className="text-[8px] font-black uppercase tracking-widest">Passport</span></button>
      </nav>
    </div>
  );
};

export default PatientDashboard;
