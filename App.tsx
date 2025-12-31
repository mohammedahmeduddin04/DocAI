
import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import { authService } from './services/authService';
import LoginPage from './components/LoginPage';
import PatientDashboard from './components/patient/PatientDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('docai_theme') === 'dark';
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('docai_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('docai_theme', 'light');
    }
  }, [darkMode]);

  // iOS Sound Synthesizers
  useEffect(() => {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    const playClickSound = () => {
      try {
        const context = new AudioCtx();
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(10, context.currentTime + 0.05);

        gain.gain.setValueAtTime(0.08, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.05);

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.start();
        oscillator.stop(context.currentTime + 0.05);
        setTimeout(() => context.close(), 100);
      } catch (e) {}
    };

    const playTypingSound = () => {
      try {
        const context = new AudioCtx();
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        // Higher pitch triangle wave for a sharp "tap"
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(800, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, context.currentTime + 0.015);

        gain.gain.setValueAtTime(0.05, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.015);

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.start();
        oscillator.stop(context.currentTime + 0.015);
        setTimeout(() => context.close(), 50);
      } catch (e) {}
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      
      if (isInput) {
        // Play sound for characters, space, backspace, and enter
        if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
          playTypingSound();
        }
      }
    };

    window.addEventListener('click', playClickSound);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('click', playClickSound);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const handleLogin = (role: UserRole, email?: string, password?: string) => {
    const loggedInUser = authService.login(role, email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      alert('Invalid credentials for this role.');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const handleUpdateUser = (data: Partial<User>) => {
    const updated = authService.updateUser(data);
    if (updated) {
      setUser(updated);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-full mb-4"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} toggleDarkMode={toggleDarkMode} isDark={darkMode} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {user.role === UserRole.PATIENT && (
        <PatientDashboard 
          user={user} 
          onLogout={handleLogout} 
          onUpdateUser={handleUpdateUser}
          toggleDarkMode={toggleDarkMode} 
          isDark={darkMode} 
        />
      )}
      {user.role === UserRole.DOCTOR && (
        <DoctorDashboard 
          user={user} 
          onLogout={handleLogout} 
          onUpdateUser={handleUpdateUser}
          toggleDarkMode={toggleDarkMode} 
          isDark={darkMode} 
        />
      )}
      {user.role === UserRole.ADMIN && (
        <AdminDashboard 
          user={user} 
          onLogout={handleLogout} 
          onUpdateUser={handleUpdateUser}
          toggleDarkMode={toggleDarkMode} 
          isDark={darkMode} 
        />
      )}
    </div>
  );
};

export default App;
