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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-md max-w-lg w-full p-5 sm:p-8 shadow-2xl relative border-t-4 border-[#F02D5E] max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="touch-target-44 absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800 rounded-full"
          aria-label="Close support modal"
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
              <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase text-gray-900 tracking-tight">
                Keep Our Press Truly Free
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
                No corporate billionaire owners. No paywalls locking out essential truth. Just unvarnished, high-velocity investigative reporting powered by readers like you.
              </p>
            </div>

            {/* Frequency Toggle */}
            <div className="flex justify-center mb-5">
              <div className="bg-gray-100 p-1 rounded-full flex text-xs font-bold uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setIsAnnual(false)}
                  className={`touch-target-44 px-4 py-2 rounded-full transition-all ${
                    !isAnnual ? 'bg-[#0E5B44] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setIsAnnual(true)}
                  className={`touch-target-44 px-4 py-2 rounded-full transition-all ${
                    isAnnual ? 'bg-[#0E5B44] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Annual (-20%)
                </button>
              </div>
            </div>

            {/* Tier Selector with 44px min touch height */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
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
                    className={`p-3 rounded border text-left transition-all min-h-[64px] ${
                      isSelected
                        ? 'border-[#F02D5E] bg-pink-50/50 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-headline font-black text-xl text-gray-900">
                        ${amount}
                        <span className="text-xs font-normal text-gray-500">
                          {isAnnual ? '/yr' : '/mo'}
                        </span>
                      </span>
                      {tier.popular && (
                        <span className="text-[9px] font-black uppercase text-[#F02D5E] bg-pink-100 px-1.5 py-0.5 rounded">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-bold text-gray-800 mt-0.5">{tier.label}</div>
                    <div className="text-[10px] text-gray-500 mt-1 line-clamp-1">{tier.perk}</div>
                  </button>
                );
              })}
            </div>

            {/* Custom Amount with inputMode="numeric" */}
            <form onSubmit={handleContribute} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Or Enter Custom Monthly Amount ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 font-bold">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Other Amount"
                    value={customAmount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setCustomAmount(val);
                      if (val) setSelectedTier(0);
                    }}
                    className="w-full border border-gray-300 rounded pl-7 pr-3 py-2.5 text-base sm:text-sm text-gray-900 focus:ring-1 focus:ring-[#F02D5E] focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F02D5E] hover:bg-[#d92250] text-white font-black text-sm uppercase tracking-wider py-3.5 px-6 rounded shadow-md transition-transform active:scale-98 flex items-center justify-center space-x-2 min-h-[48px]"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>
                  Confirm Contribution of $
                  {customAmount ? customAmount : isAnnual ? selectedTier * 10 : selectedTier}
                  {isAnnual ? '/year' : '/month'}
                </span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-500 text-center pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-700" />
                <span>256-bit encrypted • Cancel anytime via support@americanadigest.blog</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
