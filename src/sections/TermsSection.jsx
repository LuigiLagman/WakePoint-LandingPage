// sections/TermsSection.jsx
import { motion } from "framer-motion";

function TermsSection({ onBackHome }) {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using WakePoint, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service."
    },
    {
      title: "2. Description of Service",
      content: "WakePoint provides a digital commuting assistant platform that helps users manage their travel schedules, set location-based alarms, and optimize their commuting experience."
    },
    {
      title: "3. User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
    },
    {
      title: "4. Privacy Policy",
      content: "Your use of WakePoint is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding your personal information."
    },
    {
      title: "5. Intellectual Property",
      content: "All content, features, and functionality of WakePoint are owned by WakePoint and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws."
    },
    {
      title: "6. Prohibited Uses",
      content: "You may not use WakePoint for any illegal purpose or in violation of any laws. You may not attempt to gain unauthorized access to any part of the service."
    },
    {
      title: "7. Termination",
      content: "We may terminate or suspend your account immediately, without prior notice, for any reason whatsoever, including without limitation if you breach the Terms."
    },
    {
      title: "8. Limitation of Liability",
      content: "In no event shall WakePoint be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses."
    },
    {
      title: "9. Changes to Terms",
      content: "We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect."
    },
    {
      title: "10. Contact Us",
      content: "If you have any questions about these Terms, please contact us at support@wakepoint.app."
    }
  ];

  return (
    <section id="terms" className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#FAF9F7] via-white to-[#F6F4EE]" />
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[#84D716]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-[#ADCE7D]/15 blur-3xl" />

      <div className="relative mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#84D716]">
              Legal
            </p>
            <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#2A3435] sm:text-5xl">
              Terms & Conditions
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[#2A3435]/60">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={onBackHome}
                className="rounded-full border border-[#2A3435]/15 bg-white px-6 py-2 text-sm font-semibold text-[#2A3435] transition-transform hover:-translate-y-0.5"
              >
                ← Back to Home
              </button>
            </div>
          </motion.div>

          {/* Terms Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl"
              >
                <h2 className="mb-3 text-xl font-semibold text-[#2A3435]">{section.title}</h2>
                <p className="leading-relaxed text-[#2A3435]/70">{section.content}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 rounded-2xl bg-[#84D716]/10 p-6 text-center"
          >
            <p className="text-sm text-[#2A3435]/60">
              For any questions regarding these Terms & Conditions, please contact us at{" "}
              <a href="mailto:support@wakepoint.app" className="text-[#84D716] hover:underline">
                support@wakepoint.app
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TermsSection;