import { Post } from "@/app/components/Posts/Post";
import { getPostData } from "@/app/components/Posts/getPostData";
import styles from "./styles.module.css";

export default async function Posts() {
  const posts = await getPostData();

  return (
    <section>
      <h1>Posts</h1>
      <div className={styles.container}>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            title={post.title}
            url={post.url}
            date={post.updated_at}
          />
        ))}
      </div>
    </section>
  );
}
