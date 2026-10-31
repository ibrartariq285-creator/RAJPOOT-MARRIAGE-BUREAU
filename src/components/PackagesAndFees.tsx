import React from 'react';
import { Check, Star, Shield, HelpCircle, MessageCircle, FileText } from 'lucide-react';
import { MembershipPackage, ServiceChargeItem } from '../types/index.ts';

interface PackagesAndFeesProps {
  packages: MembershipPackage[];
  charges: ServiceChargeItem[];
  whatsappNumber: string;
}

export const PackagesAndFees: React.FC<PackagesAndFeesProps> = ({
  packages,
  charges,
  whatsappNumber,
}) => {
  const handleSelectPackage = (pkg: MembershipPackage) => {
    const text = encodeURIComponent(
      `Assalam o Alaikum, I am interested in enrolling in the ${pkg.title} (${pkg.pricePKR}) at Rajpoot Marriage Bureau Chakwal. Please guide me on registration.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="packages" className="py-20 bg-neutral-900/50 px-4 sm:px-6 lg:px-8 border-t border-amber-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="font-urdu text-amber-400 text-2xl mb-1">
            پیکجز اور سروس چارجز
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100">
            Membership Packages & Service Plans
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto my-3 rounded-full" />
          <p className="text-neutral-400 text-sm">
            Transparent pricing, dignified matchmaking, and ethical service. Choose a plan tailored to your family's preferences.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-neutral-900 border-2 border-amber-500 shadow-xl shadow-amber-950/40 lg:-translate-y-2'
                  : 'bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/40'
              } p-6`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-neutral-950 text-[11px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-neutral-950" />
                  Most Popular
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="font-serif-title text-lg font-bold text-neutral-100">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    {pkg.subtitle}
                  </p>
                </div>

                {/* Price Display */}
                <div className="py-4 border-y border-neutral-800 my-4">
                  <div className="font-serif-title text-2xl sm:text-3xl font-extrabold text-amber-300 tabular-nums">
                    {pkg.pricePKR}
                  </div>
                  {pkg.priceOverseas && (
                    <div className="text-xs text-emerald-400 font-medium mt-0.5">
                      Overseas: {pkg.priceOverseas}
                    </div>
                  )}
                  <div className="text-[11px] text-neutral-400 mt-1">
                    Duration: <span className="text-neutral-200 font-medium">{pkg.duration}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2.5 mb-6 text-xs text-neutral-300">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPackage(pkg)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md shadow-amber-950/40'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enroll in {pkg.title.split(' ')[0]}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Detailed Service Charges & Policies Table */}
        <div className="bg-neutral-950 rounded-2xl border border-amber-900/40 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-800">
            <div>
              <div className="font-urdu text-amber-400 text-xl font-bold mb-1">
                شفاف سروس چارجز اور پالیسی
              </div>
              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-white">
                Official Bureau Service Charges & Shukrana Policy
              </h3>
            </div>
            <div className="text-xs text-neutral-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Registered Matrimonial Office · Chakwal</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Service Category</th>
                  <th className="py-3 px-4">Fee / Amount</th>
                  <th className="py-3 px-4">Details & Urdu Description</th>
                  <th className="py-3 px-4">Applicable Terms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {charges.map((chg) => (
                  <tr key={chg.id} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-neutral-100 whitespace-nowrap align-top">
                      <div>{chg.title}</div>
                      <span className="text-[11px] text-amber-400/90 font-normal">
                        {chg.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-amber-300 whitespace-nowrap align-top">
                      {chg.amount}
                    </td>
                    <td className="py-4 px-4 text-neutral-300 max-w-md align-top">
                      <div>{chg.description}</div>
                      {chg.urduNote && (
                        <div className="font-urdu text-amber-200/80 text-xs mt-1">
                          {chg.urduNote}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-neutral-400 text-xs max-w-xs align-top">
                      {chg.terms}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sharia & Dignity Trust Note */}
          <div className="mt-6 p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-neutral-300 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Important Ethical Note:</strong> Rajpoot Marriage Bureau operates with genuine Islamic and cultural values. We do not participate in any hidden charges or unauthorized sharing of family biodatas. All terms are agreed upon in writing or telephonically prior to scheduling family introductions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
