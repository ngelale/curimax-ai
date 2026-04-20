'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, User, LayoutDashboard, Settings, Zap, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';

/**
 * Header Component - Curriculum.ai
 * Dual-Audience Optimization (Program Designers + Institutional Buyers)
 * Education-Focused Positioning with Professional Design System
 */

const navigationItems = {
  product: {
    title: 'Product',
    description: 'AI-powered curriculum intelligence',
    items: [
      { 
        name: 'AI Analysis Engine', 
        href: '/product/analysis', 
        icon: Zap,
        description: 'Job market, competitor & financial analysis in minutes',
        badge: 'Core'
      },
      { 
        name: 'Program Designer', 
        href: '/product/designer', 
        icon: BookOpen,
        description: 'Evidence-backed curriculum templates & customization',
        badge: undefined
      },
      { 
        name: 'Financial Modeling', 
        href: '/product/financials', 
        icon: TrendingUp,
        description: 'Break-even, ROI, and capacity planning',
        badge: undefined
      },
      { 
        name: 'Report Generation', 
        href: '/product/reports', 
        icon: BookOpen,
        description: 'Board-ready analysis in minutes, not weeks',
        badge: undefined
      },
    ],
    featured: {
      name: 'Try Free Analysis',
      href: '/demo',
      description: 'See how fast we can turn data into strategy'
    }
  },
  solutions: {
    title: 'For Your Role',
    description: 'Workflows built for how you actually work',
    items: [
      {
        name: 'Program Designers',
        href: '/for/designers',
        icon: BookOpen,
        description: 'From blank page to defensible program',
        badge: undefined
      },
      {
        name: 'Academic Institutions',
        href: '/for/institutions', 
        icon: User,
        description: 'Replace the portfolio review bottleneck',
        badge: undefined
      },
      { 
        name: 'Corporate L&D Teams', 
        href: '/for/learning-teams', 
        icon: TrendingUp,
        description: 'Launch training programs with confidence',
        badge: undefined
      },
      { 
        name: 'Workforce Agencies', 
        href: '/for/workforce', 
        icon: User,
        description: 'Build programs aligned to real labor demand',
        badge: undefined
      },
    ],
  },
  resources: {
    title: 'Learn',
    description: 'Curriculum design insights & benchmarks',
    items: [
      { 
        name: 'How It Works', 
        href: '/how-it-works', 
        icon: BookOpen,
        description: 'See the full analysis workflow',
        badge: undefined
      },
      { 
        name: 'Case Studies', 
        href: '/case-studies', 
        icon: TrendingUp,
        description: 'Programs designed with our platform',
        badge: undefined
      },
      { 
        name: 'Benchmarks & Data', 
        href: '/benchmarks', 
        icon: BookOpen,
        description: 'Industry labor market data by role',
        badge: undefined
      },
      { 
        name: 'Help Center', 
        href: '/help', 
        icon: User,
        description: 'Guides, FAQs, and support',
        badge: undefined
      },
    ],
  },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white border-b border-slate-200 shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-85 transition-opacity flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-slate-900 hidden sm:inline">
              Curriculum.ai
            </span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded hidden md:inline">
              Evidence-Powered
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {Object.entries(navigationItems).map(([key, section]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center space-x-1 py-2 px-3 rounded-lg font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all duration-150"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === key ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                {activeDropdown === key && (
                  <div className="fixed left-0 top-16 w-full bg-white border-t border-b border-slate-200 shadow-lg">
                    <div className="max-w-6xl mx-auto px-8 py-8">
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{section.title}</h3>
                        <p className="text-slate-600 max-w-2xl text-sm">{section.description}</p>
                      </div>

                      {/* Grid Layout */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                        {section.items.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              className="group flex flex-col p-4 rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300"
                            >
                              <div className="flex items-start gap-3 mb-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                                  <IconComponent className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors text-sm">
                                    {item.name}
                                  </h4>
                                  {item.badge && (
                                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full inline-block mt-1">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
                            </a>
                          );
                        })}
                      </div>

                      {/* Featured Call */}
                      {'featured' in section && section.featured && (
                        <div className="pt-6 border-t border-slate-200">
                          <a
                            href={section.featured.href}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all border border-blue-200 hover:border-blue-300"
                          >
                            <div>
                              <div className="text-xs font-bold text-blue-600 mb-1">FEATURED</div>
                              <h4 className="font-semibold text-slate-900 mb-0.5">{section.featured.name}</h4>
                              <p className="text-sm text-slate-700">{section.featured.description}</p>
                            </div>
                            <div className="text-blue-600 font-bold ml-6 flex-shrink-0">→</div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section: Auth + CTA */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {username ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                >
                  <User className="w-4 h-4 text-slate-600" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-200">
                      <p className="text-xs text-slate-500 mb-0.5">Signed in as</p>
                      <p className="font-semibold text-slate-800 truncate">{username}</p>
                    </div>
                    <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                      <LayoutDashboard className="w-4 h-4 mr-3" />
                      Dashboard
                    </Link>
                    <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/signin" className="hidden sm:block px-4 py-2 text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm shadow-sm hover:shadow-md">
                  Start Free Trial
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 bg-slate-50">
            {Object.entries(navigationItems).map(([key, section]) => (
              <div key={key} className="mb-4">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {section.title}
                  <ChevronDown className={`h-5 w-5 transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === key && (
                  <div className="mt-2 px-4 space-y-2">
                    {section.items.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center p-3 text-slate-700 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <IconComponent className="w-4 h-4 mr-3 text-blue-600" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div className="px-4 pt-4 border-t border-slate-200 space-y-2">
              <Link href="/auth/signin" className="block w-full text-center px-4 py-3 text-slate-700 font-semibold border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">
                Sign In
              </Link>
              <Link href="/auth/signup" className="block w-full text-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
