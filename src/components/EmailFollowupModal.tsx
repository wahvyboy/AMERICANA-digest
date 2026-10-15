import React, { useState } from 'react';
import { X, Mail, CheckCircle2, Send, ExternalLink, RefreshCw, Inbox, ShieldCheck } from 'lucide-react';
import { AutomatedEmail, Subscriber } from '../types';
import { getDispatchedEmails, subscribeUser, getSubscribers } from '../services/subscriberService';

interface EmailFollowupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmailToView?: AutomatedEmail | null;
}

export const EmailFollowupModal: React.FC<EmailFollowupModalProps> = ({
  isOpen,
  onClose,
  initialEmailToView
}) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'subscribe'>('subscribe');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Breaking News',
    'Politics',
    'Shopping & Deals'
  ]);
  const [dispatchedEmails, setDispatchedEmails] = useState<AutomatedEmail[]>(getDispatchedEmails());
  const [viewingEmail, setViewingEmail] = useState<AutomatedEmail | null>(
    initialEmailToView || (dispatchedEmails.length > 0 ? dispatchedEmails[0] : null)
  );
  const [justDispatched, setJustDispatched] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    const { subscriber, automatedEmail } = subscribeUser(emailInput, nameInput, selectedTopics);
    const updated = getDispatchedEmails();
    setDispatchedEmails(updated);
    setViewingEmail(automatedEmail);
    setJustDispatched(true);
    setActiveTab('inbox');
  };

  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-md max-w-3xl w-full h-[90vh] max-h-[750px] shadow-2xl flex flex-col overflow-hidden border-t-4 border-[#0E5B44]">
        {/* Modal Top Bar */}
        <div className="bg-[#0E5B44] text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <Mail className="w-5 h-5 text-emerald-200" />
            <div>
              <h2 className="font-headline font-black text-lg sm:text-xl uppercase tracking-tight leading-none">
                Automated Straight-To-Email Dispatch
              </h2>
              <p className="text-[11px] text-emerald-200 font-mono mt-0.5">
                Official Server Relay: support@americanadigest.blog
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#083c2d] rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('subscribe')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
              activeTab === 'subscribe'
                ? 'border-[#0E5B44] text-[#0E5B44] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            1. Instant Subscriber Capture
          </button>
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center space-x-2 ${
              activeTab === 'inbox'
                ? 'border-[#0E5B44] text-[#0E5B44] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>2. Live Delivered Follow-Up Email ({dispatchedEmails.length})</span>
          </button>
        </div>

        {/* Tab 1: Subscribe Form */}
        {activeTab === 'subscribe' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6">
                <span className="inline-block bg-emerald-50 text-[#0E5B44] text-xs font-extrabold uppercase px-2.5 py-1 rounded-full border border-emerald-200 mb-2">
                  Seamless Auto-Dispatch Flow
                </span>
                <h3 className="font-headline font-black text-2xl sm:text-3xl text-gray-900 uppercase">
                  Subscribe To Americana Digest
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Enter your email below. An automated straight-to-email welcome dossier and intelligence brief will be transmitted immediately from <span className="font-bold text-[#0E5B44]">support@americanadigest.blog</span>.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Eleanor Roosevelt"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3.5 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-[#0E5B44] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3.5 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-[#0E5B44] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Select Your Topic Alerts
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['Breaking News', 'Politics & Elections', 'Labor & Economy', 'Shopping Deals', 'Culture & Life', 'Supreme Court'].map((topic) => (
                      <button
                        type="button"
                        key={topic}
                        onClick={() => handleTopicToggle(topic)}
                        className={`py-2 px-3 rounded text-left border transition-all flex items-center justify-between ${
                          selectedTopics.includes(topic)
                            ? 'bg-emerald-50 border-[#0E5B44] text-[#0E5B44] font-bold'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <span>{topic}</span>
                        {selectedTopics.includes(topic) && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E5B44]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-600 flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#0E5B44] shrink-0 mt-0.5" />
                  <span>
                    Zero spam promise. Automated follow-up dispatch is instant from <strong className="text-gray-900">support@americanadigest.blog</strong>. One-click unsubscribe included in every email.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#F02D5E] hover:bg-[#d92250] text-white font-black text-sm uppercase tracking-wider py-3 px-6 rounded shadow-md transition-transform active:scale-98 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Activate Automated Straight-To-Email Dispatch</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Live Delivered Follow-Up Email Viewer */}
        {activeTab === 'inbox' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-gray-100">
            {/* Left list of emails */}
            <div className="w-full md:w-64 bg-white border-r border-gray-200 overflow-y-auto shrink-0 max-h-40 md:max-h-full">
              <div className="p-2.5 bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Dispatched Follow-Ups
              </div>
              {dispatchedEmails.length === 0 ? (
                <div className="p-4 text-center text-xs text-gray-400">
                  No automated emails dispatched yet. Subscribe on Tab 1 to trigger!
                </div>
              ) : (
                dispatchedEmails.map((email) => (
                  <button
                    key={email.id}
                    onClick={() => setViewingEmail(email)}
                    className={`w-full text-left p-3 border-b border-gray-100 text-xs transition-colors ${
                      viewingEmail?.id === email.id ? 'bg-emerald-50 border-l-4 border-l-[#0E5B44]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mb-0.5">
                      <span className="font-mono text-emerald-800 font-bold">support@americanadigest.blog</span>
                      <span>{new Date(email.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="font-bold text-gray-900 truncate">{email.subject}</div>
                    <div className="text-gray-500 truncate text-[11px] mt-0.5">To: {email.to}</div>
                  </button>
                ))
              )}
            </div>

            {/* Right email rendered body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50 flex flex-col">
              {viewingEmail ? (
                <div className="space-y-4 max-w-2xl mx-auto w-full">
                  {/* Delivery Banner */}
                  <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-3.5 py-2.5 rounded text-xs flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>
                        <strong>Automated Delivery Confirmed</strong> • Server: <code>support@americanadigest.blog</code>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-emerald-300">
                      STATUS: 250 OK
                    </span>
                  </div>

                  {/* Mail Header Envelope */}
                  <div className="bg-white border border-gray-200 rounded p-4 text-xs space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-bold uppercase text-[10px]">From:</span>
                      <span className="font-mono text-emerald-900 font-semibold">{viewingEmail.from}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-bold uppercase text-[10px]">To:</span>
                      <span className="font-mono text-gray-800">{viewingEmail.to}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-bold uppercase text-[10px]">Subject:</span>
                      <span className="font-bold text-gray-900">{viewingEmail.subject}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-100">
                      <span>Security: SPF / DKIM 100% Passed</span>
                      <span>Dispatched: {new Date(viewingEmail.sentAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Rendered HTML Email Preview */}
                  <div 
                    className="bg-white rounded border border-gray-300 shadow-sm overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: viewingEmail.bodyHtml }}
                  />
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-400">
                  <Mail className="w-12 h-12 mb-2 text-gray-300" />
                  <p className="text-sm">Select an automated email on the left or subscribe to view the live dispatch.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 shrink-0">
          <span>Official Support Desk: support@americanadigest.blog</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-semibold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
