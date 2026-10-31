import React from 'react';
import {
  X,
  Printer,
  MessageCircle,
  ShieldCheck,
  MapPin,
  Briefcase,
  GraduationCap,
  Home,
  Users,
  FileCheck,
  Download,
  Share2,
} from 'lucide-react';
import { MatrimonialProfile } from '../types/index.ts';

interface ProfileModalProps {
  profile: MatrimonialProfile | null;
  onClose: () => void;
  whatsappNumber: string;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  onClose,
  whatsappNumber,
}) => {
  if (!profile) return null;

  const isBride = profile.gender === 'Bride';

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const summary = `${profile.gender} Profile (${profile.id}): ${profile.fullName}, ${profile.age} yrs, ${profile.caste}, ${profile.education}, ${profile.occupation}, ${profile.city}. Inquire at Rajpoot Marriage Bureau Chakwal.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      alert('Matrimonial profile summary copied to clipboard!');
    }
  };

  const whatsappInquiryUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Assalam o Alaikum, I would like to inquire about Proposal ID: ${profile.id} (${profile.fullName}, ${profile.gender}, ${profile.age} yrs, ${profile.caste}, ${profile.education}, ${profile.city}). Please share family contact or arrange a confidential meeting at your Chakwal office.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-6 text-neutral-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="no-print p-4 sm:p-6 bg-neutral-950 border-b border-amber-900/40 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-md text-xs font-bold tracking-wide uppercase ${
                isBride
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                  : 'bg-blue-950/80 text-blue-300 border border-blue-500/30'
              }`}
            >
              {profile.gender} Proposal
            </span>
            <span className="font-mono text-amber-400 font-bold text-sm sm:text-base">
              ID: {profile.id}
            </span>
            {profile.isVerified && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Family
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-neutral-300 hover:text-amber-300 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="Copy / Share Details"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-neutral-300 hover:text-amber-300 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="Print Matrimonial Biodata"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable & Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8">
          {/* Header Banner for Matrimonial Document */}
          <div className="text-center pb-6 border-b border-amber-900/30">
            <div className="font-urdu text-amber-400 text-xl font-bold mb-1">
              بسم الله الرحمن الرحيم · راجپوت میرج بیورو چکوال
            </div>
            <div className="font-serif-title text-xl sm:text-2xl font-bold text-white tracking-wide">
              CONFIDENTIAL MATRIMONIAL BIODATA
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Rajpoot Marriage Bureau · Main Bazar, Chakwal · Contact: {whatsappNumber}
            </div>
          </div>

          {/* Profile Overview Banner (Two Column) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Candidate Photo / Seal */}
            <div className="relative rounded-xl overflow-hidden border border-amber-500/30 aspect-square max-w-[280px] mx-auto md:mx-0 w-full bg-neutral-950">
              <img
                src={profile.photoUrl || '/src/assets/images/hero_matrimonial_bureau_1793423562185.jpg'}
                alt={profile.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-neutral-950/80 backdrop-blur-sm py-1.5 px-3 rounded-md text-center text-xs text-amber-300 border border-amber-500/20">
                {profile.caste} {profile.subCaste ? `· ${profile.subCaste}` : ''}
              </div>
            </div>

            {/* Candidate Primary Details */}
            <div className="md:col-span-2 space-y-3">
              <div>
                <h2 className="text-2xl font-serif-title font-bold text-amber-300">
                  {profile.fullName}
                </h2>
                <div className="text-sm text-neutral-300 flex flex-wrap items-center gap-2 mt-1">
                  <span>{profile.age} Years Old</span>
                  <span>·</span>
                  <span>Height: {profile.height}</span>
                  <span>·</span>
                  <span className="text-amber-400 font-medium">{profile.maritalStatus}</span>
                  <span>·</span>
                  <span>{profile.religionSect}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs sm:text-sm">
                <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-xs">Education</span>
                  <div className="font-medium text-neutral-100 flex items-center gap-1.5 mt-0.5">
                    <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{profile.education}</span>
                  </div>
                </div>

                <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-xs">Occupation & Income</span>
                  <div className="font-medium text-neutral-100 flex items-center gap-1.5 mt-0.5">
                    <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{profile.occupation}</span>
                  </div>
                  {profile.monthlyIncome && (
                    <span className="text-xs text-amber-300 block mt-0.5">{profile.monthlyIncome}</span>
                  )}
                </div>

                <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-xs">Current City & Country</span>
                  <div className="font-medium text-neutral-100 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      {profile.city}, {profile.country}
                    </span>
                  </div>
                  {profile.isOverseas && (
                    <span className="text-[11px] text-emerald-400 block mt-0.5">Overseas Resident / Expat</span>
                  )}
                </div>

                <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                  <span className="text-neutral-400 block text-xs">Residence & Property</span>
                  <div className="font-medium text-neutral-100 flex items-center gap-1.5 mt-0.5">
                    <Home className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{profile.residenceType || 'Own family home'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Family Background Section */}
          <div className="bg-neutral-950/80 rounded-xl p-5 border border-amber-900/30 space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Users className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif-title text-base sm:text-lg font-bold text-amber-200">
                Family Background (خاندانی کوائف)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-neutral-400 text-xs block">Father's Occupation:</span>
                <span className="font-medium text-neutral-100">
                  {profile.familyDetails.fatherOccupation || 'Respectable family'}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 text-xs block">Mother's Occupation:</span>
                <span className="font-medium text-neutral-100">
                  {profile.familyDetails.motherOccupation || 'Homemaker'}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 text-xs block">Brothers:</span>
                <span className="font-medium text-neutral-100">
                  {profile.familyDetails.brothersCount} {profile.familyDetails.brothersDetail ? `(${profile.familyDetails.brothersDetail})` : ''}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 text-xs block">Sisters:</span>
                <span className="font-medium text-neutral-100">
                  {profile.familyDetails.sistersCount} {profile.familyDetails.sistersDetail ? `(${profile.familyDetails.sistersDetail})` : ''}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 text-xs block">Native Town / Ancestral City:</span>
                <span className="font-medium text-neutral-100">
                  {profile.familyDetails.nativeTown || 'District Chakwal'}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 text-xs block">Family Social Stature:</span>
                <span className="font-medium text-amber-300">
                  {profile.familyDetails.familyStatus || 'Noble & Respectable Family'}
                </span>
              </div>
            </div>
          </div>

          {/* Partner Expectations & Preferences */}
          <div className="bg-neutral-950/80 rounded-xl p-5 border border-amber-900/30 space-y-3">
            <h3 className="font-serif-title text-base sm:text-lg font-bold text-amber-200 border-b border-neutral-800 pb-2">
              Partner Preferences & Requirements (شریک حیات کے تقاضے)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-neutral-400 text-xs block">Age Bracket:</span>
                <span className="font-medium text-neutral-100 tabular-nums">
                  {profile.partnerPreferences.ageMin} to {profile.partnerPreferences.ageMax} Years
                </span>
              </div>
              <div>
                <span className="text-neutral-400 text-xs block">Preferred Castes / Lineage:</span>
                <span className="font-medium text-neutral-100">
                  {profile.partnerPreferences.preferredCastes || 'Any respectable family'}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 text-xs block">Education Required:</span>
                <span className="font-medium text-neutral-100">
                  {profile.partnerPreferences.educationRequired || 'Educated / Graduate'}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 text-xs block">Preferred Cities / Countries:</span>
                <span className="font-medium text-neutral-100">
                  {profile.partnerPreferences.preferredLocations || 'Flexible'}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-neutral-400 text-xs block">Special Expectations / Values:</span>
                <p className="font-medium text-neutral-200 mt-1">
                  {profile.partnerPreferences.otherRequirements || 'Practicing values, mutual respect and understanding.'}
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Documents & PDF Attachments */}
          {profile.documents && profile.documents.length > 0 && (
            <div className="bg-neutral-950/80 rounded-xl p-5 border border-amber-900/30 space-y-3">
              <h3 className="font-serif-title text-base font-bold text-amber-200 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span>Verified Matrimonial Documents & Attachments ({profile.documents.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs"
                  >
                    <div className="truncate pr-2">
                      <span className="font-medium text-neutral-200 block truncate">{doc.name}</span>
                      <span className="text-neutral-400 text-[11px] uppercase">
                        {doc.type} · {doc.size}
                      </span>
                    </div>
                    {doc.dataUrl && doc.dataUrl !== '#' ? (
                      <a
                        href={doc.dataUrl}
                        download={doc.name}
                        className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </a>
                    ) : (
                      <span className="text-neutral-500 text-[11px]">In Office Archive</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confidential Notice */}
          <div className="text-xs text-neutral-400 bg-neutral-950/40 p-4 rounded-xl border border-neutral-800 text-center">
            <p>
              This biodata is provided exclusively through Rajpoot Marriage Bureau Chakwal. Direct family contact details are shared only after mutual verification, consent of both families, and bureau protocol registration.
            </p>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="no-print p-4 sm:p-5 bg-neutral-950 border-t border-amber-900/40 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
          <div className="text-xs text-neutral-400">
            <span>Bureau Office: Main Bazar, Chakwal</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg border border-neutral-700 hover:border-amber-400 text-neutral-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print Biodata</span>
            </button>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire for Family on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
