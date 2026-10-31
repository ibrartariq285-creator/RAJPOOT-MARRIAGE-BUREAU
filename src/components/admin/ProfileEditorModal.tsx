import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Image,
  FileText,
  Trash2,
  Check,
  ShieldCheck,
  Star,
  Eye,
  EyeOff,
  Plus,
} from 'lucide-react';
import {
  MatrimonialProfile,
  Gender,
  MaritalStatus,
  ProfileStatus,
  DocumentAttachment,
} from '../../types/index.ts';

interface ProfileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: MatrimonialProfile) => void;
  initialProfile?: MatrimonialProfile | null;
}

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'career' | 'family' | 'partner' | 'media'>('basic');

  const [id, setId] = useState('');
  const [gender, setGender] = useState<Gender>('Bride');
  const [fullName, setFullName] = useState('');
  const [caste, setCaste] = useState('Rajpoot');
  const [subCaste, setSubCaste] = useState('');
  const [age, setAge] = useState<number>(25);
  const [height, setHeight] = useState("5' 4\"");
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>('Never Married');
  const [religionSect, setReligionSect] = useState('Islam - Sunni');

  // Career & Residence
  const [education, setEducation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [city, setCity] = useState('Chakwal');
  const [country, setCountry] = useState('Pakistan');
  const [isOverseas, setIsOverseas] = useState(false);
  const [residenceType, setResidenceType] = useState('Own House');

  // Family details
  const [fatherOccupation, setFatherOccupation] = useState('');
  const [motherOccupation, setMotherOccupation] = useState('Homemaker');
  const [brothersCount, setBrothersCount] = useState<number>(1);
  const [brothersDetail, setBrothersDetail] = useState('');
  const [sistersCount, setSistersCount] = useState<number>(1);
  const [sistersDetail, setSistersDetail] = useState('');
  const [nativeTown, setNativeTown] = useState('Chakwal');
  const [familyStatus, setFamilyStatus] = useState('Noble & Respectable Family');
  const [familyContact, setFamilyContact] = useState('');

  // Partner preferences
  const [ageMin, setAgeMin] = useState<number>(24);
  const [ageMax, setAgeMax] = useState<number>(30);
  const [preferredCastes, setPreferredCastes] = useState('Rajpoot, Chaudhry, Awan');
  const [educationRequired, setEducationRequired] = useState('Graduate / Master / Professional');
  const [preferredLocations, setPreferredLocations] = useState('Chakwal, Islamabad, Rawalpindi');
  const [otherRequirements, setPartnerRequirements] = useState('');

  // Media & Attachments
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoBlurred, setPhotoBlurred] = useState(false);
  const [documents, setDocuments] = useState<DocumentAttachment[]>([]);

  // Bureau meta
  const [status, setStatus] = useState<ProfileStatus>('Active');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialProfile) {
      setId(initialProfile.id);
      setGender(initialProfile.gender);
      setFullName(initialProfile.fullName);
      setCaste(initialProfile.caste);
      setSubCaste(initialProfile.subCaste || '');
      setAge(initialProfile.age);
      setHeight(initialProfile.height);
      setMaritalStatus(initialProfile.maritalStatus);
      setReligionSect(initialProfile.religionSect);
      setEducation(initialProfile.education);
      setOccupation(initialProfile.occupation);
      setMonthlyIncome(initialProfile.monthlyIncome || '');
      setCity(initialProfile.city);
      setCountry(initialProfile.country);
      setIsOverseas(initialProfile.isOverseas);
      setResidenceType(initialProfile.residenceType || '');

      setFatherOccupation(initialProfile.familyDetails.fatherOccupation || '');
      setMotherOccupation(initialProfile.familyDetails.motherOccupation || '');
      setBrothersCount(initialProfile.familyDetails.brothersCount || 0);
      setBrothersDetail(initialProfile.familyDetails.brothersDetail || '');
      setSistersCount(initialProfile.familyDetails.sistersCount || 0);
      setSistersDetail(initialProfile.familyDetails.sistersDetail || '');
      setNativeTown(initialProfile.familyDetails.nativeTown || '');
      setFamilyStatus(initialProfile.familyDetails.familyStatus || '');
      setFamilyContact(initialProfile.familyDetails.phoneOrWhatsApp || '');

      setAgeMin(initialProfile.partnerPreferences.ageMin || 22);
      setAgeMax(initialProfile.partnerPreferences.ageMax || 30);
      setPreferredCastes(initialProfile.partnerPreferences.preferredCastes || '');
      setEducationRequired(initialProfile.partnerPreferences.educationRequired || '');
      setPreferredLocations(initialProfile.partnerPreferences.preferredLocations || '');
      setPartnerRequirements(initialProfile.partnerPreferences.otherRequirements || '');

      setPhotoUrl(initialProfile.photoUrl || '');
      setPhotoBlurred(initialProfile.photoBlurred || false);
      setDocuments(initialProfile.documents || []);

      setStatus(initialProfile.status);
      setIsFeatured(initialProfile.isFeatured);
      setIsVerified(initialProfile.isVerified);
      setNotes(initialProfile.notes || '');
    } else {
      // New profile defaults
      const randomCode = Math.floor(100 + Math.random() * 900);
      setId(gender === 'Bride' ? `RMB-B${randomCode}` : `RMB-G${randomCode}`);
      setFullName('');
      setCaste('Rajpoot');
      setSubCaste('');
      setAge(26);
      setHeight("5' 6\"");
      setMaritalStatus('Never Married');
      setReligionSect('Islam - Sunni');
      setEducation('');
      setOccupation('');
      setMonthlyIncome('PKR 250,000/month');
      setCity('Chakwal');
      setCountry('Pakistan');
      setIsOverseas(false);
      setResidenceType('Own family house');
      setFatherOccupation('');
      setMotherOccupation('Homemaker');
      setBrothersCount(1);
      setBrothersDetail('');
      setSistersCount(1);
      setSistersDetail('');
      setNativeTown('Chakwal');
      setFamilyStatus('Noble & Respectable Family');
      setFamilyContact('');
      setAgeMin(22);
      setAgeMax(30);
      setPreferredCastes('Rajpoot, Chaudhry, Awan, Syed');
      setEducationRequired('Educated / Professional');
      setPreferredLocations('Chakwal, Islamabad, Rawalpindi');
      setPartnerRequirements('');
      setPhotoUrl(gender === 'Bride' ? '/src/assets/images/profile_bride_sample_1793423563999.jpg' : '/src/assets/images/profile_groom_sample_1793423562962.jpg');
      setPhotoBlurred(gender === 'Bride');
      setDocuments([]);
      setStatus('Active');
      setIsFeatured(false);
      setIsVerified(true);
      setNotes('');
    }
  }, [initialProfile, isOpen]);

  // Adjust ID prefix if gender is switched in creation mode
  const handleGenderChange = (newGender: Gender) => {
    setGender(newGender);
    if (!initialProfile) {
      const randomCode = Math.floor(100 + Math.random() * 900);
      setId(newGender === 'Bride' ? `RMB-B${randomCode}` : `RMB-G${randomCode}`);
      setPhotoBlurred(newGender === 'Bride');
      setPhotoUrl(newGender === 'Bride' ? '/src/assets/images/profile_bride_sample_1793423563999.jpg' : '/src/assets/images/profile_groom_sample_1793423562962.jpg');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
        const newDoc: DocumentAttachment = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: file.name,
          type: file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'image' : 'doc',
          dataUrl: result,
          uploadedAt: new Date().toISOString().split('T')[0],
          size: sizeStr,
        };
        setDocuments((prev) => [...prev, newDoc]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile: MatrimonialProfile = {
      id: id.trim() || `RMB-${Math.floor(100 + Math.random() * 900)}`,
      gender,
      fullName: fullName.trim(),
      caste: caste.trim(),
      subCaste: subCaste.trim(),
      age: Number(age),
      height: height.trim(),
      maritalStatus,
      religionSect: religionSect.trim(),
      education: education.trim(),
      occupation: occupation.trim(),
      monthlyIncome: monthlyIncome.trim(),
      city: city.trim(),
      country: country.trim(),
      isOverseas,
      residenceType: residenceType.trim(),
      familyDetails: {
        fatherOccupation: fatherOccupation.trim(),
        motherOccupation: motherOccupation.trim(),
        brothersCount: Number(brothersCount),
        brothersDetail: brothersDetail.trim(),
        sistersCount: Number(sistersCount),
        sistersDetail: sistersDetail.trim(),
        nativeTown: nativeTown.trim(),
        familyStatus: familyStatus.trim(),
        phoneOrWhatsApp: familyContact.trim(),
      },
      partnerPreferences: {
        ageMin: Number(ageMin),
        ageMax: Number(ageMax),
        preferredCastes: preferredCastes.trim(),
        educationRequired: educationRequired.trim(),
        preferredLocations: preferredLocations.trim(),
        otherRequirements: otherRequirements.trim(),
      },
      photoUrl: photoUrl.trim(),
      photoBlurred,
      documents,
      status,
      isFeatured,
      isVerified,
      createdAt: initialProfile?.createdAt || new Date().toISOString().split('T')[0],
      notes: notes.trim(),
    };

    onSave(updatedProfile);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-6 text-neutral-100 flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-b border-amber-900/40 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="font-serif-title text-lg sm:text-xl font-bold text-white">
              {initialProfile ? `Edit Profile: ${initialProfile.id}` : 'Create New Matrimonial Profile'}
            </h2>
            <div className="text-xs text-amber-400">
              {gender === 'Bride' ? 'Bride Profile (دلہن)' : 'Groom Profile (دولہا)'}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/70 px-4 gap-2 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'basic'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            1. Personal Info
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('career')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'career'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            2. Career & Location
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('family')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'family'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            3. Family Background
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('partner')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'partner'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            4. Partner Preferences
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'media'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            5. Photo & Documents
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Profile ID / Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => handleGenderChange(e.target.value as Gender)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Bride">Bride (دلہن)</option>
                    <option value="Groom">Groom (دولہا)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Candidate name"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Caste / Clan *
                  </label>
                  <input
                    type="text"
                    required
                    value={caste}
                    onChange={(e) => setCaste(e.target.value)}
                    placeholder="e.g. Rajpoot, Chaudhry, Syed, Awan..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Subcaste / Shakh
                  </label>
                  <input
                    type="text"
                    value={subCaste}
                    onChange={(e) => setSubCaste(e.target.value)}
                    placeholder="e.g. Janjua, Minhas, Gondal..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={80}
                    required
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Height *
                  </label>
                  <input
                    type="text"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 5' 4&quot; or 5' 11&quot;"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Marital Status *
                  </label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value as MaritalStatus)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Khula">Khula</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Religion / Sect (مسلک) *
                  </label>
                  <select
                    value={religionSect}
                    onChange={(e) => setReligionSect(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Islam - Sunni">Islam - Sunni</option>
                    <option value="Islam - Shia">Islam - Shia</option>
                    <option value="Islam - Ahl-e-Hadith">Islam - Ahl-e-Hadith</option>
                    <option value="Islam - Deobandi">Islam - Deobandi</option>
                    <option value="Islam - Barelvi">Islam - Barelvi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Status & Badges Controls */}
              <div className="pt-4 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Profile Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProfileStatus)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Active">Active (Visible in Directory)</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Matched / Nikkah Done">Matched / Nikkah Done</option>
                    <option value="Archived">Archived / Hidden</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="verifiedCheck"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded bg-neutral-950 border-neutral-700"
                  />
                  <label htmlFor="verifiedCheck" className="text-neutral-200 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Verified by Bureau
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featuredCheck"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded bg-neutral-950 border-neutral-700"
                  />
                  <label htmlFor="featuredCheck" className="text-neutral-200 font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400" />
                    Featured on Roster
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CAREER & RESIDENCE */}
          {activeTab === 'career' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Education / Degree *
                </label>
                <input
                  type="text"
                  required
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="e.g. MBBS, MS Computer Science, B.Com, LLB..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Occupation / Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Doctor, Software Engineer, Business Owner, Bank Officer..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Monthly / Annual Income
                </label>
                <input
                  type="text"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="e.g. PKR 350,000/month or £4,500/month"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Current City *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Chakwal, Islamabad, Rawalpindi, London..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Pakistan, United Kingdom, UAE, USA..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="overseasCheck"
                  checked={isOverseas}
                  onChange={(e) => setIsOverseas(e.target.checked)}
                  className="w-4 h-4 text-emerald-500 rounded bg-neutral-950 border-neutral-700"
                />
                <label htmlFor="overseasCheck" className="text-neutral-200 font-medium">
                  Candidate is Overseas Expat / Foreign Resident
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-300 font-medium mb-1">
                  Residence & Property Details
                </label>
                <input
                  type="text"
                  value={residenceType}
                  onChange={(e) => setResidenceType(e.target.value)}
                  placeholder="e.g. Own 1 Kanal House in Bahria Town + Landed agricultural property in Chakwal"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* TAB 3: FAMILY BACKGROUND */}
          {activeTab === 'family' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Father's Occupation
                </label>
                <input
                  type="text"
                  value={fatherOccupation}
                  onChange={(e) => setFatherOccupation(e.target.value)}
                  placeholder="e.g. Govt Officer (Retd), Landlord, Businessman..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Mother's Occupation
                </label>
                <input
                  type="text"
                  value={motherOccupation}
                  onChange={(e) => setMotherOccupation(e.target.value)}
                  placeholder="e.g. Homemaker, Teacher, Doctor..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Brothers Count
                </label>
                <input
                  type="number"
                  min={0}
                  value={brothersCount}
                  onChange={(e) => setBrothersCount(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Brothers' Details (Marital & Jobs)
                </label>
                <input
                  type="text"
                  value={brothersDetail}
                  onChange={(e) => setBrothersDetail(e.target.value)}
                  placeholder="e.g. 1 Married in UK, 1 Younger studying engineering"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Sisters Count
                </label>
                <input
                  type="number"
                  min={0}
                  value={sistersCount}
                  onChange={(e) => setSistersCount(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Sisters' Details (Marital & Jobs)
                </label>
                <input
                  type="text"
                  value={sistersDetail}
                  onChange={(e) => setSistersDetail(e.target.value)}
                  placeholder="e.g. Both married into respectable families in Rawalpindi"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Native Town / Ancestral City
                </label>
                <input
                  type="text"
                  value={nativeTown}
                  onChange={(e) => setNativeTown(e.target.value)}
                  placeholder="e.g. Chakwal Main City, Talagang, Choa Saidan Shah..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Family Social Stature
                </label>
                <input
                  type="text"
                  value={familyStatus}
                  onChange={(e) => setFamilyStatus(e.target.value)}
                  placeholder="e.g. Noble Military & Landlord Rajpoot Family"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-300 font-medium mb-1">
                  Family Phone / WhatsApp (Private Bureau Record)
                </label>
                <input
                  type="tel"
                  value={familyContact}
                  onChange={(e) => setFamilyContact(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* TAB 4: PARTNER PREFERENCES */}
          {activeTab === 'partner' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Minimum Age Preference
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={75}
                    value={ageMin}
                    onChange={(e) => setAgeMin(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Maximum Age Preference
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={75}
                    value={ageMax}
                    onChange={(e) => setAgeMax(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Acceptable Castes
                  </label>
                  <input
                    type="text"
                    value={preferredCastes}
                    onChange={(e) => setPreferredCastes(e.target.value)}
                    placeholder="e.g. Rajpoot, Chaudhry, Awan, Syed, or Any noble family"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Education Required
                  </label>
                  <input
                    type="text"
                    value={educationRequired}
                    onChange={(e) => setEducationRequired(e.target.value)}
                    placeholder="e.g. MBBS / Engineer / CSS Officer / Graduate"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-300 font-medium mb-1">
                    Preferred Cities / Overseas Locations
                  </label>
                  <input
                    type="text"
                    value={preferredLocations}
                    onChange={(e) => setPreferredLocations(e.target.value)}
                    placeholder="e.g. Chakwal, Rawalpindi, Islamabad, UK, Canada, UAE"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-300 font-medium mb-1">
                    Special Requirements & Temperament
                  </label>
                  <textarea
                    rows={3}
                    value={otherRequirements}
                    onChange={(e) => setPartnerRequirements(e.target.value)}
                    placeholder="e.g. Cultured, polite, namazi, non-smoker, supportive in-laws..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PHOTO & DOCUMENTS UPLOADS */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              {/* Photo section */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-4">
                <h4 className="font-semibold text-neutral-200 flex items-center gap-2">
                  <Image className="w-4 h-4 text-amber-400" />
                  <span>Profile Photo Management</span>
                </h4>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-28 h-28 rounded-xl overflow-hidden border-2 border-amber-500/40 bg-neutral-900 shrink-0">
                    <img
                      src={photoUrl || '/src/assets/images/hero_matrimonial_bureau_1793423562185.jpg'}
                      alt="Candidate Preview"
                      className={`w-full h-full object-cover object-top ${
                        photoBlurred ? 'blur-sm' : ''
                      }`}
                    />
                  </div>

                  <div className="space-y-3 flex-1 w-full text-xs">
                    <div>
                      <label className="block text-neutral-400 mb-1">
                        Upload Image from Device (JPG / PNG):
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-500/20 file:text-amber-300 hover:file:bg-amber-500/30 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1">
                        Or Image URL / Path:
                      </label>
                      <input
                        type="text"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="/src/assets/images/... or https://..."
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-neutral-100"
                      />
                    </div>

                    {/* Privacy blur switch */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setPhotoBlurred(!photoBlurred)}
                        className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 border transition-colors cursor-pointer ${
                          photoBlurred
                            ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                            : 'bg-neutral-900 border-neutral-700 text-neutral-400'
                        }`}
                      >
                        {photoBlurred ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{photoBlurred ? 'Photo Privacy Blur ON' : 'Photo Privacy Blur OFF'}</span>
                      </button>
                      <span className="text-[11px] text-neutral-500">
                        (Blur photo on public directory for family privacy)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents & PDF upload section */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-neutral-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Upload Documents & PDF Files (CNIC, Degrees, Family Biodatas)</span>
                  </h4>
                  <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add File / PDF</span>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,image/*"
                      onChange={handleDocumentUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {documents.length > 0 ? (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="font-medium text-neutral-200 truncate">{doc.name}</span>
                          <span className="text-neutral-500 text-[11px]">({doc.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(doc.id)}
                          className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-neutral-800 rounded-xl text-neutral-500 text-xs">
                    No documents attached yet. Click "Add File / PDF" above to upload candidate records.
                  </div>
                )}
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Private Bureau Notes (Not shown to public)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Family visited Chakwal office on Oct 20. Highly respectable, direct contact with father."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-neutral-100 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {activeTab !== 'basic' && (
                <button
                  type="button"
                  onClick={() => {
                    const tabs: Array<'basic' | 'career' | 'family' | 'partner' | 'media'> = [
                      'basic',
                      'career',
                      'family',
                      'partner',
                      'media',
                    ];
                    const idx = tabs.indexOf(activeTab);
                    if (idx > 0) setActiveTab(tabs[idx - 1]);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-300 text-xs hover:bg-neutral-800"
                >
                  Previous Step
                </button>
              )}
              {activeTab !== 'media' && (
                <button
                  type="button"
                  onClick={() => {
                    const tabs: Array<'basic' | 'career' | 'family' | 'partner' | 'media'> = [
                      'basic',
                      'career',
                      'family',
                      'partner',
                      'media',
                    ];
                    const idx = tabs.indexOf(activeTab);
                    if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1]);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-200 text-xs hover:bg-neutral-700"
                >
                  Next Step
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-neutral-700 text-neutral-300 hover:bg-neutral-800 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Save Profile</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
