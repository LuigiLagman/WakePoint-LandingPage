import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import ProblemSection from './sections/ProblemSection';
import ProcessSection from './sections/ProcessSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import DownloadSection from './sections/DownloadSection';
import FooterSection from './sections/FooterSection';

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,194,87,0.22),transparent_34%),linear-gradient(180deg,#101114_0%,#17181f_52%,#0d0e12_100%)] text-[#f4efe8]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-6 pt-2 sm:px-5 lg:px-6 lg:pb-8">
        <HeroSection />
        <ProblemSection />
        <ProcessSection />
        <FeaturesSection />
        <TestimonialsSection />
        <DownloadSection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;