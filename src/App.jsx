import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import ProcessSection from "./sections/ProcessSection";
import PricingSection from "./sections/PricingSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import DownloadSection from "./sections/DownloadSection";
import FooterSection from "./sections/FooterSection";
import ContactSection from "./sections/ContactSection";
import PrivacyPolicySection from "./sections/PrivacyPolicySection";
import TermsSection from "./sections/TermsSection";
import AboutSection from "./sections/AboutSection";

import FeatureDropOverlay from "./components/FeatureDropOverlay";
import patternOne from "./assets/images/pattern_1.png";
import patternTwo from "./assets/images/pattern_2.png";

function App() {
  const [showFeatures, setShowFeatures] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Define all page routes
  const isContactPage = currentPath === "/contact";
  const isPrivacyPage = currentPath === "/privacy";
  const isTermsPage = currentPath === "/terms";
  const isAboutPage = currentPath === "/about";

  // Don't show background gradient on any of the separate pages
  const shouldShowBackground = !isContactPage && !isPrivacyPage && !isTermsPage && !isAboutPage;

  // Render the appropriate page component
  const renderPage = () => {
    if (isContactPage) {
      return <ContactSection onBackHome={() => navigate("/")} />;
    }
    if (isPrivacyPage) {
      return <PrivacyPolicySection onBackHome={() => navigate("/")} />;
    }
    if (isTermsPage) {
      return <TermsSection onBackHome={() => navigate("/")} />;
    }
    if (isAboutPage) {
      return <AboutSection onBackHome={() => navigate("/")} />;
    }
    // Home page
    return (
      <>
        <HeroSection />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-6 pt-2 sm:px-5 lg:px-6 lg:pb-8">
          <ProblemSection onTriggerFeatures={() => setShowFeatures(true)} />
          <ProcessSection />
          <PricingSection />
          <TestimonialsSection />
          <DownloadSection />
        </div>
        <FooterSection
          onContactSection={() => navigate("/contact")}
          onPrivacySection={() => navigate("/privacy")}
          onTermsSection={() => navigate("/terms")}
          onAboutSection={() => navigate("/about")}
        />
      </>
    );
  };

  return (
    <div className="relative min-h-screen text-[#f4efe8]">
      <div
        aria-hidden="true"
        className="parallax-layer parallax-layer--far fixed inset-0 -z-20"
        style={{ backgroundImage: `url(${patternOne})` }}
      />
      <div
        aria-hidden="true"
        className="parallax-layer parallax-layer--near fixed inset-0 -z-20"
        style={{ backgroundImage: `url(${patternTwo})` }}
      />

      {/* background gradient - only show on home page */}
      {shouldShowBackground && (
        <div className="pointer-events-none absolute inset-x-0 top-[100vh] h-480 bg-linear-to-b from-[#FAF9F7] to-transparent -z-10" />
      )}

      {/* OVERLAY (gravity PNG system) */}
      <FeatureDropOverlay
        active={showFeatures}
        onClear={() => setShowFeatures(false)}
      />

      {/* Pass navigate function to Navbar */}
      <Navbar navigate={navigate} currentPath={currentPath} />

      <main>{renderPage()}</main>
    </div>
  );
}

export default App;