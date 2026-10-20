import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, X, Mail, Copy, Check } from 'lucide-react';

interface SubmitTipBannerProps {
  onOpenModal: () => void;
}

export const SubmitTipBanner: React.FC<SubmitTipBannerProps> = ({ onOpenModal }) => {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 my-8">
      <div className="bg-gray-50 border border-gray-200 p-5 rounded-xs text-center flex flex-col items-center justify-center shadow-xs">
        <div className="flex items-center space-x-2 text-gray-900 mb-1">
          <span className="text-2xl" role="img" aria-label="megaphone">
            🗣️
          </span>
          <span className="font-headline font-black text-2xl uppercase tracking-tight">
            Submit a tip
          </span>
        </div>
        <p className="text-gray-700 text-sm sm:text-base font-normal">
          Do you have confidential intelligence to share with Americana Digest reporters?{' '}
          <button
            onClick={onOpenModal}
            className="text-gray-900 font-bold underline hover:text-[#0E5B44] transition-colors touch-target-44 inline-flex items-center"
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
  const [tipCategory, setTipCategory] = useState('Government & National Politics');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const mailBody = [
    `Americana Digest Confidential Tip Transmission`,
    `Desk: ${tipCategory}`,
    `Anonymous: ${isAnonymous ? 'YES' : 'NO'}`,
    `Contact: ${isAnonymous ? 'Omitted by source' : contactEmail}`,
    ``,
    `--- TIP DETAILS ---`,
    details,
    ``,
    `Transmission Date: ${new Date().toISOString()}`
  ].join('\n');

  const mailtoUrl = `mailto:support@americanadigest.blog?subject=${encodeURIComponent(`[NEWSROOM TIP] ${subject}`)}&body=${encodeURIComponent(mailBody)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.warn('Mailto error:', err);
    }
    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-md max-w-lg w-full p-5 sm:p-6 shadow-2xl relative border-t-4 border-[#0E5B44] max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="touch-target-44 absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800 rounded-full"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 text-[#0E5B44] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-headline font-black text-2xl text-gray-900 uppercase">
              Tip Transmission Prepared
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
              Your email client was opened with your pre-formatted tip addressed directly to <span className="font-bold text-[#0E5B44]">support@americanadigest.blog</span>.
            </p>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-center gap-2">
              <button
                onClick={handleCopy}
                className="touch-target-44 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold uppercase py-2.5 px-4 rounded flex items-center justify-center space-x-1"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Details' : 'Copy Tip Text'}</span>
              </button>
              <button
                onClick={onClose}
                className="touch-target-44 bg-[#0E5B44] hover:bg-[#083c2d] text-white text-xs font-bold uppercase py-2.5 px-6 rounded"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 text-[#0E5B44] mb-2">
              <ShieldCheck className="w-6 h-6 shrink-0" />
              <span className="font-headline font-black text-xl uppercase tracking-tight text-gray-900">
                Confidential Newsroom Tip
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Americana Digest protects source confidentiality under Shield Law provisions. Tips are received directly at <strong className="text-gray-800">support@americanadigest.blog</strong>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Investigation Desk</label>
                <select
                  value={tipCategory}
                  onChange={(e) => setTipCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-base sm:text-sm text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none min-h-[44px]"
                >
                  <option>Government & National Politics</option>
                  <option>Labor & Corporate Misconduct</option>
                  <option>Defense & Intelligence</option>
                  <option>Consumer Protection & Safety</option>
                  <option>Tech & Cyber Investigations</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Headline / Core Topic</label>
                <input
                  type="text"
                  inputMode="text"
                  required
                  placeholder="e.g. Unannounced regulatory shift in federal agency..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-base sm:text-sm text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none min-h-[44px]"
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
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-base sm:text-sm text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0E5B44] focus:ring-[#0E5B44]"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-gray-700 font-medium cursor-pointer">
                  Submit anonymously (omit personal identity)
                </label>
              </div>

              {!isAnonymous && (
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Confidential Callback Email</label>
                  <input
                    type="email"
                    inputMode="email"
                    placeholder="source@protonmail.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-base sm:text-sm text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none min-h-[44px]"
                  />
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0E5B44] hover:bg-[#083c2d] text-white font-black text-sm uppercase tracking-wider py-3.5 px-4 rounded shadow-md transition-transform active:scale-98 flex items-center justify-center space-x-2 min-h-[48px]"
                >
                  <Mail className="w-5 h-5" />
                  <span>Transmit Tip via Secure Email</span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-gray-400 text-center">
                <Lock className="w-3.5 h-3.5" />
                <span>Protected by federal journalist-source privilege</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
