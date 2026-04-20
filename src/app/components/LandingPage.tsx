import { Navbar } from "./landing/Navbar";
import Header from "./landing/Header";
import HeaderNew from "./landing/HeaderNew";
import HeroSectionNew  from "./landing/HeroSectionNew";
import {BenefitsSection} from "./landing/BenefitsSection";
import { SolutionSection } from "./landing/SolutionSection";
import { FeaturesSection } from "./landing/FeaturesSection";
import { UseCasesSection } from "./landing/UseCasesSection";
import { PricingSection } from "./landing/PricingSection";
import { TestimonialsSection } from "./landing/TestimonialsSection";
import { CTASection } from "./landing/CTASection";
import { Footer } from "./landing/Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNew />
      <HeroSectionNew />
      <FeaturesSection />
      <SolutionSection />
      <BenefitsSection />
      <UseCasesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
