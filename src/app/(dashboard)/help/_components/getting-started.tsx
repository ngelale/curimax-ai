import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { gettingStartedArticles } from "../mock-data";
import { ArrowRight, Clock } from "lucide-react";

export const GettingStarted = () => {
  return (
    <div className="bg-white rounded-lg border p-8">
      <h2 className="text-2xl font-bold mb-6">🚀 Getting Started</h2>
      <Accordion type="single" collapsible className="w-full">
        {gettingStartedArticles.map((article, idx) => (
          <AccordionItem value={article.id} key={article.id}>
            <AccordionTrigger className="text-base hover:no-underline py-4">
              <div className="flex justify-between items-center w-full pr-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg font-semibold">{article.title}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground space-y-3 pb-4">
              <p>{article.excerpt}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime} min read</span>
                </div>
                <a 
                  href={`/help/articles/${article.slug}`} 
                  className="flex items-center text-blue-600 hover:underline text-sm font-medium"
                >
                  Read more <ArrowRight className="h-3 w-3 ml-1" />
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};