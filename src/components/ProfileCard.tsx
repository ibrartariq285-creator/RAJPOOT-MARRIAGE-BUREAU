import React, { useState } from 'react';
import {
  MapPin,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Eye,
  EyeOff,
  MessageCircle,
  FileText,
  Star,
  Globe,
} from 'lucide-react';
import { MatrimonialProfile } from '../types/index.ts';

interface ProfileCardProps {
  profile: MatrimonialProfile;
  whatsappNumber: string;
  onViewDetails: (profile: MatrimonialProfile) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  whatsappNumber,
  onViewDetails,
}) => {
  const [showPhoto, setShowPhoto] = useState(!profile.photoBlurred);

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Assalam o Alaikum, I am inquiring about Proposal ${profile.id}: ${profile.fullName} (${profile.gender}, ${profile.age} yrs, ${profile.caste}, ${profile.occupation}, ${profile.city}). Please share verified details.`
    );
  };

  const isBride = profile.gender === 'Bride';

  return (
    <div className="group relative bg-neutral-900/90 rounded-2xl border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-amber-950/20">
      {/* Top Banner & Badges */}
      <div className="relative h-64 w-full bg-neutral-950 overflow-hidden">
        {/* Profile Image with Privacy Scrim */}
        <img
          src={profile.photoUrl || '/src/assets/images/hero_matrimonial_bureau_1793423562185.jpg'}
          alt={`${profile.gender} Profile ${profile.id}`}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${
            !showPhoto ? 'blur-md scale-110 filter' : ''
          }`}
        />

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/60 pointer-events-none" />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide shadow-md ${
                isBride
                  ? 'bg-rose-950/80 text-rose-200 border border-rose-500/30'
                  : 'bg-blue-950/80 text-blue-200 border border-blue-500/30'
              }`}
            >
              {profile.gender} · {profile.id}
            </span>

            {profile.isVerified && (
              <span className="bg-amber-500/90 text-neutral-950 px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {profile.isOverseas && (
              <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-md text-[11px] font-medium flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Overseas
              </span>
            )}

            {profile.isFeatured && (
              <span className="bg-amber-950/90 text-amber-300 border border-amber-500/40 p-1 rounded-md" title="Featured Profile">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </span>
            )}
          </div>
        </div>

        {/* Privacy Blur Toggle */}
        {profile.photoBlurred && (
          <button
            onClick={() => setShowPhoto(!showPhoto)}
            className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-md bg-neutral-950/80 hover:bg-neutral-900 text-xs text-amber-300 border border-amber-500/30 backdrop-blur-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            title={showPhoto ? 'Blur Photo' : 'Reveal Photo'}
          >
            {showPhoto ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPhoto ? 'Hide Photo' : 'View Photo'}</span>
          </button>
        )}

        {/* Name and Caste overlay */}
        <div className="absolute bottom-3 left-3 z-10 pr-20">
          <div className="font-serif-title text-base sm:text-lg font-bold text-white tracking-wide truncate drop-shadow-md">
            {profile.fullName}
          </div>
          <div className="text-xs text-amber-300 font-medium">
            {profile.caste} {profile.subCaste ? `(${profile.subCaste})` : ''}
          </div>
        </div>
      </div>

      {/* Profile Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        {/* Core Specs Grid */}
        <div className="space-y-2.5 text-xs text-neutral-300">
          {/* Age & Height & Marital Status */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <div>
              <span className="text-neutral-400">Age & Height:</span>{' '}
              <span className="text-neutral-100 font-semibold tabular-nums">
                {profile.age} yrs · {profile.height}
              </span>
            </div>
            <span className="text-amber-400/90 font-medium">{profile.maritalStatus}</span>
          </div>

          {/* Education */}
          <div className="flex items-start gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <div className="truncate">
              <span className="text-neutral-100 font-medium">{profile.education}</span>
            </div>
          </div>

          {/* Occupation */}
          <div className="flex items-start gap-2">
            <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <div className="truncate">
              <span className="text-neutral-100 font-medium">{profile.occupation}</span>
              {profile.monthlyIncome && (
                <span className="text-neutral-400 text-[11px] block">{profile.monthlyIncome}</span>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-neutral-200 truncate">
              {profile.city}, {profile.country}
            </span>
          </div>

          {/* Sect & Religion */}
          <div className="text-[11px] text-neutral-400 pt-1">
            <span>Sect:</span> <span className="text-neutral-200">{profile.religionSect}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-3 border-t border-neutral-800/80 flex items-center gap-2">
          <button
            onClick={() => onViewDetails(profile)}
            className="flex-1 py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Full Biodata</span>
          </button>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            title="Inquire on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Inquire</span>
          </a>
        </div>
      </div>
    </div>
  );
};
