import React, { useState } from 'react';
import { Search, ShieldCheck, HeartHandshake, Globe2, Sparkles, PhoneCall } from 'lucide-react';
import { Gender } from '../types/index.ts';

interface HeroProps {
  onSearch: (filters: { gender?: Gender | 'All'; caste?: string; location?: string }) => void;
  onOpenRegister: () => void;
  onOpenContact: () => void;
  whatsappNumber: string;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onOpenRegister,
  onOpenContact,
  whatsappNumber,
}) => {
  const [selectedGender, setSelectedGender] = useState<Gender | 'All'>('Bride');
  const [selectedCaste, setSelectedCaste] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      gender: selectedGender,
      caste: selectedCaste === 'All' ? undefined : selectedCaste,
      location: selectedLocation === 'All' ? undefined : selectedLocation,
    });
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-neutral-950">
      {/* Background Image with Dark Vignette & Gold Scrim */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/src/assets/images/hero_matrimonial_bureau_1793423562185.jpg"
          alt="Rajpoot Marriage Bureau Chakwal"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/70 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 flex-1 flex flex-col justify-center items-center text-center">
        {/* Subtle royal crest label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/40 text-amber-300 text-xs tracking-widest uppercase mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Official Matrimonial Bureau · Chakwal, Pakistan</span>
        </div>

        {/* Urdu Calligraphic Title */}
        <h1 className="font-urdu text-4xl sm:text-5xl md:text-6xl font-bold text-amber-300 mb-2 leading-relaxed tracking-normal">
          راجپوت میرج بیورو
        </h1>

        {/* English Brand Title */}
        <h2 className="font-serif-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-100 tracking-wider mb-3">
          RAJPOOT MARRIAGE BUREAU
        </h2>

        {/* Tagline */}
        <div className="text-amber-400 font-medium tracking-[0.25em] text-xs sm:text-sm uppercase mb-6">
          TRUST &nbsp;|&nbsp; RESPECT &nbsp;|&nbsp; SUCCESS
        </div>

        {/* Urdu & English Descriptions */}
        <p className="font-urdu text-base sm:text-lg text-amber-200/90 max-w-3xl mb-3">
          ہمارے پاس پاکستان اور بیرونِ ممالک کے ہر مسلک، ہر ذات، ہر قوم کے معیاری اور باوقار رشتے موجود ہیں۔
        </p>

        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Connecting noble families with dignity and sharia principles. Serving Chakwal, Rawalpindi, Islamabad, and overseas Pakistani diaspora worldwide.
        </p>

        {/* Quick Search Interactive Box */}
        <div className="w-full max-w-4xl bg-neutral-900/90 border border-amber-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-amber-950/50 backdrop-blur-md mb-8">
          <div className="text-xs uppercase tracking-wider text-amber-400/90 font-semibold mb-4 text-left flex items-center justify-between">
            <span>Quick Match Finder (فوری رشتہ تلاش کریں)</span>
            <span className="text-neutral-400 font-normal">100% Confidential & Verified</span>
          </div>

          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Gender Select */}
            <div className="text-left">
              <label className="block text-xs text-neutral-400 mb-1.5 font-medium">
                Looking For (تلاش برائے)
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value as Gender | 'All')}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
              >
                <option value="Bride">Bride (دلہن کا رشتہ)</option>
                <option value="Groom">Groom (دولہا کا رشتہ)</option>
                <option value="All">All Profiles (تمام رشتے)</option>
              </select>
            </div>

            {/* Caste Select */}
            <div className="text-left">
              <label className="block text-xs text-neutral-400 mb-1.5 font-medium">
                Caste / Clan (برادری / ذات)
              </label>
              <select
                value={selectedCaste}
                onChange={(e) => setSelectedCaste(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
              >
                <option value="All">All Castes (ہر ذات / برادری)</option>
                <option value="Rajpoot">Rajpoot (Janjua / Minhas / Bhatti)</option>
                <option value="Chaudhry">Chaudhry / Jatt</option>
                <option value="Syed">Syed / Sadat</option>
                <option value="Awan">Malik / Awan</option>
                <option value="Sheikh">Sheikh / Qureshi</option>
                <option value="Other">Other Castes</option>
              </select>
            </div>

            {/* Location Select */}
            <div className="text-left">
              <label className="block text-xs text-neutral-400 mb-1.5 font-medium">
                Location (مقام)
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
              >
                <option value="All">Anywhere (پاکستان و بیرونِ ملک)</option>
                <option value="Chakwal">Chakwal & Potohar</option>
                <option value="Islamabad">Islamabad / Rawalpindi</option>
                <option value="Punjab">Lahore & Punjab</option>
                <option value="Overseas">Overseas (UK / USA / UAE / Canada)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-[42px] bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-semibold rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Proposals</span>
              </button>
            </div>
          </form>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenRegister}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-sm transition-all shadow-lg shadow-amber-950/50 cursor-pointer"
          >
            Submit Your Biodata (رجسٹریشن کروائیں)
          </button>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              'Assalam o Alaikum, I would like to schedule an in-person meeting or consultation at Rajpoot Marriage Bureau Chakwal.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl border border-amber-500/60 hover:bg-amber-500/10 text-amber-300 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Chat With Director on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Proof / Trust Strip */}
      <div className="relative z-10 border-t border-amber-900/30 bg-neutral-950/80 backdrop-blur-md py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-amber-400 mb-1" />
            <div className="text-xl font-bold font-serif-title text-neutral-100 tabular-nums">100% Verified</div>
            <div className="text-xs text-neutral-400">Authentic Family Records</div>
          </div>
          <div className="flex flex-col items-center">
            <HeartHandshake className="w-6 h-6 text-amber-400 mb-1" />
            <div className="text-xl font-bold font-serif-title text-neutral-100 tabular-nums">5,000+</div>
            <div className="text-xs text-neutral-400">Successful Nikkah Matches</div>
          </div>
          <div className="flex flex-col items-center">
            <Globe2 className="w-6 h-6 text-amber-400 mb-1" />
            <div className="text-xl font-bold font-serif-title text-neutral-100 tabular-nums">18+ Countries</div>
            <div className="text-xs text-neutral-400">Overseas Pakistani Network</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold font-serif-title text-amber-400 tabular-nums">Main Bazar</div>
            <div className="text-xs text-neutral-300 font-semibold">Chakwal City Office</div>
            <div className="text-[11px] text-neutral-400">Pehlwan Rewri, Chakwal</div>
          </div>
        </div>
      </div>
    </div>
  );
};
