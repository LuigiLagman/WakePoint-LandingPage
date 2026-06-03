import { useState } from "react";

import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import ProcessSection from "./sections/ProcessSection";
import PricingSection from "./sections/PricingSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import DownloadSection from "./sections/DownloadSection";
import FooterSection from "./sections/FooterSection";

import FeatureDropOverlay from "./components/FeatureDropOverlay";

function App() {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="relative min-h-screen text-[#f4efe8]">

      {/* background gradient (non-vh, scroll-based illusion) */}
      <div className="pointer-events-none absolute inset-x-0 top-[100vh] h-[120rem] bg-gradient-to-b from-[#FAF9F7] to-transparent -z-10" />

      {/* OVERLAY (gravity PNG system) */}
      <FeatureDropOverlay
        active={showFeatures}
        onClear={() => setShowFeatures(false)}
      />

      <Navbar />

      <main>
        <HeroSection />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-6 pt-2 sm:px-5 lg:px-6 lg:pb-8">
          <ProblemSection
            onTriggerFeatures={() => setShowFeatures(true)}
          />
          <ProcessSection />
          <PricingSection />
          <TestimonialsSection />
          <DownloadSection />
        </div>

        <FooterSection />
      </main>
    </div>
  );
}

export default App;