import { getUser } from "@/app/components/User/getUser";
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

export default async function User() {
  const user = await getUser("Shilaca");

  return (
    <section className={styles.container}>
      <Link href={`https://qiita.com/${user.id}`} target="_blank">
        <div className={styles.thumbnail}>
          <Image src={user.profile_image_url} alt="" width={100} height={100} />
        </div>
        <h1 className={styles.name}>{user.id}</h1>
      </Link>
    </section>
  );
}
