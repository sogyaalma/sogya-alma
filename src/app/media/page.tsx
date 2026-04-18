import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/mdx";
import { getDatabaseRows } from "@/lib/csv-db";
import MediaLibraryClient from "@/components/MediaLibraryClient";

export default async function MediaCenterPage() {
  // Primary: MDX news posts (real authored content)
  const mdxPosts = getAllPosts("news");

  // Secondary: CSV news rows not already covered by MDX slugs
  const mdxSlugs = new Set(mdxPosts.map((p) => p.meta.slug));
  const rows = await getDatabaseRows();
  const csvNews = rows
    .filter((r) => r.TemplateType === "News")
    .filter((r) => !mdxSlugs.has(r.ID));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <MediaLibraryClient mdxPosts={mdxPosts} csvNews={csvNews} />
      <Footer />
    </div>
  );
}
