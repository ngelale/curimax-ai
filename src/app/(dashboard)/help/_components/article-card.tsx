import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { HelpArticle } from "../types";
import { Eye, Star, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ArticleCardProps {
  article: HelpArticle;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link href={`/help/articles/${article.slug}`}>
      <Card className="h-full flex flex-col hover:shadow-md hover:border-blue-300 transition-all group bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-base group-hover:text-blue-600 transition">{article.title}</CardTitle>
          <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {article.views.toLocaleString()} views
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {article.rating}/5
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {article.readTime} min
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-blue-600 text-sm font-medium mt-3 group-hover:gap-2 transition">
            Read article <ArrowRight className="h-3 w-3" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};