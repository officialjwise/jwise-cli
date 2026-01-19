import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { QuickStartSection } from "@/components/QuickStartSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <QuickStartSection />
        <ComparisonSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
