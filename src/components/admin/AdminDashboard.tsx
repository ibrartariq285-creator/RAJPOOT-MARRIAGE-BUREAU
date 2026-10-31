import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Package,
  Receipt,
  Mail,
  Settings,
  Database,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  Star,
  ExternalLink,
  LogOut,
  Download,
  Upload,
  MessageCircle,
  FileText,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  MatrimonialProfile,
  MembershipPackage,
  ServiceChargeItem,
  CustomerInquiry,
  BureauSettings,
} from '../../types/index.ts';
import { StorageService } from '../../services/storage.ts';
import { ProfileEditorModal } from './ProfileEditorModal.tsx';
import { PackageEditorModal } from './PackageEditorModal.tsx';
import { ChargeEditorModal } from './ChargeEditorModal.tsx';

interface AdminDashboardProps {
  onCloseAdmin: () => void;
  onLogout: () => void;
  profiles: MatrimonialProfile[];
  packages: MembershipPackage[];
  charges: ServiceChargeItem[];
  inquiries: CustomerInquiry[];
  settings: BureauSettings;
  onDataChanged: () => void;
  onViewProfileDetails: (profile: MatrimonialProfile) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onCloseAdmin,
  onLogout,
  profiles,
  packages,
  charges,
  inquiries,
  settings,
  onDataChanged,
  onViewProfileDetails,
}) => {
  const [activeTab, setActiveTab] = useState<
    'profiles' | 'inquiries' | 'packages' | 'charges' | 'settings' | 'backup'
  >('profiles');

  // Search & Filters inside Admin Profiles
  const [profileSearch, setProfileSearch] = useState('');
  const [profileGenderFilter, setProfileGenderFilter] = useState<'All' | 'Bride' | 'Groom'>('All');
  const [profileStatusFilter, setProfileStatusFilter] = useState<string>('All');

  // Modals state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<MatrimonialProfile | null>(null);

  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<MembershipPackage | null>(null);

  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [editingCharge, setEditingCharge] = useState<ServiceChargeItem | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<BureauSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [backupStatus, setBackupStatus] = useState<string | null>(null);

  // Filtered Profiles
  const filteredProfiles = profiles.filter((p) => {
    if (profileGenderFilter !== 'All' && p.gender !== profileGenderFilter) return false;
    if (profileStatusFilter !== 'All' && p.status !== profileStatusFilter) return false;
    if (profileSearch.trim() !== '') {
      const q = profileSearch.toLowerCase();
      const match = `${p.id} ${p.fullName} ${p.caste} ${p.city} ${p.education} ${p.occupation}`.toLowerCase();
      if (!match.includes(q)) return false;
    }
    return true;
  });

  // Profile Actions
  const handleSaveProfile = (saved: MatrimonialProfile) => {
    const exists = profiles.some((p) => p.id === saved.id);
    if (exists) {
      StorageService.updateProfile(saved);
    } else {
      StorageService.addProfile(saved);
    }
    setIsProfileModalOpen(false);
    setEditingProfile(null);
    onDataChanged();
  };

  const handleDeleteProfile = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete proposal "${name}" (${id})?`)) {
      StorageService.deleteProfile(id);
      onDataChanged();
    }
  };

  const handleToggleVerified = (profile: MatrimonialProfile) => {
    const updated = { ...profile, isVerified: !profile.isVerified };
    StorageService.updateProfile(updated);
    onDataChanged();
  };

  const handleToggleFeatured = (profile: MatrimonialProfile) => {
    const updated = { ...profile, isFeatured: !profile.isFeatured };
    StorageService.updateProfile(updated);
    onDataChanged();
  };

  const handleToggleBlur = (profile: MatrimonialProfile) => {
    const updated = { ...profile, photoBlurred: !profile.photoBlurred };
    StorageService.updateProfile(updated);
    onDataChanged();
  };

  // Inquiry Actions
  const handleInquiryStatusChange = (inquiry: CustomerInquiry, newStatus: any) => {
    const updated = { ...inquiry, status: newStatus };
    StorageService.updateInquiry(updated);
    onDataChanged();
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('Delete this inquiry?')) {
      StorageService.deleteInquiry(id);
      onDataChanged();
    }
  };

  const handleConvertInquiryToProfile = (inquiry: CustomerInquiry) => {
    const isBride = inquiry.seekingFor === 'Bride';
    const newId = isBride
      ? `RMB-B${Math.floor(100 + Math.random() * 900)}`
      : `RMB-G${Math.floor(100 + Math.random() * 900)}`;

    const candidateProfile: MatrimonialProfile = {
      id: newId,
      gender: isBride ? 'Bride' : 'Groom',
      fullName: inquiry.name,
      caste: inquiry.caste || 'Noble Family',
      age: inquiry.candidateAge || 26,
      height: "5' 6\"",
      maritalStatus: 'Never Married',
      religionSect: 'Islam - Sunni',
      education: 'Graduate / Professional',
      occupation: 'Professional',
      monthlyIncome: 'To be verified',
      city: inquiry.city || 'Chakwal',
      country: 'Pakistan',
      isOverseas: false,
      residenceType: 'Family Residence',
      familyDetails: {
        fatherOccupation: 'Family Reference',
        motherOccupation: 'Homemaker',
        brothersCount: 1,
        brothersDetail: '',
        sistersCount: 1,
        sistersDetail: '',
        nativeTown: inquiry.city || 'Chakwal',
        familyStatus: 'Respectable Family',
        phoneOrWhatsApp: inquiry.phone,
      },
      partnerPreferences: {
        ageMin: 22,
        ageMax: 32,
        preferredCastes: inquiry.caste || 'Any noble family',
        educationRequired: 'Educated',
        preferredLocations: inquiry.city || 'Chakwal / Islamabad',
        otherRequirements: inquiry.message,
      },
      photoUrl:
        inquiry.uploadedFiles && inquiry.uploadedFiles.length > 0 && inquiry.uploadedFiles[0].type === 'image'
          ? inquiry.uploadedFiles[0].dataUrl
          : isBride
          ? '/src/assets/images/profile_bride_sample_1793423563999.jpg'
          : '/src/assets/images/profile_groom_sample_1793423562962.jpg',
      photoBlurred: isBride,
      documents: inquiry.uploadedFiles
        ? inquiry.uploadedFiles.map((f, i) => ({
            id: `doc-inq-${i}`,
            name: f.name,
            type: f.type.includes('pdf') ? 'pdf' : 'image',
            dataUrl: f.dataUrl,
            uploadedAt: new Date().toISOString().split('T')[0],
            size: f.size || 'Attachment',
          }))
        : [],
      status: 'Active',
      isFeatured: false,
      isVerified: true,
      createdAt: new Date().toISOString().split('T')[0],
      notes: `Converted from customer registration ${inquiry.id}. Contact: ${inquiry.phone}`,
    };

    StorageService.addProfile(candidateProfile);
    StorageService.updateInquiry({ ...inquiry, status: 'Converted to Profile' });
    onDataChanged();
    setEditingProfile(candidateProfile);
    setIsProfileModalOpen(true);
  };

  // Package Actions
  const handleSavePackage = (saved: MembershipPackage) => {
    const exists = packages.some((p) => p.id === saved.id);
    if (exists) {
      StorageService.updatePackage(saved);
    } else {
      StorageService.addPackage(saved);
    }
    setIsPackageModalOpen(false);
    setEditingPackage(null);
    onDataChanged();
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('Delete this membership package?')) {
      StorageService.deletePackage(id);
      onDataChanged();
    }
  };

  // Charge Actions
  const handleSaveCharge = (saved: ServiceChargeItem) => {
    const exists = charges.some((c) => c.id === saved.id);
    if (exists) {
      StorageService.updateCharge(saved);
    } else {
      StorageService.addCharge(saved);
    }
    setIsChargeModalOpen(false);
    setEditingCharge(null);
    onDataChanged();
  };

  const handleDeleteCharge = (id: string) => {
    if (window.confirm('Delete this service charge entry?')) {
      StorageService.deleteCharge(id);
      onDataChanged();
    }
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...settingsForm };
    if (newPassword.trim().length >= 4) {
      updated.adminPasswordHash = newPassword.trim();
    }
    StorageService.saveSettings(updated);
    onDataChanged();
    setSettingsSaved(true);
    setNewPassword('');
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Backup Export
  const handleExportBackup = () => {
    const jsonStr = StorageService.exportAllDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Rajpoot_Marriage_Bureau_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setBackupStatus('Database backup file successfully downloaded!');
    setTimeout(() => setBackupStatus(null), 4000);
  };

  // Backup Import
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      const success = StorageService.importAllDataJSON(content);
      if (success) {
        onDataChanged();
        setBackupStatus('Database restored successfully from backup file!');
      } else {
        alert('Invalid JSON backup file format.');
      }
      setTimeout(() => setBackupStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  const handleResetToSample = () => {
    if (
      window.confirm(
        'Warning: This will reset all bureau profiles, packages, and settings to the default Chakwal sample database. Do you wish to continue?'
      )
    ) {
      StorageService.resetToDefaultData();
      onDataChanged();
      setBackupStatus('Database reset to default sample dataset.');
      setTimeout(() => setBackupStatus(null), 4000);
    }
  };

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* Admin Header */}
      <header className="sticky top-0 z-30 bg-neutral-900 border-b border-amber-900/40 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold font-serif-title flex items-center justify-center text-lg">
            RMB
          </div>
          <div>
            <div className="font-serif-title font-bold text-base sm:text-lg text-white leading-tight">
              Rajpoot Marriage Bureau — Admin Management Console
            </div>
            <div className="text-xs text-amber-400 font-urdu -mt-0.5">
              ڈائریکٹر مینجمنٹ پورٹل · چکوال
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCloseAdmin}
            className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="View Public Website"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-1.5 rounded-lg border border-neutral-700 hover:border-rose-500/50 hover:bg-rose-950/40 text-neutral-300 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Metric Cards KPI Strip */}
      <div className="bg-neutral-900/60 border-b border-neutral-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-neutral-400 block text-[11px]">Total Profiles</span>
            <div className="text-xl font-bold font-serif-title text-amber-300 tabular-nums">
              {profiles.length}
            </div>
            <span className="text-[10px] text-neutral-500">
              {profiles.filter((p) => p.status === 'Active').length} Active Listed
            </span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-neutral-400 block text-[11px]">Grooms (دولہا)</span>
            <div className="text-xl font-bold font-serif-title text-blue-400 tabular-nums">
              {profiles.filter((p) => p.gender === 'Groom').length}
            </div>
            <span className="text-[10px] text-neutral-500">Boys Proposals</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-neutral-400 block text-[11px]">Brides (دلہن)</span>
            <div className="text-xl font-bold font-serif-title text-rose-400 tabular-nums">
              {profiles.filter((p) => p.gender === 'Bride').length}
            </div>
            <span className="text-[10px] text-neutral-500">Girls Proposals</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-neutral-400 block text-[11px]">Overseas Diaspora</span>
            <div className="text-xl font-bold font-serif-title text-emerald-400 tabular-nums">
              {profiles.filter((p) => p.isOverseas).length}
            </div>
            <span className="text-[10px] text-neutral-500">UK, USA, UAE, Canada</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-neutral-400 block text-[11px]">Inquiries & Registrations</span>
            <div className="text-xl font-bold font-serif-title text-amber-400 tabular-nums flex items-center gap-1.5">
              <span>{inquiries.length}</span>
              {pendingInquiriesCount > 0 && (
                <span className="text-[10px] font-bold bg-amber-500 text-neutral-950 px-1.5 py-0.2 rounded-full">
                  {pendingInquiriesCount} New
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-500">Customer Inbox</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
            <span className="text-neutral-400 block text-[11px]">Active Packages</span>
            <div className="text-xl font-bold font-serif-title text-neutral-200 tabular-nums">
              {packages.length} Plans
            </div>
            <span className="text-[10px] text-neutral-500">{charges.length} Service Fees</span>
          </div>
        </div>
      </div>

      {/* Main Admin Tab Navigation */}
      <div className="bg-neutral-950 border-b border-neutral-800 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'profiles'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Manage Profiles ({profiles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'inquiries'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries & Registrations</span>
            {pendingInquiriesCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-amber-500 text-neutral-950 font-bold">
                {pendingInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'packages'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Pricing Packages ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('charges')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'charges'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Service Charges & Shukrana ({charges.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'settings'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Bureau Settings & Contacts</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'backup'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Data Backup & Restore</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {/* Status Toast Banner */}
        {backupStatus && (
          <div className="mb-6 p-3 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{backupStatus}</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: MANAGE PROFILES */}
        {/* ========================================================= */}
        {activeTab === 'profiles' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={profileSearch}
                    onChange={(e) => setProfileSearch(e.target.value)}
                    placeholder="Search candidate, caste, ID..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Gender filter */}
                <select
                  value={profileGenderFilter}
                  onChange={(e) => setProfileGenderFilter(e.target.value as any)}
                  className="bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="All">All Genders</option>
                  <option value="Bride">Brides Only</option>
                  <option value="Groom">Grooms Only</option>
                </select>

                {/* Status filter */}
                <select
                  value={profileStatusFilter}
                  onChange={(e) => setProfileStatusFilter(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Matched / Nikkah Done">Matched / Nikkah</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              {/* Add New Profile CTA */}
              <button
                onClick={() => {
                  setEditingProfile(null);
                  setIsProfileModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-amber-950/40 transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Bride / Groom Profile</span>
              </button>
            </div>

            {/* Profiles Table */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">ID & Photo</th>
                      <th className="py-3 px-4">Candidate & Caste</th>
                      <th className="py-3 px-4">Age / Height</th>
                      <th className="py-3 px-4">Education & Career</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Docs</th>
                      <th className="py-3 px-4">Status & Toggles</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {filteredProfiles.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-800/40 transition-colors">
                        {/* ID & Photo */}
                        <td className="py-3 px-4 whitespace-nowrap align-middle">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={p.photoUrl || '/src/assets/images/hero_matrimonial_bureau_1793423562185.jpg'}
                              alt={p.fullName}
                              className={`w-10 h-10 rounded-lg object-cover object-top border border-neutral-700 ${
                                p.photoBlurred ? 'blur-xs' : ''
                              }`}
                            />
                            <div>
                              <span className="font-mono font-bold text-amber-300 block">{p.id}</span>
                              <span
                                className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                                  p.gender === 'Bride'
                                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                    : 'bg-blue-950 text-blue-300 border border-blue-800'
                                }`}
                              >
                                {p.gender}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Candidate & Caste */}
                        <td className="py-3 px-4 align-middle">
                          <div className="font-semibold text-neutral-100">{p.fullName}</div>
                          <div className="text-amber-400/90 text-[11px]">
                            {p.caste} {p.subCaste ? `(${p.subCaste})` : ''}
                          </div>
                          <div className="text-neutral-500 text-[10px]">{p.maritalStatus}</div>
                        </td>

                        {/* Age & Height */}
                        <td className="py-3 px-4 whitespace-nowrap align-middle tabular-nums">
                          <div className="text-neutral-200">{p.age} Years</div>
                          <div className="text-neutral-500 text-[11px]">{p.height}</div>
                        </td>

                        {/* Education & Career */}
                        <td className="py-3 px-4 max-w-xs align-middle">
                          <div className="text-neutral-200 font-medium truncate">{p.education}</div>
                          <div className="text-neutral-400 text-[11px] truncate">{p.occupation}</div>
                          {p.monthlyIncome && (
                            <div className="text-amber-400 text-[10px]">{p.monthlyIncome}</div>
                          )}
                        </td>

                        {/* Location */}
                        <td className="py-3 px-4 whitespace-nowrap align-middle">
                          <div className="text-neutral-200">{p.city}</div>
                          <div className="text-neutral-500 text-[11px]">
                            {p.country} {p.isOverseas && <span className="text-emerald-400">· Overseas</span>}
                          </div>
                        </td>

                        {/* Documents count */}
                        <td className="py-3 px-4 whitespace-nowrap align-middle">
                          {p.documents && p.documents.length > 0 ? (
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-medium text-[11px]">
                              {p.documents.length} File{p.documents.length > 1 ? 's' : ''}
                            </span>
                          ) : (
                            <span className="text-neutral-600 text-[11px]">None</span>
                          )}
                        </td>

                        {/* Status & Quick Toggles */}
                        <td className="py-3 px-4 whitespace-nowrap align-middle">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                p.status === 'Active'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : p.status === 'Matched / Nikkah Done'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : 'bg-neutral-800 text-neutral-400'
                              }`}
                            >
                              {p.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-neutral-400">
                            <button
                              onClick={() => handleToggleVerified(p)}
                              title={p.isVerified ? 'Verified: Click to toggle' : 'Unverified: Click to verify'}
                              className={`p-1 rounded hover:bg-neutral-800 ${
                                p.isVerified ? 'text-emerald-400' : 'text-neutral-600'
                              }`}
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleToggleFeatured(p)}
                              title={p.isFeatured ? 'Featured: Click to unfeature' : 'Click to feature'}
                              className={`p-1 rounded hover:bg-neutral-800 ${
                                p.isFeatured ? 'text-amber-400' : 'text-neutral-600'
                              }`}
                            >
                              <Star className="w-3.5 h-3.5 fill-current" />
                            </button>
                            <button
                              onClick={() => handleToggleBlur(p)}
                              title={p.photoBlurred ? 'Photo Blurred: Click to unblur' : 'Photo Public: Click to blur'}
                              className={`p-1 rounded hover:bg-neutral-800 ${
                                p.photoBlurred ? 'text-amber-300' : 'text-neutral-500'
                              }`}
                            >
                              {p.photoBlurred ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 whitespace-nowrap text-right align-middle">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onViewProfileDetails(p)}
                              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
                              title="View Full Matrimonial Biodata"
                            >
                              <FileText className="w-3.5 h-3.5 text-amber-400" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingProfile(p);
                                setIsProfileModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
                              title="Edit Proposal Details"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteProfile(p.id, p.fullName)}
                              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-950/60 text-neutral-300 hover:text-rose-400"
                              title="Delete Proposal"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProfiles.length === 0 && (
                <div className="p-8 text-center text-neutral-500 text-xs">
                  No profiles match your search criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: INQUIRIES & REGISTRATIONS */}
        {/* ========================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-title text-lg font-bold text-white">
                  Customer Registrations & Inquiry Inbox
                </h3>
                <p className="text-xs text-neutral-400">
                  Proposals submitted online by families and visitors awaiting bureau action.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-amber-500/40 transition-colors space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-amber-400 font-bold text-xs bg-neutral-950 px-2.5 py-1 rounded border border-neutral-700">
                        {inq.id}
                      </span>
                      <span className="font-bold text-white text-sm">{inq.name}</span>
                      <span className="text-xs text-neutral-400">
                        Seeking: <strong className="text-amber-300">{inq.seekingFor}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-neutral-500 tabular-nums">Received: {inq.createdAt}</span>
                      <select
                        value={inq.status}
                        onChange={(e) => handleInquiryStatusChange(inq, e.target.value)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                          inq.status === 'New'
                            ? 'bg-amber-950 text-amber-300 border border-amber-600'
                            : inq.status === 'Converted to Profile'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                            : 'bg-neutral-950 text-neutral-300 border border-neutral-700'
                        }`}
                      >
                        <option value="New">Status: New</option>
                        <option value="Contacted">Status: Contacted</option>
                        <option value="Meeting Scheduled">Status: Meeting Scheduled</option>
                        <option value="Converted to Profile">Status: Converted</option>
                        <option value="Closed">Status: Closed</option>
                      </select>
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800/80">
                    {inq.message}
                  </div>

                  {/* Attached files if any */}
                  {inq.uploadedFiles && inq.uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-neutral-500 text-[11px]">Uploaded Files:</span>
                      {inq.uploadedFiles.map((f, i) => (
                        <div
                          key={i}
                          className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>{f.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inquiry Bottom Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="text-xs text-neutral-400">
                      <span>Phone: </span>
                      <strong className="text-neutral-200">{inq.phone}</strong>
                      {inq.email && <span className="ml-2 text-neutral-500">· {inq.email}</span>}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleConvertInquiryToProfile(inq)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Automatically create a verified Matrimonial Profile from this registration"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Convert to Matrimonial Profile</span>
                      </button>

                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Assalam o Alaikum ${inq.name}, Rajpoot Marriage Bureau Chakwal received your rishta inquiry (${inq.id}). We would be pleased to assist you.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply on WhatsApp</span>
                      </a>

                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {inquiries.length === 0 && (
                <div className="text-center py-12 text-neutral-500 text-xs bg-neutral-900 rounded-2xl border border-neutral-800">
                  No inquiries or registrations submitted yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PACKAGES & PRICING */}
        {/* ========================================================= */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-title text-lg font-bold text-white">
                  Manage Membership Packages & Pricing Plans
                </h3>
                <p className="text-xs text-neutral-400">
                  Create, edit, or remove tiered matchmaking packages displayed on your website.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingPackage(null);
                  setIsPackageModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-serif-title font-bold text-white text-base">
                        {pkg.title}
                      </h4>
                      {pkg.popular && (
                        <span className="text-[10px] font-bold uppercase bg-amber-500 text-neutral-950 px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 mb-3">{pkg.subtitle}</p>

                    <div className="py-2 border-y border-neutral-800 my-2">
                      <div className="text-xl font-bold font-serif-title text-amber-300">
                        {pkg.pricePKR}
                      </div>
                      {pkg.priceOverseas && (
                        <div className="text-xs text-emerald-400">{pkg.priceOverseas}</div>
                      )}
                      <div className="text-[11px] text-neutral-400 mt-1">Duration: {pkg.duration}</div>
                    </div>

                    <div className="space-y-1.5 my-3 text-xs text-neutral-300">
                      {pkg.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400">•</span>
                          <span className="text-[11px] leading-tight">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingPackage(pkg);
                        setIsPackageModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-950/60 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete Package"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SERVICE CHARGES */}
        {/* ========================================================= */}
        {activeTab === 'charges' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-title text-lg font-bold text-white">
                  Manage Service Charges & Shukrana Policies
                </h3>
                <p className="text-xs text-neutral-400">
                  Update your registration fees, success fee policies, and terms shown to prospective families.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCharge(null);
                  setIsChargeModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Service Charge</span>
              </button>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Title & Category</th>
                    <th className="py-3 px-4">Amount / Fee</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Applicable Terms</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80">
                  {charges.map((chg) => (
                    <tr key={chg.id} className="hover:bg-neutral-800/40">
                      <td className="py-3 px-4 align-top">
                        <div className="font-semibold text-white">{chg.title}</div>
                        <span className="text-amber-400 text-[11px]">{chg.category}</span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-amber-300 align-top whitespace-nowrap">
                        {chg.amount}
                      </td>
                      <td className="py-3 px-4 max-w-sm align-top text-neutral-300">
                        <div>{chg.description}</div>
                        {chg.urduNote && (
                          <div className="font-urdu text-amber-300 text-xs mt-1">
                            {chg.urduNote}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-neutral-400 text-[11px] align-top max-w-xs">
                        {chg.terms}
                      </td>
                      <td className="py-3 px-4 text-right align-top whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingCharge(chg);
                              setIsChargeModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteCharge(chg.id)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-950/60 text-neutral-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: BUREAU SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h3 className="font-serif-title text-lg font-bold text-white">
                Bureau Profile & Office Settings
              </h3>
              <p className="text-xs text-neutral-400">
                Update phone numbers, WhatsApp, Chakwal office address, and admin credentials.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Settings saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Bureau Name (English)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.nameEnglish}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, nameEnglish: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Bureau Name (Urdu)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.nameUrdu}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, nameUrdu: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 font-urdu text-right focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, phone: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    WhatsApp Number (Digits only, with country code 92...)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-300 font-medium mb-1">
                    Chakwal Office Address (English)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.addressEnglish}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, addressEnglish: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-300 font-medium mb-1">
                    Chakwal Office Address (Urdu)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.addressUrdu}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, addressUrdu: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 font-urdu text-right focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-300 font-medium mb-1">
                    Office Working Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.officeHours}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, officeHours: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-300 font-medium mb-1">
                    Announcement Banner (Urdu)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.announcementUrdu}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, announcementUrdu: e.target.value })
                    }
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 font-urdu text-right focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Password Change */}
                <div className="sm:col-span-2 pt-4 border-t border-neutral-800">
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Change Admin Password (Leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    placeholder="New password (min 4 characters)..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
                >
                  Save Bureau Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: DATA BACKUP & RESTORE */}
        {/* ========================================================= */}
        {activeTab === 'backup' && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h3 className="font-serif-title text-lg font-bold text-white">
                Data Sovereignty, Backup & Database Management
              </h3>
              <p className="text-xs text-neutral-400">
                You independently own all candidate records. You can export a full database backup file or restore records anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Export Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                    <Download className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base">Export Database Backup</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Download a secure JSON file containing all matrimonial profiles, documents, visitor inquiries, packages, and bureau settings.
                  </p>
                </div>

                <button
                  onClick={handleExportBackup}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download JSON Backup</span>
                </button>
              </div>

              {/* Import Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base">Restore From Backup File</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Upload a previously exported backup file to restore your bureau records immediately.
                  </p>
                </div>

                <label className="w-full py-2.5 px-4 rounded-xl border border-neutral-700 hover:border-amber-400 bg-neutral-950 text-neutral-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Select Backup File (.json)</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Reset to Sample Data Card */}
            <div className="bg-neutral-900/60 border border-rose-900/40 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Reset to Default Chakwal Sample Data</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Need to test or restore the initial Chakwal marriage bureau demo dataset? Click below to reload the default sample profiles and packages.
              </p>
              <button
                onClick={handleResetToSample}
                className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Database to Sample Data</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Editor Modals */}
      <ProfileEditorModal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setEditingProfile(null);
        }}
        onSave={handleSaveProfile}
        initialProfile={editingProfile}
      />

      <PackageEditorModal
        isOpen={isPackageModalOpen}
        onClose={() => {
          setIsPackageModalOpen(false);
          setEditingPackage(null);
        }}
        onSave={handleSavePackage}
        initialPackage={editingPackage}
      />

      <ChargeEditorModal
        isOpen={isChargeModalOpen}
        onClose={() => {
          setIsChargeModalOpen(false);
          setEditingCharge(null);
        }}
        onSave={handleSaveCharge}
        initialCharge={editingCharge}
      />
    </div>
  );
};
