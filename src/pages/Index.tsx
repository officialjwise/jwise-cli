import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { VisionSection } from "@/components/VisionSection";
import { FounderSection } from "@/components/FounderSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
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
        <VisionSection />
        <FounderSection />
        <TestimonialsSection />
        <QuickStartSection />
        <ComparisonSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
