import User from "@/app/components/User";
import styles from "./page.module.css";
import Posts from "@/app/components/Posts";

export default async function Home() {
  return (
    <main className={styles.main}>
      <User />
      <Posts />
    </main>
  );
}
