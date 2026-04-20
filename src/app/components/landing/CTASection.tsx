import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0066CC] via-[#0052A3] to-[#003D7A] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
      <div className="container mx-auto px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[48px] leading-[1.1] text-white mb-6">
            Ready to transform your data?
          </h2>
          <p className="text-[20px] text-white/90 mb-10">
            Join thousands of teams already making better decisions with InsightHub.
            Start your free 14-day trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#0066CC] hover:bg-white/90 shadow-xl text-[16px] px-8 py-6 h-auto">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-[16px] px-8 py-6 h-auto">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
