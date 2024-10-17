import { headers } from "next/headers";
import { fetchPosts } from "../../actions/fetchOrUpdatePosts";
import PostsCoreContent from "./client";

export default async function PostsCoreContentServer() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent');

  const posts = await fetchPosts();

  return <PostsCoreContent posts={posts} userAgent={userAgent} />;
}
