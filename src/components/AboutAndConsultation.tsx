import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Send,
  Heart,
  Globe,
  Users,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { BureauSettings, CustomerInquiry } from '../types/index.ts';
import { StorageService } from '../services/storage.ts';

interface AboutAndConsultationProps {
  settings: BureauSettings;
  onInquirySubmitted?: () => void;
}

export const AboutAndConsultation: React.FC<AboutAndConsultationProps> = ({
  settings,
  onInquirySubmitted,
}) => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLookingFor, setFormLookingFor] = useState('Rishta for Boy');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Record inquiry in local storage for admin management
    const inquiryId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: CustomerInquiry = {
      id: inquiryId,
      name: formName,
      phone: formPhone,
      seekingFor: formLookingFor.includes('Boy')
        ? 'Bride'
        : formLookingFor.includes('Girl')
        ? 'Groom'
        : 'General Consultation',
      message: `Looking for: ${formLookingFor}. Message: ${formMessage}`,
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0],
      adminNotes: 'Direct contact form inquiry.',
    };
    StorageService.addInquiry(newInquiry);
    if (onInquirySubmitted) onInquirySubmitted();
    setIsSent(true);

    // 2. Open WhatsApp pre-populated with message as per original website feature
    const whatsappText =
      'Assalam o Alaikum,%0A' +
      'Name: ' +
      encodeURIComponent(formName) +
      '%0A' +
      'Phone: ' +
      encodeURIComponent(formPhone) +
      '%0A' +
      'Looking for: ' +
      encodeURIComponent(formLookingFor) +
      '%0A' +
      'Message: ' +
      encodeURIComponent(formMessage);

    window.open(`https://wa.me/${settings.whatsappNumber}?text=${whatsappText}`, '_blank');
  };

  const services = [
    {
      icon: '💍',
      title: 'Marriage Proposals',
      urdu: 'معیاری رشتے',
      desc: "Suitable rishta proposals for boys and girls, matched to your family's status and cultural expectations.",
    },
    {
      icon: '🌍',
      title: 'Overseas Proposals',
      urdu: 'بیرونِ ملک رشتے',
      desc: 'Dedicated network for UK, USA, Canada, UAE, Saudi Arabia, and Europe with immigration and credential verification.',
    },
    {
      icon: '🤝',
      title: 'All Sects & Castes',
      urdu: 'تمام برادریاں و مسالک',
      desc: 'Proposals for every maslak, zaat, and qaum (Rajpoot, Chaudhry, Syed, Awan, Jatt, Sheikh, etc.) with deepest respect.',
    },
    {
      icon: '📋',
      title: 'Biodata Registration',
      urdu: 'بائیو ڈیٹا اندراج',
      desc: 'Register your family biodata with complete privacy controls, photo security, and background validation.',
    },
    {
      icon: '👨‍👩‍👧',
      title: 'Family Meetings',
      urdu: 'خاندانی باوقار ملاقاتیں',
      desc: 'Private air-conditioned consultation lounge in Chakwal Main Bazar to facilitate dignified family introductions.',
    },
    {
      icon: '📞',
      title: 'Honest Guidance & Support',
      urdu: 'مخلصانہ رہنمائی',
      desc: 'Continuous advisory from the initial inquiry until engagement and Nikkah finalization with complete sincerity.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-neutral-950 px-4 sm:px-6 lg:px-8 border-t border-amber-900/20">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* About Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="font-urdu text-amber-400 text-2xl mb-1">
            ہمارے بارے میں
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100">
            About Rajpoot Marriage Bureau
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto my-3 rounded-full" />
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Based in Main Bazar, Main City, Pehlwan Rewri, Chakwal. Serving families with trust, respect, and proven matrimonial success.
          </p>
        </div>

        {/* Story & Office Feature Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="border border-amber-500/30 rounded-2xl p-6 sm:p-8 bg-neutral-900/80 shadow-xl space-y-4">
              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-amber-300">
                A Tradition of Honor & Genuine Family Alliances
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Finding a life partner is one of the most sacred and important decisions in any family. At Rajpoot Marriage Bureau Chakwal, we bridge the gap between traditional family values and modern verification standards.
              </p>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Whether you are searching for an educated doctor, software engineer, civil officer, or established business professional in Pakistan or across overseas diaspora, our bureau maintains handpicked, verified files.
              </p>
              <p className="font-urdu text-amber-200/90 text-sm sm:text-base leading-relaxed">
                اگر آپ واقعی رشتہ کرنے میں سنجیدہ ہیں یا رشتے کی وجہ سے پریشان ہیں تو ہم سے رابطہ کریں۔
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wider">
                  TRUST
                </span>
                <span className="px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wider">
                  RESPECT
                </span>
                <span className="px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wider">
                  SUCCESS
                </span>
              </div>
            </div>

            {/* Quick bureau credentials */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <ShieldCheck className="w-5 h-5 text-amber-400 mb-1" />
                <div className="font-bold text-neutral-100 text-sm">Strict Confidentiality</div>
                <div className="text-neutral-400 mt-0.5">Family privacy protected at every step</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <Award className="w-5 h-5 text-amber-400 mb-1" />
                <div className="font-bold text-neutral-100 text-sm">Direct Matchmaker Care</div>
                <div className="text-neutral-400 mt-0.5">Senior bureau guidance & counseling</div>
              </div>
            </div>
          </div>

          {/* Consultation Office Photo */}
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/40 shadow-2xl bg-neutral-950 group">
            <img
              src="/src/assets/images/office_consultation_1793423564398.jpg"
              alt="Rajpoot Marriage Bureau Consultation Office Chakwal"
              referrerPolicy="no-referrer"
              className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 bg-neutral-950/85 backdrop-blur-md p-4 rounded-xl border border-amber-500/30">
              <div className="font-serif-title font-bold text-amber-300 text-sm">
                Chakwal Consultation Lounge
              </div>
              <div className="text-xs text-neutral-300 mt-0.5">
                Main Bazar, Main City, Pehlwan Rewri, Chakwal · Dignified family meetings
              </div>
            </div>
          </div>
        </div>

        {/* 6 Services Grid */}
        <div id="services" className="space-y-8">
          <div className="text-center">
            <div className="font-urdu text-amber-400 text-xl">ہماری خدمات</div>
            <h3 className="font-serif-title text-2xl font-bold text-neutral-100">
              Dedicated Matrimonial Services
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/20 text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-serif-title text-base font-bold text-neutral-100 mb-1">
                  {item.title}
                </h4>
                <div className="font-urdu text-amber-400 text-xs mb-2">{item.urdu}</div>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us Form & Chakwal Office Details */}
        <div id="contact" className="pt-8 border-t border-amber-900/30">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="font-urdu text-amber-400 text-xl">ہم سے رابطہ کریں</div>
            <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-neutral-100">
              Contact & Visit Chakwal Office
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Call us directly or send a message. Your query opens directly in WhatsApp for prompt response.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Office Info Box */}
            <div className="bg-neutral-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="font-serif-title text-xl font-bold text-amber-300">
                  Get In Touch Directly
                </h4>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-xs text-neutral-400">Direct Bureau Phone & WhatsApp:</div>
                    <div className="text-xl sm:text-2xl font-bold text-amber-300 font-mono mt-0.5">
                      {settings.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-xs text-neutral-400">Bureau Office Address:</div>
                    <div className="text-sm font-semibold text-neutral-100 mt-0.5">
                      {settings.addressEnglish}
                    </div>
                    <div className="font-urdu text-amber-300 text-sm mt-1">
                      {settings.addressUrdu}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-xs text-neutral-400">Office Working Hours:</div>
                    <div className="text-xs sm:text-sm text-neutral-200 mt-0.5">
                      {settings.officeHours}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                    'Assalam o Alaikum, I would like to visit your Chakwal office for a rishta proposal.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Contact Form Box */}
            <div className="bg-neutral-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8">
              <h4 className="font-serif-title text-xl font-bold text-amber-300 mb-4">
                Send an Inquiry Message
              </h4>

              {isSent ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Send className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-white text-base">Inquiry Prepared!</h5>
                  <p className="text-xs text-neutral-300">
                    Your inquiry has been stored in our bureau inbox and opened in WhatsApp for instant communication.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="text-xs text-amber-400 hover:text-amber-300 underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03XX-XXXXXXX"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      I am looking for:
                    </label>
                    <select
                      value={formLookingFor}
                      onChange={(e) => setFormLookingFor(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
                    >
                      <option>Rishta for Boy (دولہا کا رشتہ)</option>
                      <option>Rishta for Girl (دلہن کا رشتہ)</option>
                      <option>Overseas Proposal (بیرون ملک رشتہ)</option>
                      <option>General Bureau Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Message / Proposal Details:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Candidate's age, education, caste, city, and preferences..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-neutral-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via WhatsApp & Bureau Inbox</span>
                  </button>

                  <p className="text-[11px] text-neutral-500 text-center">
                    Your inquiry opens directly on WhatsApp connected to Director Rajpoot Bureau.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
