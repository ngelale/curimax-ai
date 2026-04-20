import { mockArticles } from "../mock-data";
import { ArticleCard } from "./article-card";
import Link from "next/link";

export const PopularArticles = () => {
  const popular = [...mockArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📚 Popular Articles</h2>
        <Link href="/help/articles" className="text-blue-600 hover:underline text-sm font-medium">
          View All →
        </Link>
      </div>
      <div className="space-y-4">
        {popular.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};