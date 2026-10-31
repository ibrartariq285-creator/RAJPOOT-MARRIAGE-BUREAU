import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Users, RefreshCw } from 'lucide-react';
import { MatrimonialProfile, Gender } from '../types/index.ts';
import { ProfileCard } from './ProfileCard.tsx';

interface ProfilesDirectoryProps {
  profiles: MatrimonialProfile[];
  whatsappNumber: string;
  onViewDetails: (profile: MatrimonialProfile) => void;
  onOpenRegister: () => void;
  initialFilters?: { gender?: Gender | 'All'; caste?: string; location?: string };
}

export const ProfilesDirectory: React.FC<ProfilesDirectoryProps> = ({
  profiles,
  whatsappNumber,
  onViewDetails,
  onOpenRegister,
  initialFilters,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<Gender | 'All'>(
    initialFilters?.gender || 'All'
  );
  const [casteFilter, setCasteFilter] = useState<string>(
    initialFilters?.caste || 'All'
  );
  const [locationFilter, setLocationFilter] = useState<string>(
    initialFilters?.location || 'All'
  );
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'age-asc' | 'age-desc'>('newest');

  // React to initial filters when updated from hero
  React.useEffect(() => {
    if (initialFilters?.gender) setGenderFilter(initialFilters.gender);
    if (initialFilters?.caste) setCasteFilter(initialFilters.caste);
    if (initialFilters?.location) setLocationFilter(initialFilters.location);
  }, [initialFilters]);

  const uniqueCastes = useMemo(() => {
    const set = new Set<string>();
    profiles.forEach((p) => {
      if (p.caste) {
        // extract first word or clean label
        set.add(p.caste);
      }
    });
    return Array.from(set);
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    return profiles
      .filter((p) => {
        // Only active or verified profiles shown publicly
        if (p.status !== 'Active') return false;

        // Gender filter
        if (genderFilter !== 'All' && p.gender !== genderFilter) return false;

        // Caste filter
        if (casteFilter !== 'All' && !p.caste.toLowerCase().includes(casteFilter.toLowerCase())) {
          return false;
        }

        // Location filter
        if (locationFilter !== 'All') {
          if (locationFilter === 'Overseas') {
            if (!p.isOverseas) return false;
          } else {
            const locText = `${p.city} ${p.country}`.toLowerCase();
            if (!locText.includes(locationFilter.toLowerCase())) return false;
          }
        }

        // Marital status filter
        if (statusFilter !== 'All' && p.maritalStatus !== statusFilter) {
          return false;
        }

        // Search term (name, code, education, occupation, city, notes)
        if (searchTerm.trim() !== '') {
          const q = searchTerm.toLowerCase();
          const matchString = `${p.id} ${p.fullName} ${p.caste} ${p.education} ${p.occupation} ${p.city} ${p.country} ${p.partnerPreferences.educationRequired}`.toLowerCase();
          if (!matchString.includes(q)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'age-asc') return a.age - b.age;
        if (sortBy === 'age-desc') return b.age - a.age;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [profiles, genderFilter, casteFilter, locationFilter, statusFilter, searchTerm, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setGenderFilter('All');
    setCasteFilter('All');
    setLocationFilter('All');
    setStatusFilter('All');
    setSortBy('newest');
  };

  const isFiltering =
    searchTerm !== '' ||
    genderFilter !== 'All' ||
    casteFilter !== 'All' ||
    locationFilter !== 'All' ||
    statusFilter !== 'All';

  return (
    <section id="proposals" className="py-20 bg-neutral-950 px-4 sm:px-6 lg:px-8 border-t border-amber-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="font-urdu text-amber-400 text-2xl mb-1">
            منتخب اور تصدیق شدہ رشتے
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100">
            Verified Marriage Proposals
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto my-3 rounded-full" />
          <p className="text-neutral-400 text-sm">
            Browse verified bride and groom profiles registered with Rajpoot Marriage Bureau Chakwal. Contact us directly on WhatsApp to exchange family biodatas.
          </p>
        </div>

        {/* Filter Controls Bar (Interactive Buttons & Dropdowns) */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-6 mb-8 space-y-4">
          {/* Top Row: Search & Gender Tabs */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Gender Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800 self-start">
              <button
                onClick={() => setGenderFilter('All')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  genderFilter === 'All'
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All ({profiles.filter((p) => p.status === 'Active').length})
              </button>
              <button
                onClick={() => setGenderFilter('Bride')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  genderFilter === 'Bride'
                    ? 'bg-rose-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Brides (دلہن) ({profiles.filter((p) => p.gender === 'Bride' && p.status === 'Active').length})
              </button>
              <button
                onClick={() => setGenderFilter('Groom')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  genderFilter === 'Groom'
                    ? 'bg-blue-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Grooms (دولہا) ({profiles.filter((p) => p.gender === 'Groom' && p.status === 'Active').length})
              </button>
            </div>

            {/* Keyword Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search by caste, profession, education, city, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Caste, Location, Status, Sort dropdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-neutral-800 text-xs">
            {/* Caste Filter */}
            <div>
              <label className="block text-neutral-400 text-[11px] mb-1">Caste / Lineage</label>
              <select
                value={casteFilter}
                onChange={(e) => setCasteFilter(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-neutral-200 focus:outline-none focus:border-amber-400"
              >
                <option value="All">All Castes</option>
                <option value="Rajpoot">Rajpoot (Janjua / Minhas / Bhatti)</option>
                <option value="Chaudhry">Chaudhry / Jatt</option>
                <option value="Syed">Syed / Sadat</option>
                <option value="Awan">Malik / Awan</option>
                <option value="Sheikh">Sheikh / Qureshi</option>
                {uniqueCastes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-neutral-400 text-[11px] mb-1">Region / Country</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-neutral-200 focus:outline-none focus:border-amber-400"
              >
                <option value="All">All Locations</option>
                <option value="Chakwal">Chakwal District</option>
                <option value="Islamabad">Islamabad / Rawalpindi</option>
                <option value="Lahore">Lahore & Punjab</option>
                <option value="Overseas">Overseas (UK, USA, UAE)</option>
              </select>
            </div>

            {/* Marital Status Filter */}
            <div>
              <label className="block text-neutral-400 text-[11px] mb-1">Marital Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-neutral-200 focus:outline-none focus:border-amber-400"
              >
                <option value="All">Any Status</option>
                <option value="Never Married">Never Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Khula">Khula</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-neutral-400 text-[11px] mb-1">Sort Proposals</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-neutral-200 focus:outline-none focus:border-amber-400"
              >
                <option value="newest">Newest Listed</option>
                <option value="age-asc">Age: Younger First</option>
                <option value="age-desc">Age: Older First</option>
              </select>
            </div>
          </div>

          {/* Active Filter Bar & Count */}
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-400 tabular-nums">
                {filteredProfiles.length}
              </span>
              <span>proposals matching criteria</span>
            </div>

            {isFiltering && (
              <button
                onClick={resetFilters}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                whatsappNumber={whatsappNumber}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-neutral-900/50 rounded-2xl border border-neutral-800">
            <Users className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-neutral-200 mb-1">No matching proposals found</h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
              We frequently update our private bureau files. Contact our Chakwal office directly or register your candidate biodata.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Clear Filters
              </button>
              <button
                onClick={onOpenRegister}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Register Your Biodata
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
