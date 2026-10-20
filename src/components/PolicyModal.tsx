import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Shield, FileText, CheckCircle2, AlertCircle, Mail, Phone, MapPin, 
  BookOpen, Scale, Lock, HelpCircle, Eye, Printer, Share2, Check, ArrowRight
} from 'lucide-react';
import { PolicySlug } from '../types';

interface PolicyModalProps {
  initialTab: PolicySlug | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: PolicySlug) => void;
}

interface PolicyItem {
  id: PolicySlug;
  title: string;
  category: string;
  updatedAt: string;
  icon: React.ComponentType<{ className?: string }>;
}

const POLICIES: PolicyItem[] = [
  { id: 'about', title: 'About Americana Digest', category: 'About', updatedAt: 'October 2026', icon: BookOpen },
  { id: 'editorial-standards', title: 'Editorial Standards & Fact-Checking', category: 'Standards', updatedAt: 'October 2026', icon: Shield },
  { id: 'corrections', title: 'Corrections & Retractions Policy', category: 'Standards', updatedAt: 'October 2026', icon: CheckCircle2 },
  { id: 'masthead', title: 'Editorial Masthead & Bureau Roster', category: 'About', updatedAt: 'October 2026', icon: FileText },
  { id: 'contact', title: 'Contact Editors & Bureau Directory', category: 'About', updatedAt: 'October 2026', icon: Mail },
  { id: 'user-agreement', title: 'User Agreement & Terms of Service', category: 'Legal', updatedAt: 'October 2026', icon: Scale },
  { id: 'privacy', title: 'Privacy Policy (CCPA / GDPR)', category: 'Legal', updatedAt: 'October 2026', icon: Lock },
  { id: 'comment-policy', title: 'Community Discussion & Comment Rules', category: 'Legal', updatedAt: 'October 2026', icon: HelpCircle },
  { id: 'accessibility', title: 'Accessibility Statement (WCAG 2.2 AA)', category: 'Legal', updatedAt: 'October 2026', icon: Eye },
  { id: 'dmca', title: 'DMCA & Copyright Infringement Notice', category: 'Legal', updatedAt: 'October 2026', icon: AlertCircle },
];

export const PolicyModal: React.FC<PolicyModalProps> = ({
  initialTab,
  isOpen,
  onClose,
  onSelectTab
}) => {
  const [activeTab, setActiveTab] = useState<PolicySlug>(initialTab || 'about');
  const [copiedLink, setCopiedLink] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const currentPolicy = POLICIES.find(p => p.id === activeTab) || POLICIES[0];

  const handleShare = async () => {
    const url = `${window.location.origin}/${activeTab}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-0 sm:p-4 animate-fadeIn">
      {/* Modal Container */}
      <div 
        ref={scrollRef}
        className="bg-white w-full h-full sm:h-[94vh] sm:max-w-5xl sm:rounded-md shadow-2xl flex flex-col overflow-y-auto relative"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 bg-[#0E5B44] text-white px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-md pt-safe">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xs bg-white text-[#0E5B44] flex items-center justify-center font-serif font-black text-xs shrink-0 select-none">
              AD
            </div>
            <div className="min-w-0">
              <span className="font-logo text-xs sm:text-base font-black tracking-tight block truncate">
                AMERICANA DIGEST
              </span>
              <span className="text-[10px] sm:text-xs text-emerald-200 block truncate">
                Official Bureau Governance & Reader Charters
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-1.5 sm:p-2 text-emerald-100 hover:text-white rounded hover:bg-[#083c2d] transition-colors"
              title="Copy Policy Link"
              aria-label="Copy Policy Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex p-1.5 sm:p-2 text-emerald-100 hover:text-white rounded hover:bg-[#083c2d] transition-colors"
              title="Print Policy"
              aria-label="Print Policy"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-white hover:bg-[#083c2d] rounded-md transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Nav Bar on Mobile & Foldable / Sidebar Layout on Tablet & Desktop */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar Tabs (Sticky left on desktop, scrollable top bar on mobile) */}
          <aside className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 shrink-0 overflow-x-auto md:overflow-y-auto">
            <div className="p-3 border-b border-gray-200 hidden md:block">
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-500">
                Official Charters
              </span>
            </div>
            <nav className="flex md:flex-col p-1.5 sm:p-2 gap-1 overflow-x-auto" aria-label="Policy tabs">
              {POLICIES.map((policy) => {
                const Icon = policy.icon;
                const isSelected = activeTab === policy.id;
                return (
                  <button
                    key={policy.id}
                    onClick={() => {
                      setActiveTab(policy.id);
                      onSelectTab(policy.id);
                      if (scrollRef.current) scrollRef.current.scrollTop = 0;
                    }}
                    className={`flex items-center space-x-2 px-3 py-2 text-left rounded text-xs font-bold whitespace-nowrap transition-colors min-h-[36px] ${
                      isSelected 
                        ? 'bg-[#0E5B44] text-white shadow-xs' 
                        : 'text-gray-700 hover:bg-gray-200/80 active:bg-gray-300'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                    <span className="truncate">{policy.title}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Policy Content Reader */}
          <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-white max-w-full">
            <div className="max-w-3xl mx-auto space-y-6 text-gray-800 text-sm sm:text-base leading-relaxed">
              {/* Header Title & Date */}
              <div className="border-b border-gray-200 pb-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0E5B44] bg-emerald-50 px-2 py-0.5 rounded">
                  {currentPolicy.category} • Official Newsroom Document
                </span>
                <h1 className="font-headline font-black text-2xl sm:text-4xl uppercase tracking-tight text-gray-900 mt-2">
                  {currentPolicy.title}
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                  Last Updated & Ratified: {currentPolicy.updatedAt} • Americana Digest Legal & Standards Bureau
                </p>
              </div>

              {/* 1. ABOUT US */}
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <p className="font-semibold text-gray-900 text-base sm:text-lg">
                    Americana Digest is an independent national digital publication dedicated to high-velocity investigative journalism, fearless political reporting, cultural criticism, and verifiable consumer reviews.
                  </p>
                  <p>
                    Founded in response to corporate consolidation across American media, Americana Digest operates with a strict mandate: report verifiable facts without partisan deference, interrogate institutional power, and deliver unfiltered coverage directly to readers.
                  </p>
                  <div className="bg-emerald-50/70 p-4 rounded border-l-4 border-[#0E5B44] space-y-2">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Our Editorial Core Principles</h3>
                    <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                      <li><strong>Primary Source Grounding:</strong> Every claim must be tied to verified public records, court filings, official recordings, or on-the-record testimony.</li>
                      <li><strong>Zero Financial Compromise:</strong> We accept no corporate subsidies, government grants, or special-interest sponsorships that impede reporting independence.</li>
                      <li><strong>Full Public Corrections:</strong> Transparent rectifications are published prominently whenever factual discrepancies are identified.</li>
                    </ul>
                  </div>
                  <h3 className="font-headline font-black text-xl uppercase tracking-tight text-gray-900 pt-2">
                    National Newsroom Bureaus
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <h4 className="font-bold text-xs uppercase text-[#0E5B44]">Washington D.C. Bureau</h4>
                      <p className="text-xs text-gray-600 mt-1">Capitol Hill, DOJ, SCOTUS & Regulatory Agencies.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <h4 className="font-bold text-xs uppercase text-[#0E5B44]">Southern Bureau (Georgia)</h4>
                      <p className="text-xs text-gray-600 mt-1">Brunswick & Atlanta Coastal Desks, Regional Investigations.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <h4 className="font-bold text-xs uppercase text-[#0E5B44]">New York Bureau</h4>
                      <p className="text-xs text-gray-600 mt-1">Financial Markets, Media Wire, & National Culture.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. EDITORIAL STANDARDS */}
              {activeTab === 'editorial-standards' && (
                <div className="space-y-4">
                  <p>
                    Americana Digest adheres to the highest canons of journalism as codified by the Society of Professional Journalists (SPJ) and international investigative wire services.
                  </p>
                  <h3 className="font-bold text-base text-gray-900">Verification Protocol & Sourcing</h3>
                  <p>
                    Reporters must obtain minimum dual independent corroboration for any non-public factual assertion. Anonymous sources are permitted only when revealing documented wrongdoing where public disclosure poses immediate threat of physical harm or professional retaliation.
                  </p>
                  <div className="bg-amber-50 p-4 rounded border-l-4 border-amber-600 text-xs sm:text-sm space-y-2">
                    <h4 className="font-bold text-amber-900">Artificial Intelligence & Synthetic Media Policy</h4>
                    <p className="text-amber-800">
                      Americana Digest strictly prohibits the publication of AI-generated reporting or deepfake audiovisual media presented as authentic journalism. All generative visual demonstrations or synthesized voice overviews are clearly labeled with explicit disclaimers.
                    </p>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 pt-2">Conflict of Interest Safeguards</h3>
                  <p>
                    Editorial staff are prohibited from owning single-stock equity in entities they cover, contributing to political campaigns, or engaging in outside public relations work. All gifts, paid travel, and promotional considerations from story subjects are strictly refused.
                  </p>
                </div>
              )}

              {/* 3. CORRECTIONS POLICY */}
              {activeTab === 'corrections' && (
                <div className="space-y-4">
                  <p>
                    Americana Digest believes that transparency regarding errors strengthens credibility rather than diminishing it. When we publish an error of fact, we correct it promptly and visibly.
                  </p>
                  <h3 className="font-bold text-base text-gray-900">Correction Placement</h3>
                  <p>
                    Substantive corrections are placed at the top or bottom of the relevant article, noting the exact date, time, and nature of the modification. We do not stealth-edit stories to erase mistakes.
                  </p>
                  <h3 className="font-bold text-base text-gray-900 pt-2">How Readers Submit Fact Inquiries</h3>
                  <p>
                    If you believe you have detected an error in our reporting, submit a request with supporting documentation to our Standards Desk at:
                  </p>
                  <div className="p-3 bg-gray-50 rounded border border-gray-200 font-mono text-xs break-all">
                    Email: corrections@americanadigest.blog | Subject: Factual Inquiry - [Article Title / URL]
                  </div>
                  <p className="text-xs text-gray-500">
                    Our Standards Editor reviews all submitted claims within 24 hours of receipt.
                  </p>
                </div>
              )}

              {/* 4. MASTHEAD */}
              {activeTab === 'masthead' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    The leadership and senior reporting staff responsible for editorial integrity across all Americana Digest properties:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <div className="font-bold text-gray-900 text-sm">Elena Rostova</div>
                      <div className="text-xs text-[#0E5B44] font-semibold">Chief Hollywood & National Investigative Correspondent</div>
                      <p className="text-xs text-gray-500 mt-1">Oversees high-velocity breaking dispatches, national entertainment investigations, and regional bureau wires.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <div className="font-bold text-gray-900 text-sm">Dr. Arthur Sterling</div>
                      <div className="text-xs text-[#0E5B44] font-semibold">Executive Editor & Constitutional Desk Director</div>
                      <p className="text-xs text-gray-500 mt-1">Lead analyst covering federal courts, appellate jurisprudence, and executive powers.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <div className="font-bold text-gray-900 text-sm">Sarah Lin, JD</div>
                      <div className="text-xs text-[#0E5B44] font-semibold">Senior Legal & Regulatory Analyst</div>
                      <p className="text-xs text-gray-500 mt-1">Specializes in federal agency regulations, FLSA labor statutes, and antitrust enforcement.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <div className="font-bold text-gray-900 text-sm">Marcus Vance</div>
                      <div className="text-xs text-[#0E5B44] font-semibold">Managing Editor, Technology & Consumer Reviews</div>
                      <p className="text-xs text-gray-500 mt-1">Directs the independent testing lab for consumer hardware, digital privacy tools, and retail deals.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. CONTACT EDITORS */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <p>
                    We welcome direct inquiries from readers, whistleblowers, public officials, and industry representatives.
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded border border-gray-200">
                      <Mail className="w-5 h-5 text-[#0E5B44] shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <strong className="block text-gray-900 text-xs sm:text-sm">General Editorial Bureau & Support</strong>
                        <a href="mailto:support@americanadigest.blog" className="text-xs text-emerald-700 hover:underline break-all">
                          support@americanadigest.blog
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded border border-gray-200">
                      <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <strong className="block text-gray-900 text-xs sm:text-sm">Confidential Whistleblower & Investigative Tips</strong>
                        <p className="text-xs text-gray-600">Send encrypted documents and leaks with end-to-end anonymity:</p>
                        <a href="mailto:tips@americanadigest.blog" className="text-xs text-emerald-700 hover:underline break-all">
                          tips@americanadigest.blog
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded border border-gray-200">
                      <Scale className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <strong className="block text-gray-900 text-xs sm:text-sm">Legal & DMCA Office</strong>
                        <a href="mailto:legal@americanadigest.blog" className="text-xs text-emerald-700 hover:underline break-all">
                          legal@americanadigest.blog
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. USER AGREEMENT */}
              {activeTab === 'user-agreement' && (
                <div className="space-y-4">
                  <p>
                    By accessing Americana Digest (americanadigest.blog), you agree to be bound by this User Agreement and all applicable state and federal laws.
                  </p>
                  <h3 className="font-bold text-base text-gray-900">Intellectual Property & Fair Use</h3>
                  <p>
                    All original articles, reporting, investigative data models, photographs, and editorial graphics are the exclusive property of Americana Digest Media, Inc. You are granted a limited, non-exclusive license for personal, non-commercial reading and sharing with proper attribution.
                  </p>
                  <h3 className="font-bold text-base text-gray-900 pt-2">Prohibited Actions</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-700">
                    <li>Unauthorized automated scraping of article databases for LLM training without licensing agreement.</li>
                    <li>Circumventing paywalls, access control tokens, or API rate limiters.</li>
                    <li>Impersonating editorial correspondents or publishing fabricated dispatches under our trademark.</li>
                  </ul>
                  <h3 className="font-bold text-base text-gray-900 pt-2">Arbitration & Choice of Law</h3>
                  <p>
                    Any disputes arising out of this agreement shall be resolved through binding confidential arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules.
                  </p>
                </div>
              )}

              {/* 7. PRIVACY POLICY */}
              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <p>
                    Americana Digest respects your privacy. We are fully compliant with the California Consumer Privacy Act (CCPA), the California Privacy Rights Act (CPRA), and the European General Data Protection Regulation (GDPR).
                  </p>
                  <div className="bg-emerald-50 p-4 rounded border-l-4 border-[#0E5B44] text-xs sm:text-sm space-y-1 font-semibold text-emerald-900">
                    ✓ We do NOT sell, lease, or monetize your personal identifying data to third-party data brokers.<br />
                    ✓ We do NOT inject invasive cross-site tracking pixels or fingerprinting scripts.
                  </div>
                  <h3 className="font-bold text-base text-gray-900 pt-2">Information We Collect</h3>
                  <p>
                    When you voluntarily subscribe to our dispatch, we store your email address using salted hashing and TLS 1.3 encryption. Basic aggregated metrics (such as page view counts) are logged solely to calibrate server capacity and evaluate story engagement.
                  </p>
                  <h3 className="font-bold text-base text-gray-900 pt-2">Your Privacy Rights (Access & Erasure)</h3>
                  <p>
                    You have the right at any time to request a complete export of your subscriber records or request permanent erasure from our servers by emailing <span className="font-mono text-xs break-all">privacy@americanadigest.blog</span>.
                  </p>
                </div>
              )}

              {/* 8. COMMENT POLICY */}
              {activeTab === 'comment-policy' && (
                <div className="space-y-4">
                  <p>
                    Americana Digest fosters vigorous, civil public debate. Our reader discussion feed is actively moderated to safeguard quality discourse.
                  </p>
                  <h3 className="font-bold text-base text-gray-900">Prohibited Submissions</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-700">
                    <li>Hate speech, racial epithets, or discriminatory attacks targeting protected classes.</li>
                    <li>Doxxing, threats of violence, or publishing non-public private telephone numbers or home addresses.</li>
                    <li>Commercial spam, affiliate marketing links, or phishing schemes.</li>
                    <li>Defamatory falsehoods directed at private individuals.</li>
                  </ul>
                  <p className="text-xs text-gray-500 pt-2">
                    Americana Digest reserves the unilateral right to delete non-compliant comments and revoke commenting privileges without prior notice.
                  </p>
                </div>
              )}

              {/* 9. ACCESSIBILITY */}
              {activeTab === 'accessibility' && (
                <div className="space-y-4">
                  <p>
                    Americana Digest is dedicated to providing an inclusive digital news experience accessible to readers of all abilities, adhering to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.
                  </p>
                  <h3 className="font-bold text-base text-gray-900">Accessibility Implementations</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-700">
                    <li><strong>Ergonomic Touch Targets:</strong> All interactive buttons maintain a minimum 44×44px hit radius for mobile motor accessibility.</li>
                    <li><strong>Contrast Compliance:</strong> Forest green (#0E5B44), brand red (#E0292B), and body typography satisfy 4.5:1 WCAG contrast thresholds.</li>
                    <li><strong>Screen Reader Semantics:</strong> Standard HTML5 elements with descriptive ARIA labels and alt tags on all news imagery.</li>
                    <li><strong>Keyboard Navigation:</strong> Logical tab sequences with visible focus indicators across all desktop drawers and modals.</li>
                  </ul>
                  <p className="text-xs text-gray-500 pt-2">
                    For feedback or accessibility assistance, contact our Coordinator at <span className="font-mono text-xs break-all">accessibility@americanadigest.blog</span>.
                  </p>
                </div>
              )}

              {/* 10. DMCA NOTICE */}
              {activeTab === 'dmca' && (
                <div className="space-y-4">
                  <p>
                    Americana Digest respects the intellectual property rights of creators and complies with the Digital Millennium Copyright Act (17 U.S.C. § 512).
                  </p>
                  <h3 className="font-bold text-base text-gray-900">Submitting a Takedown Notice</h3>
                  <p>
                    If you are a copyright owner or authorized representative and believe content on americanadigest.blog infringes your copyright, provide a written notice with:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm text-gray-700">
                    <li>Physical or electronic signature of the authorized agent.</li>
                    <li>Identification of the copyrighted work claimed to have been infringed.</li>
                    <li>Exact URL and description of where the infringing material is located.</li>
                    <li>Your contact info (name, address, telephone number, and email).</li>
                    <li>A statement that you have a good-faith belief that use of the material is not authorized by the copyright owner.</li>
                    <li>A statement made under penalty of perjury that the information in your notification is accurate.</li>
                  </ol>
                  <div className="p-3 bg-gray-50 rounded border border-gray-200 font-mono text-xs break-all">
                    Designated DMCA Agent: legal@americanadigest.blog<br />
                    Americana Digest Media, Attn: Legal & Copyright Compliance Bureau
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <span>Americana Digest Legal Repository</span>
          <button
            onClick={onClose}
            className="bg-[#0E5B44] hover:bg-[#083c2d] text-white font-bold px-4 py-2 rounded text-xs uppercase tracking-wider"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
