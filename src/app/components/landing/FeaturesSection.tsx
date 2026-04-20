import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Zap, TrendingUp, BarChart3, FileText, Users, BookOpen } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "AI Analysis Engine",
      subtitle: "Real-time job market scanning across 2M+ postings",
      description: "Continuously monitors job boards, government data, and industry sources for openings matching your target roles. You see current demand, not 6-month-old data.",
      proof: "Updated daily with latest labor market data",
      color: "#2563eb"
    },
    {
      icon: TrendingUp,
      title: "Competitive Intelligence Module",
      subtitle: "Automated competitor program discovery and benchmarking",
      description: "Find 20-50 competing programs in your market, extract tuition, enrollment, and job placement data. Know exactly what you're up against and how to position differently.",
      proof: "Analyzes 500K+ educational programs globally",
      color: "#0891b2"
    },
    {
      icon: BarChart3,
      title: "Financial Modeling Engine",
      subtitle: "Break-even, ROI, and scenario analysis",
      description: "Model 3-5 enrollment scenarios, show cost per graduate, payback period. Everyone in your institution speaks the language of revenue and costs.",
      proof: "Financial projections validated against 1000+ real programs",
      color: "#059669"
    },
    {
      icon: FileText,
      title: "Report Generator",
      subtitle: "Professional PDF/PowerPoint export",
      description: "One-click generation of branded, customizable reports. No design work, no copy-editing, no formatting nightmares. Ready for board presentations.",
      proof: "Reports used in board presentations at 500+ institutions",
      color: "#d97706"
    },
    {
      icon: Users,
      title: "Workspace Collaboration",
      subtitle: "Share reports, invite stakeholders, manage project versions",
      description: "Multiple users can access analysis, add notes, comment on recommendations. Faster consensus-building and cross-functional alignment without endless emails.",
      proof: "Average time to approval: 48 hours vs. 3+ weeks",
      color: "#7c3aed"
    },
    {
      icon: BookOpen,
      title: "Benchmark Library",
      subtitle: "Compare your program to sector benchmarks",
      description: "See how your metrics stack up against programs in your region, industry, and size tier. Provides context on whether YOUR metrics are strong or weak relative to the market.",
      proof: "Based on 50K+ real programs with public data",
      color: "#dc2626"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-600 border-blue-200 mb-4">
            Core Features
          </Badge>
          <h2 className="text-[40px] leading-[1.2] mb-4 font-bold text-slate-900">
            Everything you need to design programs with confidence
          </h2>
          <p className="text-[18px] text-slate-600 max-w-3xl mx-auto">
            From job market intelligence to financial modeling to board-ready reports. All the intelligence you need to make data-backed curriculum decisions in minutes, not months.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardContent className="p-8">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>
                  
                  <h3 className="text-[20px] font-bold text-slate-900 mb-1">
                    {feature.title}
                  </h3>
                  
                  <p className="text-[14px] font-semibold text-slate-600 mb-3">
                    {feature.subtitle}
                  </p>
                  
                  <p className="text-[15px] text-slate-600 leading-[24px] mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-[13px] text-slate-500 italic">
                      ✓ {feature.proof}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
