import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { GrFormPreviousLink } from 'react-icons/gr';

const posts = {
  'how-much-should-i-practice': () => import('../content/how-much-should-i-practice.mdx'),
  'how-to-structure-a-music-practice-session': () => import('../content/how-to-structure-a-music-practice-session.mdx')
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const loader = posts[slug as keyof typeof posts];
  if (!loader) return { title: 'Not found' };

  const mod = await loader();

  // Frontmatter is available as a named export
  const frontmatter = mod.frontmatter || {};

  return {
    title: frontmatter.title ?? slug,
    description: frontmatter.excerpt ?? '',
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  const loader = posts[slug as keyof typeof posts];
  if (!loader) notFound();

  const mod = await loader();
  const Content = mod.default;
  const frontmatter = mod.frontmatter || {};

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <header className="mb-10">
        <Link href="/#posts" className="flex flex-row items-center text-blue-500 hover:underline">
          <GrFormPreviousLink />
          <p>Back to posts</p>
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {frontmatter.title}
        </h1>

        {frontmatter.date && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Published: {DateTime.fromJSDate(new Date(frontmatter.date)).toFormat('dd LLL yyyy')}
          </p>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <Content />
      </div>
    </article>
  );
}
