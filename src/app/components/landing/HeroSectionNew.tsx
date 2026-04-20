'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, TrendingUp, Zap } from 'lucide-react';

/**
 * HeroSection Component - Landing Page
 * Curriculum.ai Platform
 * 
 * Dual-Audience Messaging:
 * - Primary: Individual program designers (bottom-up, PLG)
 * - Secondary: Institutional buyers (top-down, sales-assisted)
 */

export default function HeroSectionNew() {
  const [selectedAudience, setSelectedAudience] = useState<'individual' | 'institutional'>('individual');

  const heroContent = {
    individual: {
      headline: "Program Design Intelligence in Minutes, Not Months",
      subheadline: "Turn job market data, competitor analysis, and financials into defensible program strategy. No spreadsheets. No guesswork. Just evidence.",
      ctaPrimary: "See It In Action (3 min demo)",
      ctaSecondary: "Start Free Analysis",
      ctaLink: "/demo",
      heroImageUrl: "/images/hero-product-ui.png", // Screenshot of product interface
      stats: [
        { label: "Analysis Time", value: "15 min", subtitle: "average" },
        { label: "Programs Analyzed", value: "500+", subtitle: "globally" },
        { label: "User Satisfaction", value: "94%", subtitle: "would recommend" }
      ]
    },
    institutional: {
      headline: "Portfolio Decisions That Don't Take Six Months",
      subheadline: "Stop asking consultants. Start making data-backed decisions on your entire program portfolio in weeks instead of quarters.",
      ctaPrimary: "Schedule Discovery Call",
      ctaSecondary: "View Case Study",
      ctaLink: "/schedule-demo",
      heroImageUrl: "/images/hero-institutional-dashboard.png", // Dashboard view
      stats: [
        { label: "Time Saved", value: "14 weeks", subtitle: "vs. consultant process" },
        { label: "Cost Reduction", value: "80%", subtitle: "vs. external consulting" },
        { label: "Programmes Analyzable", value: "Unlimited", subtitle: "in your portfolio" }
      ]
    }
  };

  const current = heroContent[selectedAudience];

  return (
    <>
      {/* Trust Badges (Optional: Add above hero for early credibility) */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-slate-600 mb-3">
            Trusted by education leaders at:
          </p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <span className="text-slate-500 font-semibold text-sm">500+ Programs Analyzed</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-semibold text-sm">SOC 2 Compliant</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-semibold text-sm">FERPA Privacy Built-In</span>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          
          {/* Audience Toggle (Optional: For page variants, or hide for production) */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50">
              <button
                onClick={() => setSelectedAudience('individual')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                  selectedAudience === 'individual'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                I'm a Program Designer
              </button>
              <button
                onClick={() => setSelectedAudience('institutional')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                  selectedAudience === 'institutional'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                I Run an Institution
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy Section */}
            <div className="flex flex-col space-y-6">
              {/* Headline */}
              <h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                {current.headline}
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                {current.subheadline}
              </p>

              {/* Key Features Callout (before CTA) */}
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Zap className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">AI Analyzes in Minutes</h3>
                    <p className="text-sm text-slate-600">Job market, competitors, financials—all automated</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Evidence-Backed Results</h3>
                    <p className="text-sm text-slate-600">Data from BLS, O*NET, real job postings—defensible insights</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Board-Ready Reports</h3>
                    <p className="text-sm text-slate-600">Professional formatting + strategic recommendations included</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  href={current.ctaLink}
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  {current.ctaPrimary}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold rounded-lg transition-all"
                >
                  {current.ctaSecondary}
                </Link>
              </div>

              {/* Trust Signals Under CTA */}
              <div className="text-sm text-slate-600 space-y-1">
                <p>✓ No credit card required</p>
                <p>✓ 14-day free trial for teams</p>
                <p>✓ Cancel anytime</p>
              </div>
            </div>

            {/* Right: Visual / Stats */}
            <div className="relative">
              {/* Product Screenshot Placeholder */}
              <div className="bg-slate-100 rounded-lg border-2 border-slate-300 aspect-video flex items-center justify-center overflow-hidden relative">
                <img 
                  src={current.heroImageUrl} 
                  alt="Curriculum.ai Product Interface"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image not found
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                
                {/* Fallback: Placeholder Grid */}
                <div className="absolute inset-0 hidden flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100" id="fallback">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-slate-600 font-medium">Product interface preview</p>
                  </div>
                </div>
              </div>

              {/* Stats Cards (Overlaid) */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {current.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-slate-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {stat.value}
                    </div>
                    <p className="text-xs font-semibold text-slate-900 mb-0.5">
                      {stat.label}
                    </p>
                    <p className="text-xs text-slate-500">
                      {stat.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full blur-3xl -z-10 opacity-30" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-slate-100 rounded-full blur-3xl -z-10 opacity-20" />
      </section>

      {/* Value Proposition Cards (Below Hero) */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Why Education Leaders Choose Curriculum.ai
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                10x Faster Decisions
              </h3>
              <p className="text-slate-600">
                Turn weeks of research into hours of actionable insights. Move from idea to approved launch in days.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Evidence Over Opinion
              </h3>
              <p className="text-slate-600">
                Back every decision with real data: job market demand, competitor analysis, financial viability—no guesswork.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Board-Ready Confidence
              </h3>
              <p className="text-slate-600">
                Professional reports that look like McKinsey analysis, backed by government labor data and real market research.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
