import { Sparkles, TrendingUp, Globe, Award } from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Security", href: "#" },
      { label: "Roadmap", href: "#" }
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" }
    ],
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Compliance", href: "#" }
    ]
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#0052A3] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-[20px]">InsightHub</span>
            </div>
            <p className="text-white/70 text-[14px] leading-[20px]">
              Transform your data into actionable insights with the most powerful analytics platform.
            </p>
          </div>

          <div>
            <h4 className="text-[16px] mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/70 hover:text-white text-[14px] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[16px] mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/70 hover:text-white text-[14px] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[16px] mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/70 hover:text-white text-[14px] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-[14px]">
            © 2026 InsightHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <TrendingUp className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <Award className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
