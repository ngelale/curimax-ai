import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Video, BookOpen, MessageSquare, Mail } from "lucide-react";

const actions = [
  {
    icon: Video,
    title: "🎬 Video Tour",
    description: "5 min overview",
    buttonText: "Watch Now",
    color: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: BookOpen,
    title: "📖 User Guide",
    description: "Complete docs",
    buttonText: "Read Docs",
    color: "from-green-50 to-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: MessageSquare,
    title: "💬 Live Chat",
    description: "Mon-Fri 9-5 ET",
    buttonText: "Start Chat",
    color: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Mail,
    title: "📧 Email Us",
    description: "24hr response",
    buttonText: "Send Email",
    color: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600",
  },
];

export const QuickActions = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-8">
      {actions.map((action) => (
        <Card 
          key={action.title} 
          className={`border-0 bg-gradient-to-br ${action.color} hover:shadow-lg transition`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">{action.title}</CardTitle>
            <action.icon className={`h-6 w-6 ${action.iconColor}`} />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{action.description}</p>
            <Button 
              className="mt-4 w-full text-xs font-medium"
              size="sm"
            >
              {action.buttonText}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};