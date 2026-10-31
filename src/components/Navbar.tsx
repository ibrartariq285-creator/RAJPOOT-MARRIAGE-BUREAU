import React, { useState } from 'react';
import { Phone, MessageCircle, Shield, Menu, X, UserCheck } from 'lucide-react';
import { BureauSettings } from '../types/index.ts';

interface NavbarProps {
  settings: BureauSettings;
  isAdmin: boolean;
  onOpenAdmin: () => void;
  onOpenRegister: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  isAdmin,
  onOpenAdmin,
  onOpenRegister,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'proposals', label: 'Proposals (رشتے)' },
    { id: 'packages', label: 'Packages & Fees' },
    { id: 'about', label: 'About Bureau' },
    { id: 'contact', label: 'Chakwal Office' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-amber-900/30">
      {/* Top micro banner with Chakwal location & phone */}
      <div className="bg-gradient-to-r from-neutral-950 via-amber-950/40 to-neutral-950 border-b border-amber-500/10 py-1.5 px-4 text-xs text-neutral-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Phone className="w-3 h-3 text-amber-400" />
              {settings.phone}
            </span>
            <span className="hidden sm:inline text-neutral-500">|</span>
            <span className="hidden sm:inline text-neutral-400">
              📍 {settings.addressEnglish}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-urdu text-amber-300 text-xs hidden md:inline">
              اعتماد · عزت · کامیابی
            </span>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Assalam o Alaikum, I am contacting Rajpoot Marriage Bureau Chakwal for rishta consultation.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Complies with Top Bar Contract: Brand - 4 Nav Links - Primary Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Zone: 1 single text element wordmark */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="text-left flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-11 h-11 rounded-lg border border-amber-500/50 bg-gradient-to-b from-amber-500/20 to-neutral-900 flex items-center justify-center text-amber-300 font-serif-title font-bold text-xl shadow-inner group-hover:border-amber-400 transition-colors">
            RMB
          </div>
          <div className="leading-tight">
            <div className="font-serif-title font-bold text-lg md:text-xl text-amber-300 tracking-wider">
              {settings.nameEnglish}
            </div>
            <div className="font-urdu text-amber-400/80 text-xs -mt-1 hidden sm:block">
              {settings.nameUrdu} - چکوال
            </div>
          </div>
        </button>

        {/* Navigation Links Zone */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className="hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer py-1"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Primary Actions Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenRegister}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-md shadow-amber-950/40 hover:shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <UserCheck className="w-4 h-4" />
            Register Biodata
          </button>

          <button
            onClick={onOpenAdmin}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
              isAdmin
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-sm'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-amber-500/50 hover:text-amber-200'
            }`}
            title="Admin Portal"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>{isAdmin ? 'Admin Panel' : 'Admin Login'}</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-amber-300 hover:text-amber-200 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-amber-900/40 px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="text-left px-3 py-2 text-sm text-neutral-200 hover:text-amber-300 hover:bg-neutral-900 rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenRegister();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold rounded-lg bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors"
            >
              Submit Biodata / Profile
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-4 text-center text-xs font-medium rounded-lg border border-neutral-800 text-neutral-300 hover:text-amber-300 hover:border-amber-500/40"
            >
              {isAdmin ? 'Open Admin Dashboard' : 'Owner / Admin Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
