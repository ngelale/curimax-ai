import { mockCategories } from "../mock-data";
import { Card, CardContent } from "@/app/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const TopicBrowser = () => {
  return (
    <div className="space-y-6 px-8">
      <h2 className="text-2xl font-bold">Browse by Topic</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCategories.map((category) => (
          <Link key={category.id} href={`/help/category/${category.id}`}>
            <Card className="h-full hover:shadow-md hover:border-blue-300 transition-all group">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-semibold group-hover:text-blue-600 transition">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">{category.articleCount} articles</p>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};