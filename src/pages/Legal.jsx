import React from 'react';
import SeoHead from '../components/SeoHead';

export default function Legal({ type }) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';
  const path = isPrivacy ? '/privacy' : '/terms';
  const intro = isPrivacy
    ? 'This Privacy Policy explains how Raven Development Operations LLC ("Raven", "we") collects, uses, and shares information when you use the Raven AI Assistant.'
    : 'These Terms of Service govern your access to and use of the Raven AI Assistant provided by Raven Development Operations LLC ("Raven", "we", "us").';
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 lg:px-6">
      <SeoHead
        title={`${title} | Raven Development Operations`}
        description={
          isPrivacy
            ? 'How Raven AI Assistant collects, uses, and protects information you share while using the assistant.'
            : 'The terms that govern access to and use of the Raven AI Assistant.'
        }
        path={path}
      />
      <header className="space-y-2">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="text-sm text-slate-300">{intro}</p>
      </header>

      {isPrivacy ? <PrivacyContent /> : <TermsContent />}

      <section className="border-t border-raven-border/70 pt-4 text-xs text-slate-500">
        <p>
          This page is provided for informational purposes and is not legal advice. If you have questions about how these
          policies apply to your organization, please contact me at{' '}
          <a href="mailto:business@ravdevops.com" className="text-raven-cyan hover:text-white">
            business@ravdevops.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}

function PrivacyContent() {
  return (
    <>
      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">What this policy covers</h2>
        <p>
          This policy describes how Raven Development Operations LLC collects, uses, and shares information when you access or
          interact with the Raven AI Assistant on this site or through connected apps. By using the assistant you agree to this
          policy.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Information we collect</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Contact and account details you provide, such as name, email, company, role, and preferences.</li>
          <li>Prompts, messages, files, and other content you submit to the assistant, plus related usage logs.</li>
          <li>Technical data like browser type, device identifiers, pages viewed, timestamps, and IP address.</li>
          <li>Cookies or similar technologies used for authentication, session management, and basic analytics.</li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">How we use information</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>To operate, secure, and improve the Raven AI Assistant and related support services.</li>
          <li>To generate responses, troubleshoot issues, and provide customer support.</li>
          <li>To monitor abuse, prevent fraud, and enforce acceptable use.</li>
          <li>To comply with legal obligations and maintain business records.</li>
        </ul>
        <p className="mt-2">We do not sell your personal information.</p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">AI processing and third parties</h2>
        <p>
          The assistant may use third-party model providers or infrastructure to process your prompts and files. Those vendors
          handle data under their own terms and privacy policies. We share only what is needed to deliver the requested
          response and configure services to minimize retention where options exist.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">How information is shared</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>With service providers that host, analyze, or support the assistant under confidentiality obligations.</li>
          <li>With your direction, such as when you integrate other tools or share conversation links.</li>
          <li>To comply with law, respond to legal process, or protect rights, security, and safety.</li>
          <li>As part of a business transaction (for example, a merger or acquisition), subject to this policy.</li>
          <li>In aggregate or de-identified form that does not reasonably identify you.</li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Data retention</h2>
        <p>
          We retain personal information only as long as needed to provide the assistant, comply with legal obligations,
          resolve disputes, and maintain security records. Conversation content and logs may be stored for a limited period to
          improve reliability, detect abuse, and support your requests. When retention is no longer needed, we delete or
          anonymize the data.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Security and confidentiality</h2>
        <p>
          We use administrative, technical, and physical safeguards designed to protect the information we hold. No system is
          perfectly secure, so you are responsible for choosing what you share with the assistant and for keeping your accounts
          and devices protected.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Your choices and rights</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Request access to, correction of, or deletion of personal information we hold about you.</li>
          <li>Opt out of non-essential communications by using unsubscribe links or contacting us.</li>
          <li>Limit cookies through your browser settings, though some features may rely on them.</li>
          <li>Stop using the assistant; you may also ask us to close related accounts.</li>
        </ul>
        <p className="mt-2">
          Contact us at{' '}
          <a href="mailto:business@ravdevops.com" className="text-raven-cyan hover:text-white">
            business@ravdevops.com
          </a>{' '}
          to exercise these choices.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">International transfers</h2>
        <p>
          We may process and store information in the United States and other countries where our service providers operate.
          We take steps to protect information in accordance with applicable law when it is transferred across borders.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Children</h2>
        <p>
          The Raven AI Assistant is not directed to children under 13, and we do not knowingly collect personal information
          from them. If you believe a child has provided us information, contact us so we can delete it.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Updates to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If changes are material, we will post a notice in the assistant
          or on this page. Continued use after an update means you accept the revised policy.
        </p>
      </section>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Agreement to terms</h2>
        <p>
          By accessing or using the Raven AI Assistant, you agree to these Terms of Service. If you are using the assistant on
          behalf of a company, you represent that you have authority to bind that company to these terms.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Eligibility and accounts</h2>
        <p>
          You must be at least 18 years old and legally able to form a contract. Keep your credentials confidential and accept
          responsibility for activity under your account.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Permitted use</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Use the assistant only for lawful purposes and in line with these terms.</li>
          <li>Do not input sensitive personal data, regulated data, or content you lack rights to share.</li>
          <li>Do not try to exploit, attack, or reverse engineer the service or underlying models.</li>
          <li>Do not use outputs for high-risk scenarios (for example medical, safety-critical, or legal decisions) without
            independent review by a qualified professional.</li>
        </ul>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Your data and content</h2>
        <p>
          You retain ownership of the prompts, files, and other content you submit. You grant Raven a non-exclusive,
          worldwide, royalty-free license to use that content to operate, secure, and improve the assistant, to comply with
          law, and to provide support you request. You are responsible for ensuring your content and use comply with laws and
          third-party rights.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Outputs and no professional advice</h2>
        <p>
          AI-generated outputs may be incorrect, incomplete, or inappropriate. The assistant does not provide legal, financial,
          medical, safety, or other professional advice. You must review outputs and are solely responsible for how you use
          them.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Third-party services and models</h2>
        <p>
          The assistant may rely on third-party hosting, analytics, and model providers. Their terms and policies govern your
          use of those services. Raven is not liable for third-party platforms outside its control.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Fees</h2>
        <p>
          If any features carry fees, pricing and billing terms will be provided separately. You agree to pay applicable
          charges and taxes for paid features you choose to use.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Intellectual property</h2>
        <p>
          Raven and its licensors retain all rights to the assistant, documentation, branding, and underlying technology. These
          terms do not grant you ownership; only a limited right to use the service as permitted here.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Feedback</h2>
        <p>
          If you provide feedback or suggestions, you allow Raven to use them without restriction or obligation to you.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Termination</h2>
        <p>
          You may stop using the assistant at any time. We may suspend or terminate access for violations of these terms, to
          protect the service, or as required by law. Sections that by nature should survive termination will continue to
          apply.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Disclaimers</h2>
        <p>
          THE RAVEN AI ASSISTANT IS PROVIDED "AS IS" AND "AS AVAILABLE." RAVEN DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED,
          INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Limitation of liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, RAVEN WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS, DATA, OR GOODWILL. RAVEN'S TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE
          ASSISTANT IS LIMITED TO THE AMOUNT YOU PAID FOR THE SERVICE IN THE 3 MONTHS BEFORE THE CLAIM (OR USD $100 IF NO FEES
          WERE PAID).
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Indemnity</h2>
        <p>
          You agree to indemnify and hold harmless Raven and its officers, directors, employees, and contractors from any
          claims, damages, or costs arising from your content, your use of the assistant, or your breach of these terms.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Governing law</h2>
        <p>
          Unless a different governing law is agreed in writing, these terms are governed by the laws of the State of
          Missouri, United States, without regard to conflict-of-law rules. Any disputes will be handled in the courts located
          in Missouri.
        </p>
      </section>

      <section className="space-y-2 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Changes</h2>
        <p>
          We may update these Terms of Service from time to time. If changes are material, we will post a notice in the
          assistant or on this page. Continued use after changes take effect constitutes acceptance of the revised terms.
        </p>
      </section>
    </>
  );
}
