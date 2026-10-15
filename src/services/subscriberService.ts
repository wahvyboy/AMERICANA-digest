import { AutomatedEmail, Subscriber } from '../types';

const SUBSCRIBERS_STORAGE_KEY = 'americana_digest_subscribers';
const DISPATCHED_EMAILS_KEY = 'americana_digest_dispatched_emails';

export function getSubscribers(): Subscriber[] {
  try {
    const raw = localStorage.getItem(SUBSCRIBERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getDispatchedEmails(): AutomatedEmail[] {
  try {
    const raw = localStorage.getItem(DISPATCHED_EMAILS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function subscribeUser(email: string, name?: string, topics: string[] = ['Breaking News', 'Politics', 'Shopping Deals']): {
  subscriber: Subscriber;
  automatedEmail: AutomatedEmail;
} {
  const confirmationId = `AD-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date().toISOString();

  const subscriber: Subscriber = {
    email: email.trim().toLowerCase(),
    name: name?.trim() || 'Valued Reader',
    subscribedAt: now,
    topics,
    emailConfirmationSent: true,
    confirmationId
  };

  // Build the rich automated email directly from support@americanadigest.blog
  const automatedEmail: AutomatedEmail = {
    id: `email-${Date.now()}`,
    from: 'Americana Digest Editorial Desk <support@americanadigest.blog>',
    to: subscriber.email,
    subject: `⚡ Welcome to Americana Digest: Your Daily Intelligence Brief & Morning Dispatch [ID: ${confirmationId}]`,
    sentAt: now,
    status: 'delivered',
    previewText: `Thank you for subscribing. Your direct access to high-velocity investigative reporting is now active...`,
    bodyHtml: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <!-- Email Header with signature brand green -->
        <div style="background-color: #0E5B44; padding: 24px 28px; text-align: center; border-bottom: 4px solid #F02D5E;">
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.04em; font-style: italic;">AMERICANA DIGEST</h1>
          <p style="color: #a7f3d0; margin: 6px 0 0 0; font-size: 13px; letter-spacing: 0.05em; text-transform: uppercase;">Independent • Fearless • Comprehensive</p>
        </div>

        <!-- Body Content -->
        <div style="padding: 28px; color: #1f2937; line-height: 1.65;">
          <div style="display: inline-block; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: #065f46; margin-bottom: 16px;">
            ✓ Automated Follow-Up Verified • ID: ${confirmationId}
          </div>

          <h2 style="font-size: 20px; font-weight: 800; color: #111827; margin-top: 0; margin-bottom: 12px;">
            Welcome to the front row of American journalism, ${subscriber.name}!
          </h2>
          
          <p style="font-size: 15px; color: #374151; margin-bottom: 16px;">
            Thank you for subscribing to <strong>Americana Digest</strong>. Your email has been seamlessly routed to our automated newsroom distribution hub. From this moment onward, you will receive our morning intelligence briefings, breaking alert bulletins, and deep-dive investigative scoops directly in your inbox.
          </p>

          <!-- Top Curated Stories Briefing -->
          <div style="background: #f8fafc; border-left: 4px solid #0E5B44; padding: 16px 20px; margin: 24px 0; border-radius: 4px;">
            <h3 style="margin: 0 0 10px 0; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; color: #0E5B44; font-weight: 800;">
              Today's Priority Briefing Snapshot
            </h3>
            <ul style="margin: 0; padding-left: 18px; color: #1e293b; font-size: 14px; line-height: 1.6;">
              <li style="margin-bottom: 8px;"><strong>SpaceX & Ukraine Standoff:</strong> Internal Pentagon cables reveal backchannel maneuvering over battlefield satellite coverage.</li>
              <li style="margin-bottom: 8px;"><strong>Federal Overtime Rollback:</strong> New executive rule shifts the salary baseline for 4.2M working Americans.</li>
              <li><strong>$10B Midterm Ad Surge:</strong> Ad trackers project all-time record campaign spending across swing states.</li>
            </ul>
          </div>

          <!-- Subscription Details Box -->
          <div style="border: 1px dashed #cbd5e1; border-radius: 6px; padding: 16px; margin: 20px 0; background: #ffffff;">
            <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; color: #64748b; font-weight: 700;">Account Credentials & Dispatch Data</h4>
            <table style="width: 100%; font-size: 13px; color: #334155; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; font-weight: 600;">Subscriber Email:</td>
                <td style="padding: 4px 0; text-align: right;">${subscriber.email}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600;">Automated Dispatcher:</td>
                <td style="padding: 4px 0; text-align: right; color: #0E5B44;">support@americanadigest.blog</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600;">Selected Categories:</td>
                <td style="padding: 4px 0; text-align: right;">${topics.join(', ')}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; font-weight: 600;">Delivery Schedule:</td>
                <td style="padding: 4px 0; text-align: right;">Every Morning at 6:00 AM EST + Breaking Alerts</td>
              </tr>
            </table>
          </div>

          <!-- Direct CTA -->
          <div style="text-align: center; margin: 30px 0 20px 0;">
            <a href="https://americanadigest.blog" style="background-color: #F02D5E; color: #ffffff; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block; letter-spacing: 0.02em;">
              EXPLORE TODAY'S AMERICANA DIGEST
            </a>
          </div>

          <p style="font-size: 13px; color: #6b7280; margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
            Need help or have an investigative news tip? Reply directly to this email or reach us anytime at <a href="mailto:support@americanadigest.blog" style="color: #0E5B44; font-weight: 600;">support@americanadigest.blog</a>.
          </p>
        </div>

        <!-- Email Footer -->
        <div style="background-color: #f3f4f6; padding: 18px 28px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0 0 6px 0;">Americana Digest Media Inc. • 1100 13th Street NW, Suite 800, Washington, D.C. 20005</p>
          <p style="margin: 0;">You received this automated follow-up because you requested our daily news alerts. <a href="#" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> • <a href="#" style="color: #9ca3af; text-decoration: underline;">Privacy Policy</a></p>
        </div>
      </div>
    `
  };

  // Persist subscriber
  try {
    const existingSubs = getSubscribers();
    const updatedSubs = [subscriber, ...existingSubs.filter(s => s.email !== subscriber.email)];
    localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(updatedSubs));

    const existingEmails = getDispatchedEmails();
    const updatedEmails = [automatedEmail, ...existingEmails];
    localStorage.setItem(DISPATCHED_EMAILS_KEY, JSON.stringify(updatedEmails));
  } catch (err) {
    console.error('Error saving subscriber:', err);
  }

  return { subscriber, automatedEmail };
}
