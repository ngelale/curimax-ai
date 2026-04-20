'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, User, LayoutDashboard, Settings, Zap, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Simplified icon components (you can replace with your actual icons)
const icons = {
  Globe: (props: SVGProps<SVGSVGElement>) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Shield: (props: SVGProps<SVGSVGElement>) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Building: (props: SVGProps<SVGSVGElement>) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  Cpu: (props: SVGProps<SVGSVGElement>) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
  Chart: (props: SVGProps<SVGSVGElement>) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Users: (props: SVGProps<SVGSVGElement>) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Book: (props: SVGProps<SVGSVGElement>) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Document: (props: SVGProps<SVGSVGElement>) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Bank: (props: SVGProps<SVGSVGElement>) => <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>,
};

const navigationItems = {
  products: {
    title: 'Products',
    description: 'Restoration is not just healing Earth — it is asking, what kind of planet is Earth becoming?',
    items: [
      { 
        name: 'Smart Reforestation System (SRS)', 
        href: '/srs', 
        icon: icons.Globe,
        description: 'AI-powered ecosystem restoration platform',
        badge: 'Featured'
      },
      { 
        name: 'Restoration Based Credential (RBC)', 
        href: '/products/rbc', 
        icon: icons.Shield,
        description: 'Blockchain-verified restoration credentials',
        badge: undefined
      },
      { 
        name: 'Regenerative Economic Zones (REZ)', 
        href: '/rez', 
        icon: icons.Building,
        description: 'Scalable economic zones on restored land',
        badge: undefined
      },
      { 
        name: 'Ecosystem Intelligence as a Service (EIAS)', 
        href: '/eias', 
        icon: icons.Cpu,
        description: 'Real-time environmental monitoring & analytics',
        badge: undefined
      },
    ],
    featured: {
      name: 'Smart Reforestation System',
      href: '/srs',
      description: 'The world\'s most advanced ecosystem restoration platform'
    }
  },
  solutions: {
    title: 'Solutions',
    description: 'Design ecosystem KPIs that scale from leaf to biome to civilization',
    items: [
      {
        name: 'Restoration Zone Intelligence (RZI)',
        href: '/rzi',
        icon: icons.Chart,
        description: 'AI-powered land opportunity analysis',
        badge: 'New'
      },
      {
        name: 'Urban Tree Planting',
        href: '/urban-tree-planting',
        icon: icons.Globe,
        description: 'Strategic tree planting for cities',
        badge: 'MVP'
      },
      { 
        name: 'Land Restoration & Biodiversity', 
        href: '/solutions/restoration', 
        icon: icons.Globe,
        description: 'Comprehensive ecosystem restoration',
        badge: undefined
      },
      { 
        name: 'Local Job Creation & Training', 
        href: '/solutions/jobs', 
        icon: icons.Users,
        description: 'Sustainable employment opportunities',
        badge: undefined
      },
    ],
  },
  resources: {
    title: 'Resources',
    description: 'Discover our repository of resources for restoration and education.',
    items: [
      { 
        name: 'Blog & Research Articles', 
        href: '/resources/blog', 
        icon: icons.Document,
        description: 'Latest insights and research',
        badge: undefined
      },
      { 
        name: 'Reports & Whitepapers', 
        href: '/resources/reports', 
        icon: icons.Document,
        description: 'In-depth analysis and documentation',
        badge: undefined
      },
      { 
        name: 'Case Studies & Pilot Results', 
        href: '/resources/cases', 
        icon: icons.Book,
        description: 'Real-world success stories',
        badge: undefined
      },
      { 
        name: 'Restoration Playbook', 
        href: '/resources/playbook', 
        icon: icons.Book,
        description: 'Implementation guide',
        badge: undefined
      },
    ],
  },
  partner: {
    title: 'Frontier Intervensions',
    description: 'How together we can make a global impact.',
    items: [
      { 
        name: 'RBC Training Platform', 
        href: '/rbc-training', 
        icon: icons.Book,
        description: 'University-integrated talent engine',
        badge: 'New'
      },
      { 
        name: 'Institutional Collaborations', 
        href: '/partner/institutions', 
        icon: icons.Bank,
        description: 'Partner with universities',
        badge: undefined
      },
      { 
        name: 'Landowners & Communities', 
        href: '/partner/landowners', 
        icon: icons.Users,
        description: 'Transform your land',
        badge: undefined
      },
      { 
        name: 'NGOs & Social Enterprises', 
        href: '/partner/ngos', 
        icon: icons.Building,
        description: 'Collaborate on impact',
        badge: undefined
      },
    ],
  },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white border-b border-gray-200 shadow-md'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <icons.Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Envico360
            </span>
          </a>

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
                  className="flex items-center space-x-1 py-2 px-3 rounded-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
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
                  <div className="fixed left-0 top-16 w-full bg-white border-t border-b border-gray-200 shadow-xl">
                    <div className="max-w-6xl mx-auto px-8 py-8">
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h3>
                        <p className="text-gray-600 max-w-2xl">{section.description}</p>
                      </div>

                      {/* Grid Layout */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.items.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mr-3">
                              {item.icon && <item.icon className="w-5 h-5 text-green-600" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                                  {item.name}
                                </h4>
                                {item.badge && (
                                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                            </div>
                          </a>
                        ))}
                      </div>

                      {/* Featured Section */}
                      {'featured' in section && section.featured && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <a
                            href={section.featured.href}
                            className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="text-xs font-semibold text-green-600 mb-1">FEATURED</div>
                              <h4 className="font-bold text-gray-900 mb-1">{section.featured.name}</h4>
                              <p className="text-sm text-gray-600">{section.featured.description}</p>
                            </div>
                            <div className="ml-4 text-green-600">→</div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User/CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {username ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <User className="w-5 h-5 text-gray-600" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="font-semibold text-gray-800 truncate">{username}</p>
                    </div>
                    <a href="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LayoutDashboard className="w-4 h-4 mr-3" />
                      Dashboard
                    </a>
                    <a href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a href="/auth/signin" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                  Sign In
                </a>
                <a href="/auth/signup" className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors">
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            {Object.entries(navigationItems).map(([key, section]) => (
              <div key={key} className="mb-4">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  {section.title}
                  <ChevronDown className={`h-5 w-5 transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === key && (
                  <div className="mt-2 px-4 space-y-2">
                    {section.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                      >
                        {item.icon && <item.icon className="w-5 h-5 mr-3 text-green-600" />}
                        <span className="text-sm font-medium">{item.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-4 pt-4 border-t border-gray-200 space-y-2">
              <a href="/auth/signin" className="block w-full text-center px-4 py-3 text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50">
                Sign In
              </a>
              <a href="/auth/signup" className="block w-full text-center px-4 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800">
                Sign Up
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;