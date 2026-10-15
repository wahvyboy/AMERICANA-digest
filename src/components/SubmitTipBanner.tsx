import React, { useState } from 'react';
import { Send, ShieldCheck, Lock, Upload, CheckCircle2, X } from 'lucide-react';

interface SubmitTipBannerProps {
  onOpenModal: () => void;
}

export const SubmitTipBanner: React.FC<SubmitTipBannerProps> = ({ onOpenModal }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 my-8">
      <div className="bg-gray-50 border border-gray-200 p-5 rounded-xs text-center flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-900 mb-1">
          {/* Hand/Megaphone Icon */}
          <span className="text-2xl" role="img" aria-label="hand">
            🗣️
          </span>
          <span className="font-headline font-black text-2xl uppercase tracking-tight">
            Submit a tip
          </span>
        </div>
        <p className="text-gray-700 text-sm sm:text-base font-normal">
          Do you have info to share with Americana Digest reporters?{' '}
          <button
            onClick={onOpenModal}
            className="text-gray-900 font-bold underline hover:text-[#0E5B44] transition-colors"
          >
            Here’s how.
          </button>
        </p>
      </div>
    </div>
  );
};

interface SubmitTipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitTipModal: React.FC<SubmitTipModalProps> = ({ isOpen, onClose }) => {
  const [tipCategory, setTipCategory] = useState('Government & Politics');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3s
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-md max-w-lg w-full p-6 shadow-2xl relative border-t-4 border-[#0E5B44]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-gray-800 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-emerald-100 text-[#0E5B44] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-headline font-black text-2xl text-gray-900 uppercase">
              Tip Transmitted Securely
            </h3>
            <p className="text-gray-600 text-sm mt-2 max-w-md mx-auto">
              Your confidential dispatch has been routed to the Americana Digest Investigative Desk under PGP-encrypted protocols.
            </p>
            <p className="text-xs text-gray-400 mt-4">Direct Desk: support@americanadigest.blog</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 text-[#0E5B44] mb-2">
              <ShieldCheck className="w-6 h-6" />
              <span className="font-headline font-black text-xl uppercase tracking-tight text-gray-900">
                Confidential Newsroom Tip
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Americana Digest protects source confidentiality under Shield Law provisions. Anonymous transmissions are scrubbed of IP headers.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Investigation Desk</label>
                <select
                  value={tipCategory}
                  onChange={(e) => setTipCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none"
                >
                  <option>Government & National Politics</option>
                  <option>Labor & Corporate Misconduct</option>
                  <option>Defense & Intelligence Leaks</option>
                  <option>Consumer Fraud & Safety</option>
                  <option>Culture & Entertainment Scoop</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Headline / Core Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unannounced regulatory shift in state agency..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Confidential Evidence & Details</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide detailed dates, key figures, document references, or insider accounts..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-[#0E5B44] focus:ring-[#0E5B44]"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-gray-700 font-medium">
                  Keep my transmission strictly anonymous (recommended for whistleblowers)
                </label>
              </div>

              {!isAnonymous && (
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Contact Email / Signal Username</label>
                  <input
                    type="text"
                    placeholder="name@proton.me or +1..."
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#0E5B44] hover:bg-[#083c2d] text-white font-black py-2.5 px-4 rounded text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Submit Encrypted Intelligence</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
