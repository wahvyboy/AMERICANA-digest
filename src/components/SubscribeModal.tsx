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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-md max-w-xl w-full shadow-2xl flex flex-col overflow-hidden border-t-4 border-[#0E5B44]">
        {/* Top Header */}
        <div className="bg-[#0E5B44] text-white p-4 flex items-center justify-between">
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
            className="p-1 hover:bg-[#083c2d] rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto max-h-[80vh]">
          {!preparedEmail ? (
            <div>
              <div className="text-center mb-5">
                <span className="inline-block bg-emerald-50 text-[#0E5B44] text-xs font-extrabold uppercase px-3 py-1 rounded-full border border-emerald-200 mb-2">
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
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Eleanor Roosevelt"
                    className="w-full border border-gray-300 rounded px-3.5 py-2 text-sm text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Email Address <span className="text-[#E0292B]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded px-3.5 py-2 text-sm text-gray-900 focus:ring-1 focus:ring-[#0E5B44] focus:outline-none"
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
                        className={`flex items-center space-x-2.5 p-2 rounded border cursor-pointer transition-colors ${
                          selectedTopics.includes(topic)
                            ? 'border-[#0E5B44] bg-emerald-50/50 text-[#0E5B44] font-bold'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(topic)}
                          onChange={() => handleTopicToggle(topic)}
                          className="rounded text-[#0E5B44] focus:ring-[#0E5B44]"
                        />
                        <span>{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#F02D5E] hover:bg-[#d92250] text-white font-black text-sm uppercase tracking-wider py-3 px-6 rounded shadow-md transition-transform active:scale-98 flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
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
                  className="bg-[#0E5B44] hover:bg-[#083c2d] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded text-center flex items-center justify-center space-x-1.5 shadow-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open In Default Mail App</span>
                </a>

                <a
                  href={gmailWebUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#F02D5E] hover:bg-[#d92250] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded text-center flex items-center justify-center space-x-1.5 shadow-xs"
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
                    className="text-[#0E5B44] hover:underline font-bold flex items-center space-x-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-gray-700">
                  <p><strong>To:</strong> {preparedEmail.recipient}</p>
                  <p><strong>Subject:</strong> {preparedEmail.subject}</p>
                  <pre className="mt-2 p-2 bg-white rounded border border-gray-200 whitespace-pre-wrap font-sans text-xs">
                    {preparedEmail.body}
                  </pre>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setPreparedEmail(null)}
                  className="text-xs text-gray-500 hover:text-gray-900 underline"
                >
                  ← Edit details
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded"
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
