import "server-only";
import { User } from "../../../../qiita-types";

export async function getUser(userId: string) {
  const url = new URL(`https://qiita.com/api/v2/users/${userId}`);

  const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
  const data = (await res.json()) as User;

  return data;
}
