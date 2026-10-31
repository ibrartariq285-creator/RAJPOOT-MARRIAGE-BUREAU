import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { MembershipPackage } from '../../types/index.ts';

interface PackageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pkg: MembershipPackage) => void;
  initialPackage?: MembershipPackage | null;
}

export const PackageEditorModal: React.FC<PackageEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPackage,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [pricePKR, setPricePKR] = useState('PKR 25,000');
  const [priceOverseas, setPriceOverseas] = useState('$150');
  const [duration, setDuration] = useState('6 Months');
  const [popular, setPopular] = useState(false);
  const [recommendedFor, setRecommendedFor] = useState('');
  const [featuresText, setFeaturesText] = useState('');

  useEffect(() => {
    if (initialPackage) {
      setTitle(initialPackage.title);
      setSubtitle(initialPackage.subtitle);
      setPricePKR(initialPackage.pricePKR);
      setPriceOverseas(initialPackage.priceOverseas || '');
      setDuration(initialPackage.duration);
      setPopular(initialPackage.popular);
      setRecommendedFor(initialPackage.recommendedFor);
      setFeaturesText(initialPackage.features.join('\n'));
    } else {
      setTitle('');
      setSubtitle('');
      setPricePKR('PKR 25,000');
      setPriceOverseas('$150');
      setDuration('6 Months');
      setPopular(false);
      setRecommendedFor('');
      setFeaturesText(
        'Verified matching proposals\nPersonal coordinator assistance\nBackground check verification\nDirect office meetings coordination'
      );
    }
  }, [initialPackage, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const featuresList = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updated: MembershipPackage = {
      id: initialPackage?.id || `pkg-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      pricePKR: pricePKR.trim(),
      priceOverseas: priceOverseas.trim() || undefined,
      duration: duration.trim(),
      popular,
      recommendedFor: recommendedFor.trim(),
      features: featuresList,
    };

    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl p-5 sm:p-6 text-neutral-100">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
          <h2 className="font-serif-title text-lg font-bold text-white">
            {initialPackage ? 'Edit Membership Package' : 'Create New Membership Package'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-neutral-300 font-medium mb-1">Package Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Executive Gold Match"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-medium mb-1">Subtitle / Summary</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Tailored for educated professionals and noble families"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Fee (PKR) *</label>
              <input
                type="text"
                required
                value={pricePKR}
                onChange={(e) => setPricePKR(e.target.value)}
                placeholder="e.g. PKR 35,000"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Fee (Overseas / Foreign)</label>
              <input
                type="text"
                value={priceOverseas}
                onChange={(e) => setPriceOverseas(e.target.value)}
                placeholder="e.g. £250 / $300"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Service Duration *</label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6 Months / Until Nikkah"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="popularBadge"
                checked={popular}
                onChange={(e) => setPopular(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded bg-neutral-950 border-neutral-700"
              />
              <label htmlFor="popularBadge" className="text-neutral-200 font-medium">
                Mark as "Most Popular"
              </label>
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-medium mb-1">Recommended For</label>
            <input
              type="text"
              value={recommendedFor}
              onChange={(e) => setRecommendedFor(e.target.value)}
              placeholder="e.g. Doctors, Engineers, Civil Officers, Overseas candidates"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-medium mb-1">
              Included Features (One feature per line) *
            </label>
            <textarea
              rows={5}
              required
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Enter each feature on a separate line..."
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-neutral-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-neutral-700 text-neutral-300 hover:bg-neutral-800 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Save Package</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
