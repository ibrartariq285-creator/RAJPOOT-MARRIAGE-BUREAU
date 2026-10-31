import React from 'react';
import { BureauSettings } from '../types/index.ts';
import { Shield } from 'lucide-react';

interface FooterProps {
  settings: BureauSettings;
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenAdmin,
  onNavigate,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t-2 border-amber-500/40 text-neutral-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Urdu Calligraphy Brand */}
        <div className="font-urdu text-amber-300 text-3xl font-bold">
          {settings.nameUrdu} - چکوال
        </div>

        <h3 className="font-serif-title text-xl font-bold text-neutral-100 tracking-wider">
          {settings.nameEnglish}
        </h3>

        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
          {settings.addressEnglish} · Contact: {settings.phone}
        </p>

        {/* Quick Footer Nav */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300">
          <button onClick={() => onNavigate('hero')} className="hover:text-amber-300 cursor-pointer">
            Home
          </button>
          <button onClick={() => onNavigate('proposals')} className="hover:text-amber-300 cursor-pointer">
            Proposals Directory
          </button>
          <button onClick={() => onNavigate('packages')} className="hover:text-amber-300 cursor-pointer">
            Packages & Fees
          </button>
          <button onClick={() => onNavigate('about')} className="hover:text-amber-300 cursor-pointer">
            About Bureau
          </button>
          <button onClick={() => onNavigate('contact')} className="hover:text-amber-300 cursor-pointer">
            Chakwal Office
          </button>
          <button
            onClick={onOpenAdmin}
            className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-medium"
          >
            <Shield className="w-3.5 h-3.5" />
            Admin Portal
          </button>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {settings.socialLinks.facebook && (
            <a
              href={settings.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black text-xs font-semibold transition-all"
            >
              Facebook
            </a>
          )}
          {settings.socialLinks.instagram && (
            <a
              href={settings.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black text-xs font-semibold transition-all"
            >
              Instagram
            </a>
          )}
          {settings.socialLinks.youtube && (
            <a
              href={settings.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black text-xs font-semibold transition-all"
            >
              YouTube
            </a>
          )}
          {settings.socialLinks.tiktok && (
            <a
              href={settings.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black text-xs font-semibold transition-all"
            >
              TikTok
            </a>
          )}
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-white text-xs font-semibold transition-all"
          >
            WhatsApp
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-neutral-600 pt-4 border-t border-neutral-900 w-full">
          &copy; {currentYear} {settings.nameEnglish}. All rights reserved. Registered Matrimonial Services Chakwal.
        </div>
      </div>
    </footer>
  );
};
