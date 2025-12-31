
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import GeographicMap from './GeographicMap';
import OutbreakDetection from './OutbreakDetection';
import LivePredictionFeed from './LivePredictionFeed';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (data: Partial<User>) => void;
  toggleDarkMode: () => void;
  isDark: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, onUpdateUser, toggleDarkMode, isDark }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'outbreak' | 'feed' | 'users' | 'account'>('overview');
  const [stats] = useState({ users: 12547, predictions: 45632, pending: 412 });
  const [editForm, setEditForm] = useState<Partial<User>>(user);
  const [personnel, setPersonnel] = useState([
    { id: '1', name: 'Dr. Sarah Smith', role: 'Doctor', dept: 'Neurology', status: 'Verified' },
    { id: '2', name: 'Dr. Mike Ross', role: 'Doctor', dept: 'General', status: 'Pending' },
    { id: '3', name: 'James Wilson', role: 'Admin', dept: 'Logistics', status: 'Verified' }
  ]);

  useEffect(() => {
    setEditForm(user);
  }, [user]);

  const navItems = [
    { 
      id: 'overview', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 001.5 8.25v10.5a2.25 2.25 0 002.25 2.25h16.5a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25H3.75zM3 18.75V8.25h18v10.5H3zM6.75 12h.75v.75h-.75V12zm0 3h.75v.75h-.75V15zm3-3h.75v.75h-.75V12zm0 3h.75v.75h-.75V15zm3-3h.75v.75h-.75V12zm0 3h.75v.75h-.75V15zm3-3h.75v.75h-.75V12zm0 3h.75v.75h-.75V15zm3-3h.75v.75h-.75V12zm0 3h.75v.75h-.75V15z" />
        </svg>
      ), 
      label: 'Matrix' 
    },
    { 
      id: 'map', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-10.5v.75m.01 0a.75.75 0 11-.02 0 .75.75 0 01.02 0zm0 3a.75.75 0 11-.02 0 .75.75 0 01.02 0zm0 3a.75.75 0 11-.02 0 .75.75 0 01.02 0zm0 3a.75.75 0 11-.02 0 .75.75 0 01.02 0zm0 3a.75.75 0 11-.02 0 .75.75 0 01.02 0zm-6-9h.01M9 16.5h.01M15.75 4.5a3 3 0 11.082 5.998 4.5 4.5 0 10-7.726 3.996 4.5 4.5 0 00-7.474 3.654c.04.899.806 1.35 1.513 1.35h18.914c.707 0 1.473-.451 1.513-1.35a4.5 4.5 0 00-7.474-3.654 4.5 4.5 0 10-7.726-3.996 3.012 3.012 0 01.082-5.998z" />
        </svg>
      ), 
      label: 'Geo-Map' 
    },
    { 
      id: 'outbreak', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.34c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ), 
      label: 'Outbreaks' 
    },
    { 
      id: 'users', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ), 
      label: 'Authority' 
    },
    { 
      id: 'account', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.226a.91.91 0 00-.807.981 12.001 12.001 0 0021.136 0 .91.91 0 00-.807-.981A11.959 11.959 0 0112 2.714z" />
        </svg>
      ), 
      label: 'Security' 
    }
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(editForm);
    alert('Security credentials updated.');
    setActiveTab('overview');
  };

  const toggleVerify = (id: string) => {
    setPersonnel(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'Verified' ? 'Suspended' : 'Verified' } : p));
  };

  const BackButton = () => (
    <div className="w-full flex justify-start mb-10">
      <button onClick={() => setActiveTab('overview')} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 bg-white dark:bg-ios-grey-dark px-8 py-4 rounded-2xl border border-black/5 flex items-center gap-3 shadow-sm">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        MATRIX CORE
      </button>
    </div>
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center w-full">
            <div className="flex justify-between items-center w-full mb-12 text-left">
              <div>
                <p className="text-[10px] font-black text-ios-orange uppercase tracking-[0.3em] mb-2">Surveillance Core</p>
                <h1 className="text-5xl font-black tracking-tighter">System Pulse</h1>
              </div>
              <div className="bg-ios-green/5 px-6 py-3 rounded-full flex items-center gap-3 border border-ios-green/10 cursor-pointer active:scale-95 transition-all" onClick={() => alert('Diagnostic integrity confirmed.')}>
                <div className="w-2.5 h-2.5 bg-ios-green rounded-full animate-pulse shadow-[0_0_8px_#34C759]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ios-green">Active Link</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
              <div className="bg-white dark:bg-ios-grey-dark p-10 rounded-ios-2xl shadow-sm border border-black/5 text-center cursor-pointer active:scale-[0.98] transition-all" onClick={() => setActiveTab('users')}>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Total Users</p>
                <p className="text-5xl font-black tracking-tighter leading-none">{stats.users.toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-ios-grey-dark p-10 rounded-ios-2xl shadow-sm border border-black/5 text-center cursor-pointer active:scale-[0.98] transition-all" onClick={() => setActiveTab('map')}>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Diagnostic Run</p>
                <p className="text-5xl font-black tracking-tighter leading-none">{stats.predictions.toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-ios-grey-dark p-10 rounded-ios-2xl shadow-sm border border-black/5 text-center border-t-8 border-ios-orange cursor-pointer active:scale-[0.98] transition-all" onClick={() => setActiveTab('outbreak')}>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Registry Wait</p>
                <p className="text-5xl font-black tracking-tighter text-ios-orange leading-none">{stats.pending}</p>
              </div>
            </div>
          </div>
        );
      case 'map': return <div className="w-full"><GeographicMap onBack={() => setActiveTab('overview')} /></div>;
      case 'outbreak': return <div className="w-full"><OutbreakDetection onBack={() => setActiveTab('overview')} /></div>;
      case 'users':
        return (
          <div className="animate-in slide-in-from-right-4 duration-500 flex flex-col items-center w-full pb-32 text-left">
            <BackButton />
            <div className="w-full mb-10">
              <h2 className="text-4xl font-black tracking-tighter">Authority Registry</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Verified Clinical Personnel</p>
            </div>
            <div className="w-full bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-gray-800">
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Personnel</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Sector</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Auth Status</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Protocol</th>
                     </tr>
                  </thead>
                  <tbody>
                     {personnel.map(p => (
                        <tr key={p.id} className="border-b border-gray-50 dark:border-gray-800 last:border-none">
                           <td className="px-8 py-6">
                              <p className="font-bold text-sm">{p.name}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.role}</p>
                           </td>
                           <td className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest">{p.dept}</td>
                           <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${p.status === 'Verified' ? 'bg-ios-green/10 text-ios-green' : 'bg-ios-orange/10 text-ios-orange'}`}>
                                 {p.status}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button onClick={() => toggleVerify(p.id)} className="text-ios-blue text-[10px] font-black uppercase tracking-widest active:opacity-50">
                                 {p.status === 'Verified' ? 'Revoke' : 'Verify'}
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto flex flex-col items-center pb-32 text-left">
            <BackButton />
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-black tracking-tighter">Authority</h1>
              <p className="text-[10px] font-black text-ios-orange uppercase tracking-[0.3em] mt-2">Security Clearance Protocol</p>
            </div>
            <div className="w-full bg-black p-12 rounded-ios-2xl text-white shadow-2xl relative overflow-hidden mb-12 flex items-center justify-between">
                <div className="flex-1 text-left relative z-10">
                  <p className="text-ios-orange text-[10px] font-black uppercase tracking-[0.4em] mb-3">Clearance: {user.clearanceCode}</p>
                  <h3 className="text-3xl font-bold tracking-tight mb-8">{user.name}</h3>
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]"><span className="text-gray-500 mr-4">Sector:</span> {user.department}</p>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]"><span className="text-gray-500 mr-4">Personnel:</span> {user.personnelCode}</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-2xl shrink-0 relative z-10">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`ADMIN_CLEARANCE_PROTOCOL_ALPHA_${user.clearanceCode}_${user.id}`)}`} alt="Admin QR" className="w-24 h-24" />
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-5">
                   <svg className="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.226a.91.91 0 00-.807.981 12.001 12.001 0 0021.136 0 .91.91 0 00-.807-.981A11.959 11.959 0 0112 2.714z" />
                  </svg>
                </div>
            </div>
            <form onSubmit={handleUpdateProfile} className="w-full space-y-6">
              <div className="text-left bg-white dark:bg-ios-grey-dark rounded-ios-xl shadow-sm border border-black/5 overflow-hidden">
                <p className="px-10 pt-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Clearance Registry</p>
                <div className="px-10 py-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Director Name</label>
                  <input className="bg-transparent text-right outline-none text-ios-blue font-bold text-sm" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                </div>
                <div className="px-10 py-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Sector</label>
                  <input className="bg-transparent text-right outline-none text-ios-blue font-bold text-sm" value={editForm.department} onChange={e => setEditForm({...editForm, department: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-ios-orange text-white rounded-ios font-black uppercase tracking-[0.3em] text-[10px] shadow-sm active:scale-95 transition-all">Synchronize Authority</button>
            </form>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-ios-grey dark:bg-black transition-colors overflow-hidden text-left">
      <aside className="w-72 bg-white dark:bg-ios-grey-dark border-r border-black/5 hidden lg:flex flex-col p-10 shrink-0">
        <div className="flex items-center gap-5 mb-16">
          <div className="w-12 h-12 bg-ios-orange rounded-2xl flex items-center justify-center text-white shadow-sm font-bold">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.226a.91.91 0 00-.807.981 12.001 12.001 0 0021.136 0 .91.91 0 00-.807-.981A11.959 11.959 0 0112 2.714z" />
            </svg>
          </div>
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-black tracking-tighter leading-tight">Admin</h1>
            <p className="text-[9px] font-black text-ios-orange uppercase tracking-[0.2em]">Authority Control</p>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`w-full flex items-center gap-5 p-4 px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === tab.id ? 'bg-ios-orange text-white shadow-lg shadow-ios-orange/20' : 'text-gray-400 hover:bg-ios-grey dark:hover:bg-white/5'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-10 border-t border-black/5">
          <button onClick={onLogout} className="w-full py-4 bg-ios-red/5 text-ios-red rounded-2xl font-black uppercase text-[9px] tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Terminals
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 lg:p-14 pb-32">
        <header className="lg:hidden flex justify-between items-center mb-10 pt-4">
          <div className="flex flex-col items-start"><h1 className="text-3xl font-black tracking-tighter">Matrix</h1><p className="text-[9px] font-black text-ios-orange uppercase tracking-[0.3em]">Authority Link</p></div>
          <button onClick={onLogout} className="w-12 h-12 rounded-full bg-white dark:bg-ios-grey-dark shadow-sm flex items-center justify-center text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </header>
        <div className="max-w-6xl mx-auto">{renderTab()}</div>
      </main>
      <nav className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 glass bg-white/90 dark:bg-black/90 border border-black/10 dark:border-white/10 shadow-2xl rounded-[2.5rem] px-10 py-5 flex items-center justify-center gap-12 z-50">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`transition-all ${activeTab === item.id ? 'text-ios-orange scale-125' : 'text-gray-300'}`}>
            {item.icon}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminDashboard;
