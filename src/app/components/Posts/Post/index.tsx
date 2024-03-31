import Link from "next/link";
import { Item } from "../../../../../qiita-types";
import styles from "./styles.module.css";

export function Post(props: {
  post: Item;
  title: string;
  url: string;
  date: string;
}) {
  return (
    <article className={styles.container}>
      <Link
        style={{
          display: "block",
        }}
        href={props.url}
        target="_blank"
      >
        <h2>{props.title}</h2>
        <time dateTime={props.date}>{new Date(props.date).toDateString()}</time>
      </Link>
    </article>
  );
}
