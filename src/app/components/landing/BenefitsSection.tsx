'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Zap, 
  Shield, 
  Clock, 
  Briefcase, 
  TrendingUp, 
  Target,
  ArrowRight
} from "lucide-react";

export function BenefitsSection() {
  const [visibleBenefits, setVisibleBenefits] = useState(new Set<number>());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleBenefits((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('[data-benefit-card]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: Zap,
      headline: "10x Faster Analysis",
      subheading: "Turn program research from months to hours.",
      proof: "Most analysis completes in 15 minutes. Report downloads in 3 minutes.",
      impact: "Get from 'should we build this?' to 'let's launch' in a single meeting instead of multiple committee reviews.",
      metric: "Reduce program design cycle from 16 weeks to 2 weeks",
      color: "#2563eb",
      bgColor: "#2563eb",
      lightBg: "#dbeafe"
    },
    {
      icon: Shield,
      headline: "Evidence-Based Defensibility",
      subheading: "Make decisions you can actually defend.",
      proof: "Every recommendation is backed by real job market data, competitor benchmarks, and financial scenarios.",
      impact: "When enrollment targets are questioned, you have data. When the board asks 'why this program?', you have an answer that's hard to argue with.",
      quote: "We went from 'we think this program is needed' to 'here's the evidence: X jobs, Y competitors, $Z revenue projection'",
      color: "#0891b2",
      bgColor: "#0891b2",
      lightBg: "#cffafe"
    },
    {
      icon: Clock,
      headline: "Stop Manual Research. Start Strategy.",
      subheading: "Unlock your team's time for what matters.",
      proof: "Eliminate 30-40 hours of manual research per program design.",
      impact: "Your people focus on pedagogy, student outcomes, and strategic positioning instead of database queries.",
      metric: "Save 200+ hours/year per program director",
      color: "#059669",
      bgColor: "#059669",
      lightBg: "#d1fae5"
    },
    {
      icon: Briefcase,
      headline: "Board-Ready Quality Instantly",
      subheading: "Reports so professional they look like McKinsey did them.",
      proof: "Professional formatting, visualizations, and narrative built-in.",
      impact: "No more last-minute editing or design work. Download report → Present to board.",
      note: "Custom templates for academic institutions, corporate L&D, government agencies.",
      color: "#d97706",
      bgColor: "#d97706",
      lightBg: "#fef3c7"
    },
    {
      icon: Target,
      headline: "Risk Mitigation Through Data",
      subheading: "Avoid costly program failures before they happen.",
      proof: "See financial break-even points, competitor substitutes, and market saturation data up-front.",
      impact: "You avoid launching programs with 30% fewer job openings than needed, or competitors already offering at lower cost.",
      metric: "Reduce program failure rate by flagging unviable programs before launch",
      color: "#7c3aed",
      bgColor: "#7c3aed",
      lightBg: "#ede9fe"
    },
    {
      icon: TrendingUp,
      headline: "Future-Proof Your Portfolio",
      subheading: "Stay aligned to labor market changes.",
      proof: "Labor data updates quarterly; see macro trends in employment (what's growing, what's decline).",
      impact: "You can pivot your portfolio proactively, not reactively.",
      example: "See that nursing technician roles are up 18% but waiting lists are full? Time to launch a variant program.",
      color: "#dc2626",
      bgColor: "#dc2626",
      lightBg: "#fee2e2"
    }
  ];

  return (
    <section id="benefits" className="py-32 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Decorative gradient background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <Badge className="bg-blue-100 text-blue-600 border-blue-200 mb-4 animate-fade-in">
            The Benefits
          </Badge>
          <h2 className="text-[40px] leading-[1.2] mb-4 font-bold text-slate-900 animate-fade-in-up">
            Why Education Leaders Choose Curriculum.ai
          </h2>
          <p className="text-[18px] text-slate-600 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Measurable outcomes that transform how you make program decisions.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="space-y-16 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isVisible = visibleBenefits.has(index);
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                data-benefit-card
                data-index={index}
                className="relative"
              >
                <div
                  className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {/* Content - Left on even, Right on odd */}
                  <div className={isEven ? 'order-1' : 'order-2'}>
                    {/* Icon */}
                    <div className="mb-6 inline-flex">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 hover:scale-110 hover:shadow-lg"
                        style={{ backgroundColor: `${benefit.color}20` }}
                      >
                        <Icon
                          className="w-8 h-8 transition-transform duration-300"
                          style={{ color: benefit.color }}
                        />
                      </div>
                    </div>

                    {/* Headline */}
                    <h3 className="text-[32px] font-bold text-slate-900 mb-3 leading-tight">
                      {benefit.headline}
                    </h3>

                    {/* Subheading */}
                    <p className="text-[16px] font-semibold text-slate-700 mb-6">
                      {benefit.subheading}
                    </p>

                    {/* Proof */}
                    <div className="bg-slate-50 border-l-4 rounded-lg p-4 mb-6" style={{ borderColor: benefit.color }}>
                      <p className="text-[14px] text-slate-600">
                        <span className="font-semibold text-slate-900">✓ Proof:</span> {benefit.proof}
                      </p>
                    </div>

                    {/* Impact */}
                    <div className="mb-6">
                      <p className="text-[15px] text-slate-700 leading-[26px]">
                        <span className="font-semibold text-slate-900">Impact:</span> {benefit.impact}
                      </p>
                    </div>

                    {/* Metric / Additional Info */}
                    {benefit.metric && (
                      <div className="flex items-start gap-3 p-4 rounded-lg transition-all duration-300 hover:shadow-md" style={{ backgroundColor: `${benefit.color}08` }}>
                        <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: benefit.color }} />
                        <p className="text-[14px] font-semibold text-slate-900">
                          {benefit.metric}
                        </p>
                      </div>
                    )}

                    {benefit.quote && (
                      <div className="italic text-slate-600 text-[15px] p-4 border-l-4 rounded-lg pl-6 my-4" style={{ borderColor: benefit.color, backgroundColor: `${benefit.color}05` }}>
                        "{benefit.quote}"
                      </div>
                    )}

                    {benefit.note && (
                      <div className="text-[13px] text-slate-500 p-3 bg-slate-100 rounded-lg mt-4">
                        {benefit.note}
                      </div>
                    )}

                    {benefit.example && (
                      <div className="text-[14px] text-slate-700 p-4 rounded-lg mt-4" style={{ backgroundColor: `${benefit.color}10` }}>
                        <span className="font-semibold" style={{ color: benefit.color }}>💡 Example:</span> {benefit.example}
                      </div>
                    )}
                  </div>

                  {/* Visual Card - Right on even, Left on odd */}
                  <div className={isEven ? 'order-2' : 'order-1'}>
                    <div
                      className="relative h-96 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 group cursor-default"
                      style={{ backgroundColor: benefit.lightBg }}
                    >
                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${benefit.color}, ${benefit.color}80)`
                        }}
                      />

                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse"
                          style={{ backgroundColor: benefit.color }}
                        />
                      </div>

                      {/* Content Center */}
                      <div className="relative h-full flex flex-col items-center justify-center px-8 text-center z-10">
                        {/* Large Icon */}
                        <div
                          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8 shadow-lg transition-transform duration-500 group-hover:rotate-12"
                          style={{ backgroundColor: `${benefit.color}20` }}
                        >
                          <Icon className="w-12 h-12" style={{ color: benefit.color }} />
                        </div>

                        {/* Stats/Key info */}
                        <div className="space-y-4">
                          {index === 0 && (
                            <>
                              <p className="text-[48px] font-bold" style={{ color: benefit.color }}>10x</p>
                              <p className="text-[16px] font-semibold text-slate-700">Faster</p>
                            </>
                          )}
                          {index === 2 && (
                            <>
                              <p className="text-[48px] font-bold" style={{ color: benefit.color }}>200+</p>
                              <p className="text-[16px] font-semibold text-slate-700">Hours Saved/Year</p>
                            </>
                          )}
                          {index === 3 && (
                            <>
                              <p className="text-[48px] font-bold" style={{ color: benefit.color }}>0</p>
                              <p className="text-[16px] font-semibold text-slate-700">Design Hours Needed</p>
                            </>
                          )}
                          {index === 4 && (
                            <>
                              <div className="flex justify-center gap-4 items-end">
                                <div className="h-12 w-2 bg-red-500 rounded opacity-30" />
                                <div className="h-16 w-2 bg-red-500 rounded" style={{ backgroundColor: benefit.color }} />
                                <div className="h-10 w-2 bg-red-500 rounded opacity-30" />
                              </div>
                              <p className="text-[14px] font-semibold text-slate-700">Risk Down</p>
                            </>
                          )}
                          {index === 5 && (
                            <>
                              <p className="text-[48px] font-bold" style={{ color: benefit.color }}>↗</p>
                              <p className="text-[16px] font-semibold text-slate-700">Always Current</p>
                            </>
                          )}
                          {index === 1 && (
                            <>
                              <p className="text-[14px] font-semibold text-slate-700 mb-4">Evidence Backed</p>
                              <div className="flex justify-center gap-2">
                                <div className="w-12 h-12 rounded-lg bg-blue-500 opacity-60" />
                                <div className="w-12 h-12 rounded-lg bg-blue-500 opacity-80" />
                                <div className="w-12 h-12 rounded-lg bg-blue-500" style={{ backgroundColor: benefit.color }} />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Animated border */}
                      <div
                        className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ borderColor: benefit.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <p className="text-[18px] text-slate-600 mb-8">
            Ready to experience these benefits?
          </p>
          <button
            className="px-8 py-4 bg-blue-600 text-white font-bold text-[16px] rounded-xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Start Your Free Analysis →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
