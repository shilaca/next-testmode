import "server-only";
import { Item } from "../../../../qiita-types";

export async function getPostData() {
  const url = new URL("https://qiita.com/api/v2/items");
  url.searchParams.set("page", "1");
  url.searchParams.set("per_page", "20");
  url.searchParams.set("query", "user:Shilaca");

  const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
  const data = (await res.json()) as Item[];

  return data;
}
