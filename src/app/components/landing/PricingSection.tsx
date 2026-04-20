import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CheckCircle2 } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for individuals and small teams",
      features: [
        "Up to 5 team members",
        "10GB data storage",
        "Basic analytics & reporting",
        "Email support",
        "API access"
      ],
      isRecommended: false,
      buttonVariant: "outline" as const
    },
    {
      name: "Professional",
      price: "$99",
      description: "For growing businesses and teams",
      features: [
        "Up to 25 team members",
        "100GB data storage",
        "Advanced analytics & AI insights",
        "Priority support (24/7)",
        "Custom integrations",
        "SSO & advanced security"
      ],
      isRecommended: true,
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited team members",
        "Unlimited data storage",
        "Custom analytics solutions",
        "Dedicated account manager",
        "On-premise deployment option",
        "Custom SLA & compliance"
      ],
      isRecommended: false,
      buttonVariant: "outline" as const
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20 mb-4">
            Pricing
          </Badge>
          <h2 className="text-[40px] leading-[1.2] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[18px] text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`
                ${plan.isRecommended 
                  ? 'border-2 border-[#0066CC] shadow-xl relative overflow-hidden' 
                  : 'border-2 border-slate-200 hover:border-[#0066CC] transition-colors'
                }
              `}
            >
              {plan.isRecommended && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066CC] to-[#0052A3]" />
                  <Badge className="absolute top-4 right-4 bg-[#0066CC] text-white">Recommended</Badge>
                </>
              )}
              <CardHeader className={`p-8 ${plan.isRecommended ? 'bg-gradient-to-br from-[#0066CC]/5 to-white' : ''}`}>
                <CardTitle className="text-[24px] mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-[16px]">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-[48px]">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span className="text-[14px]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="px-8 pb-8">
                {plan.isRecommended ? (
                  <Button className="w-full bg-[#0066CC] hover:bg-[#0052A3] shadow-lg">
                    Start Free Trial
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full border-2">
                    {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[14px] text-muted-foreground">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
