export type Gender = 'Bride' | 'Groom';

export type MaritalStatus = 'Never Married' | 'Divorced' | 'Khula' | 'Widowed';

export type ProfileStatus = 'Active' | 'Under Review' | 'Matched / Nikkah Done' | 'Archived';

export interface DocumentAttachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'doc';
  dataUrl: string;
  uploadedAt: string;
  size: string;
}

export interface MatrimonialProfile {
  id: string;
  gender: Gender;
  fullName: string;
  caste: string;
  subCaste?: string;
  age: number;
  height: string;
  maritalStatus: MaritalStatus;
  religionSect: string;
  education: string;
  occupation: string;
  monthlyIncome: string;
  city: string;
  country: string;
  isOverseas: boolean;
  residenceType: string;
  familyDetails: {
    fatherOccupation: string;
    motherOccupation: string;
    brothersCount: number;
    brothersDetail: string;
    sistersCount: number;
    sistersDetail: string;
    nativeTown: string;
    familyStatus: string;
    phoneOrWhatsApp?: string;
  };
  partnerPreferences: {
    ageMin: number;
    ageMax: number;
    preferredCastes: string;
    educationRequired: string;
    preferredLocations: string;
    otherRequirements: string;
  };
  photoUrl: string;
  photoBlurred: boolean;
  documents: DocumentAttachment[];
  status: ProfileStatus;
  isFeatured: boolean;
  isVerified: boolean;
  createdAt: string;
  notes: string;
}

export interface MembershipPackage {
  id: string;
  title: string;
  subtitle: string;
  pricePKR: string;
  priceOverseas?: string;
  duration: string;
  popular: boolean;
  features: string[];
  recommendedFor: string;
}

export interface ServiceChargeItem {
  id: string;
  title: string;
  category: 'Registration' | 'Matchmaking' | 'Success Fee' | 'VIP Consultation';
  amount: string;
  description: string;
  urduNote?: string;
  terms: string;
}

export interface CustomerInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  seekingFor: Gender | 'Overseas Match' | 'General Consultation';
  candidateAge?: number;
  caste?: string;
  city?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Meeting Scheduled' | 'Converted to Profile' | 'Closed';
  uploadedFiles?: Array<{
    name: string;
    dataUrl: string;
    type: string;
    size: string;
  }>;
  createdAt: string;
  adminNotes?: string;
}

export interface BureauSettings {
  nameEnglish: string;
  nameUrdu: string;
  taglineEnglish: string;
  taglineUrdu: string;
  phone: string;
  whatsappNumber: string;
  addressEnglish: string;
  addressUrdu: string;
  officeHours: string;
  announcementEnglish: string;
  announcementUrdu: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
  adminPasswordHash: string; // Plain/stored password token
}
