import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storage.ts';
import {
  MatrimonialProfile,
  MembershipPackage,
  ServiceChargeItem,
  CustomerInquiry,
  BureauSettings,
  Gender,
} from './types/index.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProfilesDirectory } from './components/ProfilesDirectory.tsx';
import { PackagesAndFees } from './components/PackagesAndFees.tsx';
import { AboutAndConsultation } from './components/AboutAndConsultation.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { ProfileModal } from './components/ProfileModal.tsx';
import { RegisterBiodataModal } from './components/RegisterBiodataModal.tsx';
import { AdminLogin } from './components/admin/AdminLogin.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';

export default function App() {
  const [profiles, setProfiles] = useState<MatrimonialProfile[]>([]);
  const [packages, setPackages] = useState<MembershipPackage[]>([]);
  const [charges, setCharges] = useState<ServiceChargeItem[]>([]);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [settings, setSettings] = useState<BureauSettings>(StorageService.getSettings());

  // Views & Modals
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [selectedProfile, setSelectedProfile] = useState<MatrimonialProfile | null>(null);

  // Quick filter passed from Hero search to Proposals Directory
  const [heroFilter, setHeroFilter] = useState<{
    gender?: Gender | 'All';
    caste?: string;
    location?: string;
  } | undefined>(undefined);

  // Refresh all state from localStorage
  const refreshData = () => {
    setProfiles(StorageService.getProfiles());
    setPackages(StorageService.getPackages());
    setCharges(StorageService.getCharges());
    setInquiries(StorageService.getInquiries());
    setSettings(StorageService.getSettings());
    setIsAdminLoggedIn(StorageService.isAdminLoggedIn());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminView(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsLoginModalOpen(false);
    setIsAdminView(true);
  };

  const handleLogout = () => {
    StorageService.setAdminLoggedIn(false);
    setIsAdminLoggedIn(false);
    setIsAdminView(false);
  };

  const handleHeroSearch = (filters: {
    gender?: Gender | 'All';
    caste?: string;
    location?: string;
  }) => {
    setHeroFilter(filters);
    const element = document.getElementById('proposals');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    if (isAdminView) {
      setIsAdminView(false);
    }
    setTimeout(() => {
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  };

  // If in Admin Dashboard view
  if (isAdminView) {
    return (
      <AdminDashboard
        onCloseAdmin={() => setIsAdminView(false)}
        onLogout={handleLogout}
        profiles={profiles}
        packages={packages}
        charges={charges}
        inquiries={inquiries}
        settings={settings}
        onDataChanged={refreshData}
        onViewProfileDetails={(p) => setSelectedProfile(p)}
      />
    );
  }

  // Public Matrimonial Portal View
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar
        settings={settings}
        isAdmin={isAdminLoggedIn}
        onOpenAdmin={handleOpenAdmin}
        onOpenRegister={() => setIsRegisterModalOpen(true)}
        activeSection="hero"
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSearch={handleHeroSearch}
          onOpenRegister={() => setIsRegisterModalOpen(true)}
          onOpenContact={() => handleNavigate('contact')}
          whatsappNumber={settings.whatsappNumber}
        />

        {/* Proposals Directory */}
        <ProfilesDirectory
          profiles={profiles}
          whatsappNumber={settings.whatsappNumber}
          onViewDetails={(p) => setSelectedProfile(p)}
          onOpenRegister={() => setIsRegisterModalOpen(true)}
          initialFilters={heroFilter}
        />

        {/* Membership Packages & Official Charges */}
        <PackagesAndFees
          packages={packages}
          charges={charges}
          whatsappNumber={settings.whatsappNumber}
        />

        {/* About Bureau, Consultation Room & Contact */}
        <AboutAndConsultation
          settings={settings}
          onInquirySubmitted={refreshData}
        />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenAdmin={handleOpenAdmin}
        onNavigate={handleNavigate}
      />

      {/* Floating WhatsApp Contact Button */}
      <FloatingWhatsApp whatsappNumber={settings.whatsappNumber} />

      {/* Modals */}
      <ProfileModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
        whatsappNumber={settings.whatsappNumber}
      />

      <RegisterBiodataModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        whatsappNumber={settings.whatsappNumber}
        onInquirySubmitted={refreshData}
      />

      <AdminLogin
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
