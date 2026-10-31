import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { ServiceChargeItem } from '../../types/index.ts';

interface ChargeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (charge: ServiceChargeItem) => void;
  initialCharge?: ServiceChargeItem | null;
}

export const ChargeEditorModal: React.FC<ChargeEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialCharge,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceChargeItem['category']>('Registration');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [urduNote, setUrduNote] = useState('');
  const [terms, setTerms] = useState('');

  useEffect(() => {
    if (initialCharge) {
      setTitle(initialCharge.title);
      setCategory(initialCharge.category);
      setAmount(initialCharge.amount);
      setDescription(initialCharge.description);
      setUrduNote(initialCharge.urduNote || '');
      setTerms(initialCharge.terms);
    } else {
      setTitle('');
      setCategory('Registration');
      setAmount('PKR 5,000');
      setDescription('');
      setUrduNote('');
      setTerms('Payable prior to service initiation.');
    }
  }, [initialCharge, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: ServiceChargeItem = {
      id: initialCharge?.id || `chg-${Date.now()}`,
      title: title.trim(),
      category,
      amount: amount.trim(),
      description: description.trim(),
      urduNote: urduNote.trim() || undefined,
      terms: terms.trim(),
    };

    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl p-5 sm:p-6 text-neutral-100">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
          <h2 className="font-serif-title text-lg font-bold text-white">
            {initialCharge ? 'Edit Service Charge' : 'Add New Service Charge Policy'}
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
            <label className="block text-neutral-300 font-medium mb-1">Service Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Biodata Verification & Registration"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 font-medium mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceChargeItem['category'])}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
              >
                <option value="Registration">Registration</option>
                <option value="Matchmaking">Matchmaking</option>
                <option value="Success Fee">Success Fee (شکرانہ)</option>
                <option value="VIP Consultation">VIP Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Amount / Fee *</label>
              <input
                type="text"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. PKR 5,000 / Mutually Agreed"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-medium mb-1">Description (English) *</label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what is included in this charge..."
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-neutral-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-medium mb-1">Urdu Explanation (اردو وضاحت)</label>
            <input
              type="text"
              value={urduNote}
              onChange={(e) => setUrduNote(e.target.value)}
              placeholder="اردو میں تفصیل درج کریں..."
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 font-urdu text-right focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-medium mb-1">Applicable Terms & Conditions</label>
            <input
              type="text"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder="e.g. Non-refundable once processed / Payable upon Nikkah"
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-amber-400"
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
              <span>Save Service Charge</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
