import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

export type Post = {
  slug: string;
  title: string;
  date: string;
  updatedDate: string;
  excerpt: string;
  content: string;
};

/* functions retrieved from https://github.com/vercel/next.js/blob/canary/examples/blog-starter/src/lib/api.ts */

const postsDirectory = join(process.cwd(), 'app/posts/content');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
