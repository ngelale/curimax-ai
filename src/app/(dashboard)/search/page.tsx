"use client";

import { GlobalSearchClient } from "./GlobalSearchClient";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "sustainable finance";

  return <GlobalSearchClient initialQuery={query} />;
}
