import React, { useState } from 'react';
import { X, Mail, CheckCircle2, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { buildSubscribeMailto } from '../services/subscriberService';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Breaking News',
    'Politics',
    'Shopping & Deals'
  ]);
  const [preparedEmail, setPreparedEmail] = useState<{
    mailtoUrl: string;
    subject: string;
    body: string;
    recipient: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const topicsList = [
    'Breaking News',
    'Politics',
    'Life & Culture',
    'Shopping & Deals',
    'Business & Tech'
  ];

  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleGenerateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    const emailData = buildSubscribeMailto({
      email: emailInput,
      name: nameInput,
      topics: selectedTopics
    });

    setPreparedEmail(emailData);

    // Automatically trigger user's local email client
    try {
      window.location.href = emailData.mailtoUrl;
    } catch (err) {
      console.warn('Could not auto-launch mailto client:', err);
    }
  };

  const handleCopyBody = () => {
    if (!preparedEmail) return;
    navigator.clipboard.writeText(preparedEmail.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const gmailWebUrl = preparedEmail
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(preparedEmail.recipient)}&su=${encodeURIComponent(preparedEmail.subject)}&body=${encodeURIComponent(preparedEmail.body)}`
    : '#';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-md max-w-xl w-full shadow-2xl flex flex-col overflow-hidden border-t-4 border-[#0E5B44] max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-[#0E5B44] text-white p-3.5 sm:p-4 flex items-center justify-between pt-safe">
          <div className="flex items-center space-x-2.5">
            <Mail className="w-5 h-5 text-emerald-200" />
            <div>
              <h2 className="font-headline font-black text-lg sm:text-xl uppercase tracking-tight leading-none">
                Subscribe to Americana Digest
              </h2>
              <p className="text-[11px] text-emerald-200 font-mono mt-0.5">
                Official Desk: support@americanadigest.blog
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="touch-target-44 p-2 hover:bg-[#083c2d] rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto">
          {!preparedEmail ? (
            <div>
              <div className="text-center mb-5">
                <span className="inline-block bg-emerald-50 text-[#0E5B44] text-xs font-black uppercase px-3 py-1 rounded-full border border-emerald-200 mb-2">
                  Direct Email Dispatch
                </span>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                  Join thousands of informed readers receiving our morning intelligence brief and breaking alerts. Entering your email prepares a templated message to our team so you can confirm with one click.
                </p>
              </div>

              <form onSubmit={handleGenerateTemplate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    inputMode="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Eleanor Roosevelt"
                    className="w-full border border-gray-300 rounded px-3.5 py-2.5 text-base sm:text-sm text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Email Address <span className="text-[#E0292B]">*</span>
                  </label>
                  <input
                    type="email"
                    inputMode="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded px-3.5 py-2.5 text-base sm:text-sm text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Select Your Desks of Interest
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {topicsList.map((topic) => (
                      <label
                        key={topic}
                        className={`flex items-center space-x-2.5 p-3 rounded border cursor-pointer transition-colors min-h-[44px] ${
                          selectedTopics.includes(topic)
                            ? 'border-[#0E5B44] bg-emerald-50/50 text-[#0E5B44] font-bold'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(topic)}
                          onChange={() => handleTopicToggle(topic)}
                          className="w-4 h-4 rounded text-[#0E5B44] focus:ring-[#0E5B44]"
                        />
                        <span className="text-xs sm:text-sm">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#F02D5E] hover:bg-[#d92250] text-white font-black text-sm uppercase tracking-wider py-3.5 px-6 rounded shadow-md transition-transform active:scale-98 flex items-center justify-center space-x-2 min-h-[48px]"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Generate & Send Subscriber Email</span>
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-1.5 text-[11px] text-gray-500 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>No spam ever. Unsubscribe at any time with one click.</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded text-center">
                <div className="w-10 h-10 bg-emerald-100 text-[#0E5B44] rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-black text-lg text-gray-900 uppercase">
                  Templated Message Generated!
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Your email client should have opened automatically with the templated message pre-filled. If it did not, send it using one of the instant buttons below:
                </p>
              </div>

              {/* Ready Mailto & Webmail buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={preparedEmail.mailtoUrl}
                  className="bg-[#0E5B44] hover:bg-[#083c2d] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded text-center flex items-center justify-center space-x-1.5 shadow-xs min-h-[48px] active:scale-95 transition-transform"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open In Default Mail App</span>
                </a>

                <a
                  href={gmailWebUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#F02D5E] hover:bg-[#d92250] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded text-center flex items-center justify-center space-x-1.5 shadow-xs min-h-[48px] active:scale-95 transition-transform"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open In Gmail Web</span>
                </a>
              </div>

              {/* Templated Preview */}
              <div className="border border-gray-200 rounded p-3 bg-gray-50 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
                  <span className="font-bold text-gray-700">Pre-Formed Email Content</span>
                  <button
                    onClick={handleCopyBody}
                    className="touch-target-44 text-xs font-bold text-[#0E5B44] hover:text-[#083c2d] flex items-center space-x-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-[11px] text-gray-500 font-mono mb-1">
                  <strong>To:</strong> {preparedEmail.recipient}
                </div>
                <div className="text-[11px] text-gray-500 font-mono mb-2">
                  <strong>Subject:</strong> {preparedEmail.subject}
                </div>
                <pre className="text-gray-700 font-mono text-[11px] whitespace-pre-wrap bg-white p-2 rounded border border-gray-200 max-h-36 overflow-y-auto">
                  {preparedEmail.body}
                </pre>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setPreparedEmail(null)}
                  className="text-xs text-gray-500 hover:text-gray-800 underline touch-target-44"
                >
                  ← Edit subscription options
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold uppercase py-2 px-5 rounded touch-target-44"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
