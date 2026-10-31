import React, { useState } from 'react';
import { Lock, Shield, Eye, EyeOff, X, KeyRound } from 'lucide-react';
import { StorageService } from '../../services/storage.ts';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const settings = StorageService.getSettings();
    if (password === settings.adminPasswordHash || password === 'admin123') {
      StorageService.setAdminLoggedIn(true);
      setError('');
      onLoginSuccess();
    } else {
      setError('Incorrect password. Default demo password is "admin123".');
    }
  };

  const handleQuickDemoFill = () => {
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-neutral-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="font-serif-title text-xl font-bold text-white">
            Bureau Owner / Admin Portal
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Rajpoot Marriage Bureau Management Console
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-neutral-300 font-medium mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter admin password..."
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-neutral-100 pr-10 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Secure Admin Login</span>
          </button>

          {/* Quick Demo Assist */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-xs text-amber-400/90 hover:text-amber-300 inline-flex items-center gap-1 font-medium underline"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Fill Default Demo Password (admin123)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
