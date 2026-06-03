import React, { useState } from "react";
import { motion } from "framer-motion";

const features = [
  "GPS Alarm",
  "Basic Route Alerts",
  "Saved Routes",
  "Trip History",
  "Unlimited Saved Routes",
  "Advanced Route Monitoring",
  "Custom Alarm Packs",
  "Priority GPS Tracking",
];

const featureCategories = {
  basic: ["GPS Alarm", "Basic Route Alerts", "Saved Routes", "Trip History"],
  advanced: ["Unlimited Saved Routes", "Advanced Route Monitoring", "Custom Alarm Packs", "Priority GPS Tracking"],
};

function CheckIcon({ visible = true, color = "#84D716" }) {
  return (
    <svg
      className={`h-5 w-5 flex-none ${visible ? "opacity-100" : "opacity-0"}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ color }}
    >
      <path
        d="M16 6L8.5 13.5L5 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="h-5 w-5 flex-none text-[#D1D5DB]"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 6L14 14M14 6L6 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");

  const handleSubscribe = (planName, price) => {
    console.log(`Analytics: Subscribe clicked - ${planName} plan (${billingCycle})`);
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'begin_checkout', {
        event_category: 'pricing',
        event_label: planName,
        value: price,
        currency: 'PHP',
        billing_cycle: billingCycle
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 1.11, 0.34, 1] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
    hover: {
      y: -8,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <section id="pricing" className="relative py-8 sm:py-12 lg:py-16 overflow-hidden mt-10">
      {/* Background decoration */}
      
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-[#84D716] mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-8 h-px bg-[#84D716]"></span>
            <span>Pricing</span>
            <span className="w-8 h-px bg-[#84D716]"></span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A3435] font-['Fredoka'] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Simple, transparent pricing
          </motion.h2>
          
          <motion.p 
            className="text-base text-[#2A3435]/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Choose the plan that works best for your commuting needs. All plans include core features to keep you safe on the road.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <span className={`text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'text-[#2A3435]' : 'text-[#2A3435]/50'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-12 h-6 bg-[#84D716]/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#84D716]"
              role="switch"
              aria-checked={billingCycle === 'yearly'}
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-[#84D716] rounded-full shadow-md"
                animate={{ x: billingCycle === 'yearly' ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium transition-colors flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-[#2A3435]' : 'text-[#2A3435]/50'}`}>
              Yearly
              <span className="text-xs bg-[#84D716]/20 text-[#84D716] px-2 py-0.5 rounded-full font-semibold">
                Save 20%
              </span>
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:gap-8 lg:grid-cols-3 items-stretch"
        >
          {/* Features Column */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB]"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#2A3435] font-['Fredoka']">Features</h3>
              <p className="text-sm text-[#2A3435]/60 mt-1">What's included</p>
            </div>
            
            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex items-center text-left text-sm text-[#2A3435]"
                >
                  <span className="mr-3 inline-block w-1.5 h-1.5 rounded-full bg-[#84D716]" />
                  <span className="font-medium">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Free Plan */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredPlan('free')}
            onHoverEnd={() => setHoveredPlan(null)}
            className="relative bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gray-100 text-[#2A3435]/60 text-xs font-semibold px-3 py-1 rounded-full">
                Starter
              </span>
            </div>

            <div className="text-center mb-6 mt-2">
              <h3 className="text-2xl font-bold text-[#2A3435] font-['Fredoka']">Free</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-[#2A3435]">₱0</span>
                <span className="text-[#2A3435]/60">/month</span>
              </div>
              <p className="text-sm text-[#2A3435]/60 mt-2">Perfect for occasional commuters</p>
            </div>

            <ul className="space-y-3 mb-6 flex-grow">
              {featureCategories.basic.map((feature, idx) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 text-sm text-[#2A3435]"
                >
                  <CheckIcon visible={true} color="#84D716" />
                  <span>{feature}</span>
                </motion.li>
              ))}
              {featureCategories.advanced.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-[#2A3435]/40">
                  <XIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <motion.button
              onClick={() => handleSubscribe('Free', 0)}
              className="w-full py-3 rounded-xl font-extrabold uppercase tracking-wider text-sm text-[#2A3435] bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Premium Plan - Highlighted */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredPlan('premium')}
            onHoverEnd={() => setHoveredPlan(null)}
            className="relative bg-gradient-to-br from-[#FAF9F7] to-white rounded-2xl p-6 shadow-lg border-2 border-[#84D716] flex flex-col"
          >
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <motion.span
                className="bg-[#84D716] text-[#2A3435] text-xs font-extrabold px-3 py-1 rounded-full shadow-md"
                animate={{
                  scale: hoveredPlan === 'premium' ? 1.05 : 1,
                }}
              >
                MOST POPULAR
              </motion.span>
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#84D716] to-[#ADCE7D] opacity-0 -z-10"
              animate={{ opacity: hoveredPlan === 'premium' ? 0.2 : 0 }}
              transition={{ duration: 0.3 }}
            />

            <div className="text-center mb-6 mt-2">
              <h3 className="text-2xl font-bold text-[#2A3435] font-['Fredoka']">Premium</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-[#2A3435]">
                  ₱{billingCycle === 'monthly' ? '49' : '39'}
                </span>
                <span className="text-[#2A3435]/60">/{billingCycle === 'monthly' ? 'month' : 'month'}</span>
                {billingCycle === 'yearly' && (
                  <div className="text-xs text-[#84D716] font-semibold mt-1">
                    Billed annually (₱468/year)
                  </div>
                )}
              </div>
              <p className="text-sm text-[#2A3435]/60 mt-2">Best for daily commuters</p>
            </div>

            <ul className="space-y-3 mb-6 flex-grow">
              {features.map((feature, idx) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 text-sm text-[#2A3435]"
                >
                  <CheckIcon visible={true} color="#84D716" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              onClick={() => handleSubscribe('Premium', billingCycle === 'monthly' ? 49 : 39)}
              className="
                relative group cursor-pointer
                w-full py-3 rounded-xl
                text-sm font-extrabold uppercase tracking-[0.08em]
                font-['Fredoka']
                text-[#2A3435]

                bg-gradient-to-b from-[#DAF3B6] to-[#84D716]

                shadow-[inset_0_1px_1px_rgba(255,255,255),0_6px_0_#6CA126]

                transition-all duration-150

                active:translate-y-[2px]
                active:shadow-[inset_0_1px_1px_rgba(255,255,255),0_3px_0_#6CA126]

                outline-none
                focus:outline-none
              "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Subscribe Now</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: hoveredPlan === 'premium' ? [0, 4, 0] : 0 }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: hoveredPlan === 'premium' ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            {/* Money-back guarantee */}
            <p className="text-center text-xs text-[#2A3435]/50 mt-4 flex items-center justify-center gap-1">
              <span>🛡️</span>
              <span>7-day money-back guarantee</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#2A3435]/50">
            <span className="flex items-center gap-2">
              <span className="text-[#84D716] text-lg">✓</span>
              <span>Cancel anytime</span>
            </span>
            <span className="w-px h-4 bg-[#2A3435]/10 hidden sm:block" />
            <span className="flex items-center gap-2">
              <span className="text-[#84D716] text-lg">🔒</span>
              <span>Secure payment</span>
            </span>
          </div>
        </motion.div>

        {/* FAQ Link */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="#faq"
            className="text-sm text-[#84D716] hover:text-[#6CA126] transition-colors inline-flex items-center gap-1"
          >
            Have questions about pricing?
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;