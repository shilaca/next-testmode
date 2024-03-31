import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { ASSET_SERVER_PORT } from "./constants";

export default async function globalSetup() {
  const server = http.createServer((req, res) => {
    const paths = req.url?.split("/");

    if (paths?.[1] === "profile.png") {
      res.writeHead(200, {
        "Content-Type": "image/png",
      });
      const img = fs.readFileSync(
        path.resolve(__dirname, "./assets/profile.png")
      );
      res.end(img, "binary");
      return;
    } else if (paths?.[1] === "noto_sans_jp.css") {
      res.writeHead(200, {
        "Content-Type": "text/css",
      });
      const css = fs.readFileSync(
        path.resolve(__dirname, "./assets/noto_sans_jp.css")
      );
      res.end(css, "utf-8");
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end();
  });
  server.listen(ASSET_SERVER_PORT);
}
