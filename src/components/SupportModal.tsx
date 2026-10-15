import React, { useState } from 'react';
import { X, Heart, Shield, Check, Star, Sparkles } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState<number>(10);
  const [isAnnual, setIsAnnual] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const tiers = [
    { amount: 5, label: 'Reader Supporter', perk: 'Ad-lite reading & breaking alerts' },
    { amount: 10, label: 'Journalism Patron', perk: 'Full archive access + morning brief', popular: true },
    { amount: 25, label: 'Investigative Circle', perk: 'Direct reporter Q&As & briefings' },
    { amount: 50, label: 'Americana Fellow', perk: 'Print editions & VIP recognition' }
  ];

  const handleContribute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-md max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border-t-4 border-[#F02D5E]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-gray-800 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-pink-100 text-[#F02D5E] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h3 className="font-headline font-black text-2xl text-gray-900 uppercase">
              Thank You For Safeguarding Our Press!
            </h3>
            <p className="text-gray-600 text-sm mt-2 max-w-sm mx-auto">
              Your contribution fuels uncompromised, independent investigative journalism at Americana Digest.
            </p>
            <p className="text-xs text-emerald-700 font-bold mt-4">
              Receipt & credentials transmitted from support@americanadigest.blog
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="inline-flex items-center space-x-1 text-xs font-black uppercase tracking-wider text-[#F02D5E] bg-pink-50 px-3 py-1 rounded-full border border-pink-200 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Americana Freedom Fund</span>
              </span>
              <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase text-gray-900 tracking-tight">
                Keep Our Press Truly Free
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto">
                No corporate billionaire owners. No paywalls locking out essential truth. Just unvarnished, high-velocity investigative reporting powered by readers like you.
              </p>
            </div>

            {/* Frequency Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-1 rounded-full flex text-xs font-bold uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setIsAnnual(false)}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    !isAnnual ? 'bg-[#0E5B44] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly Contribution
                </button>
                <button
                  type="button"
                  onClick={() => setIsAnnual(true)}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    isAnnual ? 'bg-[#0E5B44] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Annual (Save 20%)
                </button>
              </div>
            </div>

            {/* Tier Selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {tiers.map((tier) => {
                const amount = isAnnual ? tier.amount * 10 : tier.amount;
                const isSelected = selectedTier === tier.amount;
                return (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier.amount);
                      setCustomAmount('');
                    }}
                    className={`relative p-3.5 rounded-xs text-left border-2 transition-all ${
                      isSelected
                        ? 'border-[#F02D5E] bg-pink-50/40 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 right-2 bg-[#F02D5E] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    )}
                    <div className="font-headline font-black text-2xl text-gray-900">
                      ${amount}
                      <span className="text-xs font-normal text-gray-500">
                        {isAnnual ? '/yr' : '/mo'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-gray-800 mt-0.5">{tier.label}</div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-tight">{tier.perk}</div>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleContribute} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Or Enter Custom Amount ($)
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 75"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    if (e.target.value) setSelectedTier(0);
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#F02D5E] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>256-bit bank-grade encryption. Cancel anytime with 1-click.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F02D5E] hover:bg-[#d92250] text-white font-black text-sm uppercase tracking-wider py-3.5 px-6 rounded shadow-md transition-transform active:scale-98"
              >
                CONTRIBUTE ${customAmount || (isAnnual ? selectedTier * 10 : selectedTier)} {isAnnual ? 'YEARLY' : 'MONTHLY'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
