import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, Award } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Rachel Chen",
      role: "Lead Researcher, Stanford University",
      initials: "DR",
      gradient: "from-[#0066CC] to-[#0052A3]",
      quote: "InsightHub transformed how we analyze research data. The statistical tools are incredibly powerful yet easy to use. It's become essential to our workflow."
    },
    {
      name: "Michael Johnson",
      role: "VP of Analytics, TechCorp",
      initials: "MJ",
      gradient: "from-[#10B981] to-[#059669]",
      quote: "The ROI has been incredible. We're making data-driven decisions faster than ever, and the insights have directly impacted our bottom line. Highly recommend!"
    },
    {
      name: "Sarah Patel",
      role: "Director of IT, City of Boston",
      initials: "SP",
      gradient: "from-[#F59E0B] to-[#D97706]",
      quote: "Security and compliance were our top concerns. InsightHub exceeded expectations with FedRAMP certification and exceptional support for our public sector needs."
    }
  ];

  const trustedBy = ["Stanford", "MIT", "Microsoft", "Amazon", "NASA"];

  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <Badge className="bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20 mb-4">
            Testimonials
          </Badge>
          <h2 className="text-[40px] leading-[1.2] mb-4">
            Loved by teams worldwide
          </h2>
          <p className="text-[18px] text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust InsightHub for their data analytics needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-[16px] leading-[24px] mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white`}>
                    <span>{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-[14px] text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-16 border-t">
          <p className="text-center text-muted-foreground mb-8">Trusted by leading organizations</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {trustedBy.map((company, index) => (
              <div key={index} className="flex items-center gap-2">
                <Award className="w-6 h-6" />
                <span className="text-[18px]">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
