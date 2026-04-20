import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight, Rocket, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0066CC] via-[#0052A3] to-[#003D7A] py-24">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0066CC]/20 to-transparent" />
      
      <div className="container mx-auto px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-white/10 text-white border-white/20 mb-6 px-4 py-2">
            <Rocket className="w-4 h-4 mr-2" />
            Trusted by 10,000+ organizations worldwide
          </Badge>
          
          <h1 className="text-[56px] leading-[1.1] text-white mb-6">
            Transform Data Into
            <span className="block bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Actionable Insights
            </span>
          </h1>
          
          <p className="text-[20px] leading-[32px] text-white/90 mb-10 max-w-2xl mx-auto">
            The all-in-one platform for data analysis, visualization, and reporting. 
            Make better decisions with powerful analytics tools designed for modern teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-[#0066CC] hover:bg-white/90 shadow-xl text-[16px] px-8 py-6 h-auto">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-[16px] px-8 py-6 h-auto">
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-white/80 text-[14px]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="container mx-auto px-8 mt-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-[36px] text-white mb-2">10K+</div>
            <div className="text-white/70 text-[14px]">Active Users</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-[36px] text-white mb-2">50M+</div>
            <div className="text-white/70 text-[14px]">Data Points Analyzed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-[36px] text-white mb-2">99.9%</div>
            <div className="text-white/70 text-[14px]">Uptime SLA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
