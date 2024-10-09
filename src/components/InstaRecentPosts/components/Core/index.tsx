import { fetchPosts } from "../../actions/fetchOrUpdatePosts";
import PostsCoreContent from "./client";

export default async function PostsCoreContentServer() {
  const posts = await fetchPosts();
  console.log("POSTS", posts?.length);
  return <PostsCoreContent posts={posts} />;
  // return <NoSwiperPostsCoreContent posts={posts} />;
}
