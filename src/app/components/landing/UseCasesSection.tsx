import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { GraduationCap, Building2, Landmark, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";

export function UseCasesSection() {
  const useCases = [
    {
      icon: GraduationCap,
      title: "Academic Research",
      description: "Accelerate research with advanced statistical analysis and data visualization",
      color: "#0066CC",
      gradient: "from-[#0066CC] to-[#0052A3]",
      features: [
        "Statistical modeling and hypothesis testing",
        "Research collaboration tools",
        "Publication-ready visualizations",
        "Grant reporting and compliance"
      ],
      isPopular: false
    },
    {
      icon: Building2,
      title: "Corporate Analytics",
      description: "Drive business growth with data-driven insights and reporting",
      color: "#10B981",
      gradient: "from-[#10B981] to-[#059669]",
      features: [
        "Executive dashboards and KPI tracking",
        "Revenue and sales analytics",
        "Customer behavior insights",
        "Automated reporting workflows"
      ],
      isPopular: true
    },
    {
      icon: Landmark,
      title: "Government & Public",
      description: "Enhance transparency and efficiency with secure data solutions",
      color: "#F59E0B",
      gradient: "from-[#F59E0B] to-[#D97706]",
      features: [
        "FedRAMP and compliance ready",
        "Public data transparency portals",
        "Budget and resource allocation",
        "Citizen engagement analytics"
      ],
      isPopular: false
    }
  ];

  return (
    <section id="use-cases" className="py-24 bg-slate-50">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 mb-4">
            Use Cases
          </Badge>
          <h2 className="text-[40px] leading-[1.2] mb-4">
            Built for every industry
          </h2>
          <p className="text-[18px] text-muted-foreground max-w-2xl mx-auto">
            From academia to enterprise, our platform adapts to your unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            const ringClass = useCase.isPopular ? `ring-2 ring-${useCase.color}` : "";
            
            return (
              <Card key={index} className={`border-0 shadow-lg overflow-hidden ${useCase.isPopular ? 'shadow-xl ring-2 ring-[#10B981]' : ''} relative`}>
                {useCase.isPopular && (
                  <Badge className="absolute top-4 right-4 bg-[#10B981] text-white">Most Popular</Badge>
                )}
                <div className={`h-3 bg-gradient-to-r ${useCase.gradient}`} />
                <CardHeader className="p-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${useCase.color}10` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: useCase.color }} />
                  </div>
                  <CardTitle className="text-[28px]">{useCase.title}</CardTitle>
                  <CardDescription className="text-[16px] leading-[24px]">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <ul className="space-y-3">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span className="text-[14px]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="px-8 pb-8">
                  {useCase.isPopular ? (
                    <Button 
                      className="w-full text-white shadow-lg"
                      style={{ backgroundColor: useCase.color }}
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full border-2 hover:text-white"
                      style={{ 
                        borderColor: useCase.color,
                        color: useCase.color
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = useCase.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
