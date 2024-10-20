import { fetchPosts } from "../../actions/fetchOrUpdatePosts";
import PostsCoreContent from "./client";

export default async function PostsCoreContentServer() {

  const posts = await fetchPosts();

  return <PostsCoreContent posts={posts} />;
}
