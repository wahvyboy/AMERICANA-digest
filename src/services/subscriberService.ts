import { Subscriber } from '../types';

const SUBSCRIBERS_STORAGE_KEY = 'americana_digest_subscribers';

export function getSubscribers(): Subscriber[] {
  try {
    const raw = localStorage.getItem(SUBSCRIBERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export interface SubscribeParams {
  email: string;
  name?: string;
  topics?: string[];
}

export function buildSubscribeMailto(params: SubscribeParams): {
  mailtoUrl: string;
  subject: string;
  body: string;
  recipient: string;
} {
  const recipient = 'support@americanadigest.blog';
  const name = params.name?.trim() || 'Americana Digest Reader';
  const email = params.email.trim();
  const topicsStr = (params.topics && params.topics.length > 0)
    ? params.topics.join(', ')
    : 'All Editorial Desks (Breaking News, Politics, Life, Shopping, Tech)';

  const subject = `New Subscriber Request: ${name} <${email}>`;
  const body = [
    `Hello Americana Digest Editorial Bureau,`,
    ``,
    `Please subscribe me to the Americana Digest intelligence dispatch and breaking news alerts.`,
    ``,
    `--- SUBSCRIBER DOSSIER ---`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Preferred Coverage Desks: ${topicsStr}`,
    `Timestamp: ${new Date().toISOString()}`,
    `Source: https://americanadigest.blog`,
    ``,
    `Thank you,`,
    `${name}`
  ].join('\n');

  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Save subscriber record locally so the site remembers the user subscribed
  try {
    const existing = getSubscribers();
    const newSub: Subscriber = {
      email,
      name,
      subscribedAt: new Date().toISOString(),
      topics: params.topics || ['Breaking News', 'Politics'],
      emailConfirmationSent: true,
      confirmationId: `AD-${Math.floor(100000 + Math.random() * 900000)}`
    };
    const updated = [newSub, ...existing.filter(s => s.email.toLowerCase() !== email.toLowerCase())];
    localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving subscriber locally:', err);
  }

  return {
    mailtoUrl,
    subject,
    body,
    recipient
  };
}
