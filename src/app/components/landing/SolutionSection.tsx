'use client';

import { useState } from 'react';
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function SolutionSection() {
  const [activeAudience, setActiveAudience] = useState<'individual' | 'institutional'>('individual');

  const workflows = {
    individual: {
      before: ['Intake wizard', 'Manual research (days)', 'Excel models', 'PowerPoint deck'],
      after: ['Intake wizard', 'AI analysis (15 min)', 'Professional report', 'Decision made']
    },
    institutional: {
      before: ['Program audit request', 'Department data collection (weeks)', 'Consultant engagement (8-12 weeks)', 'Report delivered (outdated already)'],
      after: ['Portfolio review', 'Run analysis on 5-10 strategic programs (hours)', 'Board-ready reports ready to present', 'Make decisions THIS month']
    }
  };

  const replaces = {
    individual: [
      { old: 'Manual job posting research', new: 'Indeed searches, BLS lookup' },
      { old: 'DIY competitor analysis', new: 'Google searches + spreadsheets' },
      { old: 'Excel financial modeling', new: '50-row financial templates' },
      { old: 'Document stitching', new: 'Copy/paste from research into PowerPoint' }
    ],
    institutional: [
      { old: 'External consulting', new: '$50K-$200K consultant projects' },
      { old: 'Manual data collection', new: 'Department-by-department requests (weeks of delays)' },
      { old: 'Outdated static reports', new: '8-12 week consultant cycles that are stale on delivery' }
    ]
  };

  const currentWorkflow = workflows[activeAudience];
  const currentReplaces = replaces[activeAudience];

  return (
    <section id="solution" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge className="bg-blue-100 text-blue-600 border-blue-200 mb-4">
            The Solution
          </Badge>
          <h2 className="text-[40px] leading-[1.2] mb-6 font-bold text-slate-900">
            What Curriculum.ai Does
          </h2>
        </div>

        {/* One-Sentence Definition */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-16 max-w-4xl mx-auto">
          <p className="text-[18px] leading-[28px] text-slate-900 font-semibold text-center">
            Curriculum.ai is an AI-powered intelligence platform that turns weeks of research into hours of evidence-backed program strategy—job market data, competitor analysis, and financial modeling, all in one place.
          </p>
        </div>

        {/* Plain-Language Explanation */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="text-[28px] font-bold text-slate-900 mb-8">How It Works</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-[14px]">1</div>
              <div>
                <p className="text-[16px] font-semibold text-slate-900 mb-1">You tell us about your program</p>
                <p className="text-[15px] text-slate-600">(target roles, location, current enrollment)</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-[14px]">2</div>
              <div>
                <p className="text-[16px] font-semibold text-slate-900 mb-1">Our AI analyzes thousands of data points</p>
                <p className="text-[15px] text-slate-600">job postings, competitor programs, and labor data in real-time</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-[14px]">3</div>
              <div>
                <p className="text-[16px] font-semibold text-slate-900 mb-1">You get back a professional report</p>
                <p className="text-[15px] text-slate-600">market insights, ROI projections, and strategic recommendations—ready for your board or accreditors</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-xl">
            <p className="text-[16px] font-semibold">
              No data entry. No consultant calls. Just evidence delivered fast.
            </p>
          </div>
        </div>

        {/* Audience Toggle */}
        <div className="flex justify-center gap-3 mb-16">
          <button
            onClick={() => setActiveAudience('individual')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeAudience === 'individual'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            For Program Designers
          </button>
          <button
            onClick={() => setActiveAudience('institutional')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeAudience === 'institutional'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            For Institutional Leaders
          </button>
        </div>

        {/* Where It Fits: Workflow Comparison */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-[28px] font-bold text-slate-900 mb-12 text-center">
            Where It Fits in Your Workflow
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div>
              <h4 className="text-[18px] font-bold text-slate-900 mb-6">Before Curriculum.ai</h4>
              <div className="space-y-3">
                {currentWorkflow.before.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-slate-400 rounded-full flex-shrink-0" />
                    <span className="text-[15px] text-slate-600">{step}</span>
                    {idx < currentWorkflow.before.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-400 ml-auto flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-[13px] text-red-700 font-semibold">
                  {activeAudience === 'individual'
                    ? '⏱️ Timeline: 4-6 weeks'
                    : '⏱️ Timeline: 3+ months'}
                </p>
              </div>
            </div>

            {/* After */}
            <div>
              <h4 className="text-[18px] font-bold text-slate-900 mb-6">With Curriculum.ai</h4>
              <div className="space-y-3">
                {currentWorkflow.after.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-[15px] text-slate-900 font-medium">{step}</span>
                    {idx < currentWorkflow.after.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-emerald-400 ml-auto flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-[13px] text-emerald-700 font-semibold">
                  {activeAudience === 'individual'
                    ? '✓ Timeline: 1-2 days'
                    : '✓ Timeline: 1-2 weeks'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What It Replaces */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-[28px] font-bold text-slate-900 mb-12 text-center">
            What It Replaces
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {currentReplaces.map((item, idx) => (
              <Card key={idx} className="border border-slate-200 bg-white hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 text-[12px] font-bold">✕</span>
                    </div>
                    <h4 className="text-[16px] font-bold text-slate-900 line-through text-slate-500">
                      {item.old}
                    </h4>
                  </div>
                  <div className="flex gap-3 items-start pl-9">
                    <span className="text-[14px] text-slate-600">
                      <span className="font-semibold text-slate-700">Used to:</span> {item.new}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
