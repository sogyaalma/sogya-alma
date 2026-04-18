import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Point to the /content directory at the root of the project (if we want it outside src)
// or inside src/content. We'll use src/content for now.
const contentDirectory = path.join(process.cwd(), 'src', 'content');

export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  slug: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

// Ensure directory exists to avoid crashes
const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export const getPostSlugs = (folder: string): string[] => {
  const targetDir = path.join(contentDirectory, folder);
  ensureDirectoryExists(targetDir);
  const files = fs.readdirSync(targetDir);
  // Only grab .md or .mdx files
  return files.filter(file => /\.mdx?$/.test(file)).map(file => file.replace(/\.mdx?$/, ''));
};

export const getPostBySlug = (folder: string, slug: string): Post | null => {
  if (!slug) return null;
  
  try {
    const targetDir = path.join(contentDirectory, folder);
    const realSlug = slug.replace(/\.mdx?$/, '');
    
    // Check for both .md and .mdx
    let fullPath = path.join(targetDir, `${realSlug}.md`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(targetDir, `${realSlug}.mdx`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      meta: {
        title: data.title || 'بدون عنوان',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        category: data.category || 'عام',
        slug: realSlug,
      },
      content,
    };
  } catch (err) {
    console.error(`Error reading markdown file for slug: ${slug}`, err);
    return null;
  }
};

export const getAllPosts = (folder: string): Post[] => {
  const slugs = getPostSlugs(folder);
  const posts = slugs
    .map((slug) => getPostBySlug(folder, slug))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
};
