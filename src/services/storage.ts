import {
  MatrimonialProfile,
  MembershipPackage,
  ServiceChargeItem,
  CustomerInquiry,
  BureauSettings,
} from '../types/index.ts';

const STORAGE_KEYS = {
  PROFILES: 'rmb_matrimonial_profiles_v1',
  PACKAGES: 'rmb_membership_packages_v1',
  CHARGES: 'rmb_service_charges_v1',
  INQUIRIES: 'rmb_customer_inquiries_v1',
  SETTINGS: 'rmb_bureau_settings_v1',
  ADMIN_SESSION: 'rmb_admin_session_v1',
};

// Initial Seed Data
const DEFAULT_SETTINGS: BureauSettings = {
  nameEnglish: 'Rajpoot Marriage Bureau',
  nameUrdu: 'راجپوت میرج بیورو',
  taglineEnglish: 'TRUST | RESPECT | SUCCESS',
  taglineUrdu: 'اعتماد، عزت اور کامیابی کے ساتھ معیاری رشتے',
  phone: '0342-5915054',
  whatsappNumber: '923425915054',
  addressEnglish: 'Main Bazar, Main City, Pehlwan Rewri, Chakwal, Punjab, Pakistan',
  addressUrdu: 'چکوال، مین شہر، مین بازار، پھلوان ریوڑی',
  officeHours: 'Monday - Saturday: 10:00 AM - 8:00 PM (Friday break: 1:00 PM - 3:00 PM)',
  announcementEnglish: 'Proposals available from all castes and sects across Pakistan, UK, USA, Canada, and Gulf countries.',
  announcementUrdu: 'ہمارے پاس پاکستان اور بیرونِ ممالک کے ہر مسلک، ہر ذات، ہر قوم کے معیاری اور باوقار رشتے موجود ہیں۔',
  socialLinks: {
    facebook: 'https://facebook.com/rajpootmarriagebureau',
    instagram: 'https://instagram.com/rajpootmarriagebureau',
    youtube: 'https://youtube.com/@rajpootmarriagebureau',
    tiktok: 'https://tiktok.com/@rajpootmarriagebureau',
  },
  adminPasswordHash: 'admin123',
};

const DEFAULT_PROFILES: MatrimonialProfile[] = [
  {
    id: 'RMB-G101',
    gender: 'Groom',
    fullName: 'Hammad Ali Janjua',
    caste: 'Rajpoot (Janjua)',
    subCaste: 'Janjua Shahi',
    age: 28,
    height: "5' 11\"",
    maritalStatus: 'Never Married',
    religionSect: 'Islam - Sunni',
    education: 'MS Computer Science (FAST-NUCES)',
    occupation: 'Senior Software Engineering Lead (Fintech)',
    monthlyIncome: 'PKR 480,000/month',
    city: 'Islamabad / Chakwal Native',
    country: 'Pakistan',
    isOverseas: false,
    residenceType: 'Own 1 Kanal Luxury House in Bahria Town, Islamabad & Agricultural Land in Chakwal',
    familyDetails: {
      fatherOccupation: 'Retired Lt. Colonel (Pakistan Army)',
      motherOccupation: 'Homemaker',
      brothersCount: 1,
      brothersDetail: '1 Younger Brother (Completing MBBS at King Edward Medical University)',
      sistersCount: 1,
      sistersDetail: '1 Elder Sister (Married to an Engineer in Rawalpindi)',
      nativeTown: 'Chakwal City',
      familyStatus: 'Reputable, Noble Military & Landlord Rajpoot Family',
      phoneOrWhatsApp: '0342-5915054',
    },
    partnerPreferences: {
      ageMin: 22,
      ageMax: 26,
      preferredCastes: 'Rajpoot (Janjua/Minhas), Chaudhry, or Respectable Syed/Awan',
      educationRequired: 'Graduation / Master / MBBS / BDS / CS',
      preferredLocations: 'Chakwal, Islamabad, Rawalpindi, Lahore or Overseas',
      otherRequirements: 'Cultured, family-oriented, practicing religious values and respectful temperament.',
    },
    photoUrl: '/src/assets/images/profile_groom_sample_1793423562962.jpg',
    photoBlurred: false,
    documents: [
      {
        id: 'doc-1',
        name: 'Hammad_Janjua_Family_Biodata.pdf',
        type: 'pdf',
        dataUrl: '#',
        uploadedAt: '2026-10-25',
        size: '1.2 MB',
      },
    ],
    status: 'Active',
    isFeatured: true,
    isVerified: true,
    createdAt: '2026-10-24',
    notes: 'Father visited our Chakwal Main Bazar bureau in person. Highly decent and verified proposal.',
  },
  {
    id: 'RMB-B201',
    gender: 'Bride',
    fullName: 'Dr. Fatima Zahra Minhas',
    caste: 'Rajpoot (Minhas)',
    subCaste: 'Minhas Royal',
    age: 25,
    height: "5' 4\"",
    maritalStatus: 'Never Married',
    religionSect: 'Islam - Sunni',
    education: 'MBBS (Army Medical College Rawalpindi)',
    occupation: 'Resident Medical Officer (Cardiology)',
    monthlyIncome: 'PKR 190,000/month',
    city: 'Chakwal / Rawalpindi',
    country: 'Pakistan',
    isOverseas: false,
    residenceType: 'Own Double Storey House in Chakwal Cantt & Family Farmhouse',
    familyDetails: {
      fatherOccupation: 'Senior Civil Officer (Govt of Punjab)',
      motherOccupation: 'Senior School Headmistress (Retd)',
      brothersCount: 2,
      brothersDetail: '2 Brothers (Both Engineers, 1 in Canada, 1 in Islamabad)',
      sistersCount: 0,
      sistersDetail: 'None',
      nativeTown: 'Chakwal Main City',
      familyStatus: 'Highly Educated, Well-Cultured Noble Rajpoot Family',
      phoneOrWhatsApp: '0342-5915054',
    },
    partnerPreferences: {
      ageMin: 26,
      ageMax: 30,
      preferredCastes: 'Rajpoot, Chaudhry, Awan, Syed, or Jatt',
      educationRequired: 'Doctor (MBBS/FCPS) or Well-Settled Engineer / CSS Officer',
      preferredLocations: 'Rawalpindi, Islamabad, Chakwal, Lahore or UK/Canada/UAE',
      otherRequirements: 'Settled career, non-smoker, decent family background with Islamic values.',
    },
    photoUrl: '/src/assets/images/profile_bride_sample_1793423563999.jpg',
    photoBlurred: true,
    documents: [],
    status: 'Active',
    isFeatured: true,
    isVerified: true,
    createdAt: '2026-10-26',
    notes: 'Family requested photo privacy blur on public portal. Can share directly with verified prospective families.',
  },
  {
    id: 'RMB-G102',
    gender: 'Groom',
    fullName: 'Bilal Chaudhry',
    caste: 'Chaudhry / Jatt',
    subCaste: 'Gondal',
    age: 31,
    height: "6' 0\"",
    maritalStatus: 'Never Married',
    religionSect: 'Islam - Sunni',
    education: 'B.Eng Civil Engineering (UCL London)',
    occupation: 'Chartered Infrastructure Project Manager',
    monthlyIncome: '£5,200/month (~PKR 1,850,000)',
    city: 'London / Manchester',
    country: 'United Kingdom',
    isOverseas: true,
    residenceType: 'Own 4-Bedroom Freehold Home in Greater London & Landed Property in Punjab',
    familyDetails: {
      fatherOccupation: 'Established Business Owner in UK (Logistics & Property)',
      motherOccupation: 'Homemaker',
      brothersCount: 1,
      brothersDetail: '1 Brother (Chartered Accountant in Central London)',
      sistersCount: 2,
      sistersDetail: 'Both Married and Well-Settled with reputable families in UK',
      nativeTown: 'Roots in Chakwal / Gujrat, settled in UK for 35 years',
      familyStatus: 'Affluent Overseas Pakistani Family with strong connection to home country',
      phoneOrWhatsApp: '0342-5915054',
    },
    partnerPreferences: {
      ageMin: 23,
      ageMax: 28,
      preferredCastes: 'Any respectable caste (Chaudhry, Rajpoot, Awan, Jatt, Gujjar)',
      educationRequired: 'Graduate or Postgraduate, fluent in English, adaptable to UK lifestyle',
      preferredLocations: 'Pakistan (willing to relocate to UK) or already UK resident',
      otherRequirements: 'Honest, humble, family-loving and religious disposition.',
    },
    photoUrl: '/src/assets/images/profile_groom_sample_1793423562962.jpg',
    photoBlurred: false,
    documents: [],
    status: 'Active',
    isFeatured: true,
    isVerified: true,
    createdAt: '2026-10-22',
    notes: 'Mother visited bureau while in Pakistan on holiday. British passport holder groom.',
  },
  {
    id: 'RMB-B202',
    gender: 'Bride',
    fullName: 'Ayesha Malik Awan',
    caste: 'Malik / Awan',
    subCaste: 'Qutb Shahi Awan',
    age: 26,
    height: "5' 5\"",
    maritalStatus: 'Never Married',
    religionSect: 'Islam - Sunni',
    education: 'M.Phil English Literature (Quaid-e-Azam University)',
    occupation: 'Lecturer in College & Content Strategist',
    monthlyIncome: 'PKR 160,000/month',
    city: 'Chakwal',
    country: 'Pakistan',
    isOverseas: false,
    residenceType: 'Family Ancestral Haveli & Modern Residence near Chakwal City',
    familyDetails: {
      fatherOccupation: 'Advocate High Court & Senior Landowner',
      motherOccupation: 'Govt College Professor',
      brothersCount: 1,
      brothersDetail: '1 Elder Brother (Chartered Accountant in Rawalpindi)',
      sistersCount: 1,
      sistersDetail: '1 Younger Sister (BS Computer Science student)',
      nativeTown: 'Chakwal District',
      familyStatus: 'Pious, Respected Literary & Legal Family with vast local goodwill',
    },
    partnerPreferences: {
      ageMin: 27,
      ageMax: 32,
      preferredCastes: 'Malik/Awan, Rajpoot, Chaudhry, Abbasi, Syed',
      educationRequired: 'Master / Engineering / CSS / Civil Service / Professional Degree',
      preferredLocations: 'Chakwal, Islamabad, Rawalpindi or Overseas (UK/USA/Gulf)',
      otherRequirements: 'Kind, dignified, intellectually sound, from an educated family background.',
    },
    photoUrl: '/src/assets/images/profile_bride_sample_1793423563999.jpg',
    photoBlurred: true,
    documents: [],
    status: 'Active',
    isFeatured: false,
    isVerified: true,
    createdAt: '2026-10-27',
    notes: 'Direct family registration. Photo withheld by family request.',
  },
  {
    id: 'RMB-G103',
    gender: 'Groom',
    fullName: 'Nabeel Shahzad Bhatti',
    caste: 'Rajpoot (Bhatti)',
    subCaste: 'Bhatti',
    age: 33,
    height: "5' 10\"",
    maritalStatus: 'Never Married',
    religionSect: 'Islam - Sunni',
    education: 'MBA Marketing (IBA Karachi)',
    occupation: 'Senior Director of Business Operations (Logistics & Supply Chain)',
    monthlyIncome: 'AED 24,000/month (~PKR 1,800,000)',
    city: 'Dubai',
    country: 'United Arab Emirates',
    isOverseas: true,
    residenceType: 'Own 3-Bedroom Apartment in Downtown Dubai + Family House in Lahore Cantt',
    familyDetails: {
      fatherOccupation: 'Exporter & Industrialist (Retd)',
      motherOccupation: 'Homemaker',
      brothersCount: 2,
      brothersDetail: '2 Brothers (Both managing family business in UAE & Lahore)',
      sistersCount: 1,
      sistersDetail: '1 Sister (Married in Islamabad)',
      nativeTown: 'Punjab, roots in Chakwal',
      familyStatus: 'Financially sound, well-traveled, cultured business family',
    },
    partnerPreferences: {
      ageMin: 24,
      ageMax: 29,
      preferredCastes: 'Rajpoot, Jatt, Chaudhry, Sheikh, Awan',
      educationRequired: 'Minimum Bachelor / Master degree',
      preferredLocations: 'Pakistan (willing to relocate to UAE) or Gulf resident',
      otherRequirements: 'Pleasant personality, open-minded yet religious, values family harmony.',
    },
    photoUrl: '/src/assets/images/profile_groom_sample_1793423562962.jpg',
    photoBlurred: false,
    documents: [],
    status: 'Active',
    isFeatured: true,
    isVerified: true,
    createdAt: '2026-10-20',
    notes: 'Profile verified. UAE Golden Visa holder.',
  },
  {
    id: 'RMB-B203',
    gender: 'Bride',
    fullName: 'Syeda Maryam Gilani',
    caste: 'Syed',
    subCaste: 'Gilani',
    age: 27,
    height: "5' 3\"",
    maritalStatus: 'Never Married',
    religionSect: 'Islam - Shia / Sunni (Respected Sadat)',
    education: 'Pharm-D (Doctor of Pharmacy, Riphah University)',
    occupation: 'Clinical Pharmacist at Shifa International Hospital',
    monthlyIncome: 'PKR 175,000/month',
    city: 'Islamabad / Rawalpindi',
    country: 'Pakistan',
    isOverseas: false,
    residenceType: 'Own 1 Kanal House in G-13 Islamabad',
    familyDetails: {
      fatherOccupation: 'Executive Director (Federal Ministry)',
      motherOccupation: 'Principal of Senior Secondary School',
      brothersCount: 1,
      brothersDetail: '1 Brother (Software Architect in Seattle, USA)',
      sistersCount: 2,
      sistersDetail: 'Both Married into reputable families',
      nativeTown: 'Chakwal / Talagang / Rawalpindi',
      familyStatus: 'Respected Sadat family, noble lineage and modern education',
    },
    partnerPreferences: {
      ageMin: 28,
      ageMax: 33,
      preferredCastes: 'Syed / Hashmi / Kazmi / Bukhari or any pious respectable Muslim',
      educationRequired: 'Doctor, Engineer, Civil Servant, or Corporate Professional',
      preferredLocations: 'Islamabad, Rawalpindi, Lahore, USA, Canada, UK',
      otherRequirements: 'Gentleman with high moral character, namazi, educated and supportive.',
    },
    photoUrl: '/src/assets/images/profile_bride_sample_1793423563999.jpg',
    photoBlurred: true,
    documents: [],
    status: 'Active',
    isFeatured: true,
    isVerified: true,
    createdAt: '2026-10-18',
    notes: 'Photo privacy active. Contact Rajpoot Marriage Bureau Chakwal office for biodata exchange.',
  },
  {
    id: 'RMB-G104',
    gender: 'Groom',
    fullName: 'Usman Tariq Minhas',
    caste: 'Rajpoot (Minhas)',
    subCaste: 'Minhas',
    age: 30,
    height: "5' 10\"",
    maritalStatus: 'Never Married',
    religionSect: 'Islam - Sunni',
    education: 'LLM Corporate Law (UK) & Advocate High Court',
    occupation: 'Civil Service Officer (Assistant Commissioner, Grade 17)',
    monthlyIncome: 'PKR 260,000/month + Official Perks & Residence',
    city: 'Lahore / Chakwal',
    country: 'Pakistan',
    isOverseas: false,
    residenceType: 'Government Designated Residence + Personal House in Chakwal Model Town',
    familyDetails: {
      fatherOccupation: 'Distinguished Landlord & Former District Council Member',
      motherOccupation: 'Homemaker',
      brothersCount: 1,
      brothersDetail: '1 Brother (Managing agriculture farms & businesses in Chakwal)',
      sistersCount: 1,
      sistersDetail: '1 Sister (Married in Islamabad)',
      nativeTown: 'Chakwal Main',
      familyStatus: 'Prominent Political & Landowner Rajpoot Family of District Chakwal',
    },
    partnerPreferences: {
      ageMin: 23,
      ageMax: 27,
      preferredCastes: 'Rajpoot, Chaudhry, Awan, Jatt, Tiwana',
      educationRequired: 'Master / MBBS / BDS / Law / Civil Services',
      preferredLocations: 'Chakwal, Lahore, Islamabad, Rawalpindi',
      otherRequirements: 'Decent, polite, educated lady capable of managing social and family circles.',
    },
    photoUrl: '/src/assets/images/profile_groom_sample_1793423562962.jpg',
    photoBlurred: false,
    documents: [],
    status: 'Active',
    isFeatured: true,
    isVerified: true,
    createdAt: '2026-10-15',
    notes: 'Prime rishta. Contact bureau head directly for confidential meeting.',
  },
  {
    id: 'RMB-B204',
    gender: 'Bride',
    fullName: 'Zainab Qureshi',
    caste: 'Qureshi / Hashmi',
    age: 28,
    height: "5' 6\"",
    maritalStatus: 'Never Married',
    religionSect: 'Islam - Sunni',
    education: 'Chartered Financial Analyst (CFA) & ACCA',
    occupation: 'Senior Financial Risk Consultant at Deloitte',
    monthlyIncome: '£4,200/month (~PKR 1,500,000)',
    city: 'Birmingham / London',
    country: 'United Kingdom',
    isOverseas: true,
    residenceType: 'Own Luxury Apartment in Birmingham & Family House in Islamabad',
    familyDetails: {
      fatherOccupation: 'Consultant Surgeon (NHS UK)',
      motherOccupation: 'Clinical Psychologist',
      brothersCount: 2,
      brothersDetail: 'Both Doctors in the UK',
      sistersCount: 0,
      sistersDetail: 'None',
      nativeTown: 'Chakwal heritage, UK residents for 25+ years',
      familyStatus: 'Elite Medical & Professional Overseas Family',
    },
    partnerPreferences: {
      ageMin: 28,
      ageMax: 33,
      preferredCastes: 'Any respectable educated Muslim family',
      educationRequired: 'Postgraduate / Professional (Doctor, Engineer, Finance, Tech)',
      preferredLocations: 'UK, Europe, USA, or Pakistan (willing to relocate to UK)',
      otherRequirements: 'Religious minded, humble, ambitious, progressive yet traditional values.',
    },
    photoUrl: '/src/assets/images/profile_bride_sample_1793423563999.jpg',
    photoBlurred: true,
    documents: [],
    status: 'Active',
    isFeatured: true,
    isVerified: true,
    createdAt: '2026-10-12',
    notes: 'Overseas verified portfolio. Complete documents verified by UK solicitors.',
  },
];

const DEFAULT_PACKAGES: MembershipPackage[] = [
  {
    id: 'pkg-1',
    title: 'Silver Proposal Plan',
    subtitle: 'Ideal for local families in Chakwal & surrounding districts',
    pricePKR: 'PKR 15,000',
    priceOverseas: '$100',
    duration: '3 Months Active Matching',
    popular: false,
    recommendedFor: 'Local families seeking quick verified matches in Chakwal & Potohar region',
    features: [
      'Access to 15+ verified bride/groom biodatas',
      'Direct telephone coordination by bureau matchmaker',
      'Profile listing in our private verified directory',
      'Initial background and family credential check',
      'Coordination of up to 3 family telephonic introductions',
      'WhatsApp assistance during office hours',
    ],
  },
  {
    id: 'pkg-2',
    title: 'Gold Executive Match',
    subtitle: 'Our most popular comprehensive nationwide matchmaking plan',
    pricePKR: 'PKR 35,000',
    priceOverseas: '$200',
    duration: '6 Months Active Service',
    popular: true,
    recommendedFor: 'Families seeking educated professionals (Doctors, Engineers, CSS Officers, Business)',
    features: [
      'Unlimited matching proposals from Punjab & Federal Capital',
      'Personalized dedicated matchmaking consultant',
      'Comprehensive in-person family background verification',
      'Private meeting room arranged at our Chakwal Main Bazar bureau',
      'Direct exchange of verified photos & educational degrees',
      'Priority showcase in our featured matrimonial roster',
      'Assistance with sharia and customary family etiquette',
    ],
  },
  {
    id: 'pkg-3',
    title: 'Overseas Diamond Club',
    subtitle: 'Exclusive international matching for UK, USA, Canada, UAE & Europe',
    pricePKR: 'PKR 75,000',
    priceOverseas: '£350 / $450',
    duration: '1 Year Full International Service',
    popular: false,
    recommendedFor: 'Overseas Pakistanis seeking matches abroad or highly suitable candidates from Pakistan',
    features: [
      'Proposals from UK, USA, Canada, UAE, Australia & Europe',
      'Verification of immigration status, nationality & foreign employment',
      'Cross-border high-definition video conference coordination',
      'Assistance with embassy documentation & nikahnama protocols',
      'Direct communication across international time zones',
      '24/7 dedicated senior matchmaker on WhatsApp',
      'Confidential discrete handling for high-profile families',
    ],
  },
  {
    id: 'pkg-4',
    title: 'Royal VIP Personalized Bureau',
    subtitle: 'Bespoke end-to-end matchmaking managed personally by Bureau Director',
    pricePKR: 'PKR 125,000',
    priceOverseas: '£650 / $800',
    duration: 'Until Nikkah Finalization (No Expiry)',
    popular: false,
    recommendedFor: 'Prominent industrial, landlord, civil service and noble families seeking total privacy',
    features: [
      'Direct personal matchmaking handled by Director Rajpoot Bureau',
      'Home visit by our senior bureau delegation for family counseling',
      'Strict 100% confidentiality (profile never shown publicly)',
      'Handpicked elite proposals matched to exact caste, lineage & stature',
      'Complete liaison from initial biodata review until engagement & Nikkah',
      'Unlimited meetings in VIP private lounge',
      'Comprehensive legal and matrimonial guidance',
    ],
  },
];

const DEFAULT_CHARGES: ServiceChargeItem[] = [
  {
    id: 'chg-1',
    title: 'Biodata Registration & Verification Fee',
    category: 'Registration',
    amount: 'PKR 5,000 (One-Time)',
    description: 'Covers administrative biodata verification, scanning of CNIC/passport, file creation, and private directory inclusion.',
    urduNote: 'بائیو ڈیٹا اندراج اور کوائف کی تصدیق کی فیس برائے ایک دفعہ۔',
    terms: 'Non-refundable once file is processed and entered into our database.',
  },
  {
    id: 'chg-2',
    title: 'Family Introduction & Meeting Arrangement',
    category: 'Matchmaking',
    amount: 'PKR 5,000 / Meeting',
    description: 'Arranging and hosting a respectful, secure family meeting at our Chakwal Main Bazar air-conditioned office with refreshments.',
    urduNote: 'دفتر میں دونوں خاندانوں کی باوقار ملاقات کا اہتمام۔',
    terms: 'Included complimentary in Gold, Overseas, and Royal VIP plans.',
  },
  {
    id: 'chg-3',
    title: 'Post-Nikkah Success Shukrana (Local Match)',
    category: 'Success Fee',
    amount: 'PKR 50,000 to PKR 100,000 (Mutually Agreed)',
    description: 'Paid with gratitude upon successful engagement / Nikkah finalization through Rajpoot Marriage Bureau.',
    urduNote: 'رشتہ طے پانے اور نکاح کے وقت باہمی رضامندی سے طے شدہ شکرانہ۔',
    terms: 'Payable by both groom and bride families as per initial agreement prior to exchange of contacts.',
  },
  {
    id: 'chg-4',
    title: 'Post-Nikkah Success Shukrana (Overseas Match)',
    category: 'Success Fee',
    amount: '£500 - £1,000 / $800 - $1,500 (Mutually Agreed)',
    description: 'Success honorarium for international overseas proposals upon wedding / Nikkah finalization.',
    urduNote: 'بیرونِ ملک رشتہ کامیابی سے طے پانے پر شکرانہ۔',
    terms: 'Agreed in written contract at the time of overseas membership enrollment.',
  },
  {
    id: 'chg-5',
    title: 'Urgent Expedited Match Consultation',
    category: 'VIP Consultation',
    amount: 'PKR 10,000',
    description: 'Immediate 1-on-1 counseling with senior matchmaker to filter suitable proposals within 48 hours for urgent requirements.',
    urduNote: 'فوری اور ترجیحی رشتے تلاش کرنے کے لیے خصوصی مشاورت۔',
    terms: 'Adjustable towards Gold or Overseas plan if upgraded within 14 days.',
  },
];

const DEFAULT_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'INQ-1001',
    name: 'Chaudhry Riaz Ahmed',
    phone: '0300-5544332',
    email: 'riaz.ahmed@example.com',
    seekingFor: 'Bride',
    candidateAge: 29,
    caste: 'Rajpoot / Janjua',
    city: 'Chakwal Main',
    message: 'Looking for a well-educated bride (Doctor or Lecturer) for my son who is a Civil Engineer in Rawalpindi.',
    status: 'New',
    createdAt: '2026-10-29',
    adminNotes: 'Father is very polite. Call back during evening hours.',
  },
  {
    id: 'INQ-1002',
    name: 'Mrs. Parveen Akhtar',
    phone: '0333-8899771',
    email: 'parveen.akhtar@example.com',
    seekingFor: 'Groom',
    candidateAge: 25,
    caste: 'Awan',
    city: 'Talagang / Chakwal',
    message: 'Seeking a respectable religious family for my daughter (M.Sc Mathematics, 5ft 4in). Prefer Chakwal or Islamabad.',
    status: 'Contacted',
    createdAt: '2026-10-28',
    adminNotes: 'Spoke on WhatsApp. Sent Silver Plan details.',
  },
  {
    id: 'INQ-1003',
    name: 'Tariq Mehmood (UK)',
    phone: '+44 7700 900123',
    email: 'tariq.uk@example.com',
    seekingFor: 'Overseas Match',
    candidateAge: 32,
    caste: 'Rajpoot',
    city: 'Birmingham, UK',
    message: 'We are looking for a suitable proposal from Chakwal or Rawalpindi for our son who is a Pharmacist in Birmingham.',
    status: 'Meeting Scheduled',
    createdAt: '2026-10-27',
    adminNotes: 'Zoom / WhatsApp video call scheduled for Saturday at 5 PM UK time.',
  },
];

export const StorageService = {
  // Profiles
  getProfiles(): MatrimonialProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(DEFAULT_PROFILES));
        return DEFAULT_PROFILES;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_PROFILES;
    }
  },

  saveProfiles(profiles: MatrimonialProfile[]): void {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  },

  addProfile(profile: MatrimonialProfile): void {
    const list = this.getProfiles();
    list.unshift(profile);
    this.saveProfiles(list);
  },

  updateProfile(profile: MatrimonialProfile): void {
    const list = this.getProfiles();
    const index = list.findIndex((p) => p.id === profile.id);
    if (index !== -1) {
      list[index] = profile;
      this.saveProfiles(list);
    }
  },

  deleteProfile(id: string): void {
    const list = this.getProfiles().filter((p) => p.id !== id);
    this.saveProfiles(list);
  },

  // Packages
  getPackages(): MembershipPackage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PACKAGES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(DEFAULT_PACKAGES));
        return DEFAULT_PACKAGES;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_PACKAGES;
    }
  },

  savePackages(packages: MembershipPackage[]): void {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  },

  addPackage(pkg: MembershipPackage): void {
    const list = this.getPackages();
    list.push(pkg);
    this.savePackages(list);
  },

  updatePackage(pkg: MembershipPackage): void {
    const list = this.getPackages();
    const index = list.findIndex((p) => p.id === pkg.id);
    if (index !== -1) {
      list[index] = pkg;
      this.savePackages(list);
    }
  },

  deletePackage(id: string): void {
    const list = this.getPackages().filter((p) => p.id !== id);
    this.savePackages(list);
  },

  // Service Charges
  getCharges(): ServiceChargeItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHARGES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CHARGES, JSON.stringify(DEFAULT_CHARGES));
        return DEFAULT_CHARGES;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_CHARGES;
    }
  },

  saveCharges(charges: ServiceChargeItem[]): void {
    localStorage.setItem(STORAGE_KEYS.CHARGES, JSON.stringify(charges));
  },

  addCharge(charge: ServiceChargeItem): void {
    const list = this.getCharges();
    list.push(charge);
    this.saveCharges(list);
  },

  updateCharge(charge: ServiceChargeItem): void {
    const list = this.getCharges();
    const index = list.findIndex((c) => c.id === charge.id);
    if (index !== -1) {
      list[index] = charge;
      this.saveCharges(list);
    }
  },

  deleteCharge(id: string): void {
    const list = this.getCharges().filter((c) => c.id !== id);
    this.saveCharges(list);
  },

  // Inquiries
  getInquiries(): CustomerInquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
        return DEFAULT_INQUIRIES;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_INQUIRIES;
    }
  },

  saveInquiries(inquiries: CustomerInquiry[]): void {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  },

  addInquiry(inquiry: CustomerInquiry): void {
    const list = this.getInquiries();
    list.unshift(inquiry);
    this.saveInquiries(list);
  },

  updateInquiry(inquiry: CustomerInquiry): void {
    const list = this.getInquiries();
    const index = list.findIndex((i) => i.id === inquiry.id);
    if (index !== -1) {
      list[index] = inquiry;
      this.saveInquiries(list);
    }
  },

  deleteInquiry(id: string): void {
    const list = this.getInquiries().filter((i) => i.id !== id);
    this.saveInquiries(list);
  },

  // Settings
  getSettings(): BureauSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
        return DEFAULT_SETTINGS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: BureauSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Admin Auth Session
  isAdminLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
  },

  setAdminLoggedIn(val: boolean): void {
    if (val) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }
  },

  // Export / Import Full Database Backup
  exportAllDataJSON(): string {
    const payload = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      profiles: this.getProfiles(),
      packages: this.getPackages(),
      charges: this.getCharges(),
      inquiries: this.getInquiries(),
      settings: this.getSettings(),
    };
    return JSON.stringify(payload, null, 2);
  },

  importAllDataJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.profiles) this.saveProfiles(parsed.profiles);
      if (parsed.packages) this.savePackages(parsed.packages);
      if (parsed.charges) this.saveCharges(parsed.charges);
      if (parsed.inquiries) this.saveInquiries(parsed.inquiries);
      if (parsed.settings) this.saveSettings(parsed.settings);
      return true;
    } catch {
      return false;
    }
  },

  resetToDefaultData(): void {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(DEFAULT_PROFILES));
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(DEFAULT_PACKAGES));
    localStorage.setItem(STORAGE_KEYS.CHARGES, JSON.stringify(DEFAULT_CHARGES));
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  },
};
