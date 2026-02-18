import { Post } from '@/lib/postsAPI';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { GrFormNextLink } from 'react-icons/gr';

export default function PostTile(post: Post) {
  return (
    <div className="py-4 border-b m-4">
      <p>{DateTime.fromJSDate(new Date(post.date)).toFormat('dd LLL yyyy')}</p>
      <h3 className="text-2xl">{post.title}</h3>
      <p className="text-lg">{post.excerpt}</p>
      <Link
        href={`/posts/${post.slug}`}
        className="flex flex-row items-center text-blue-500 hover:underline"
      >
        <p>Continue reading</p>
        <GrFormNextLink />
      </Link>
    </div>
  );
}
