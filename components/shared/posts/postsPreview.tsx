import { getAllPosts, Post } from '@/lib/postsAPI';
import PostTile from './postTile';

export default function PostsPreview() {
  const allPosts = getAllPosts();

  return (
    <div id="posts" className="py-8 p-2 min-h-[80vh] bg-neutral-100 border-b-2">
      <h2 className="font-sans  md:text-4xl text-4xl m-4 mb-4 text-center">From the blog</h2>
      <p className="font-sans  md:text-xl text-xl m-4 mb-8 text-center text-neutral-500">
        Learn how to manage you practice
      </p>
      {allPosts.map((i: Post, ind) => (
        <PostTile {...i} key={ind} />
      ))}
    </div>
  );
}
