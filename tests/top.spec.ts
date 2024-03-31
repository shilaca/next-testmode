import {
  test,
  expect,
  rest,
  ResponseResolver,
} from "next/experimental/testmode/playwright/msw";
import { ASSET_SERVER_URL } from "./constants";

const genItem = (id: number) => ({
  id: String(id),
  title: `Title ${id}`,
  updated_at: "2024-03-31T20:00:00+09:00",
  url: `https://example.com/${id}`,
});

const passthroughHandler: ResponseResolver = (req) => req.passthrough();

test("/ SnapShot", async ({ page, msw }) => {
  msw.use(
    // API のモック
    rest.get("https://qiita.com/api/v2/users/:id", async (req, res, ctx) => {
      const id = req.params.id as string;
      return res(
        ctx.status(200),
        ctx.json({
          id,
          profile_image_url: `${ASSET_SERVER_URL}/profile.png`,
        })
      );
    }),
    rest.get("https://qiita.com/api/v2/items", async (req, res, ctx) => {
      const posts = [...Array(4)].map((_, i) => genItem(i + 1));
      return res(ctx.status(200), ctx.json(posts));
    }),

    // ダミーアセットのモック
    rest.get(`${ASSET_SERVER_URL}/*`, passthroughHandler),

    // next/font 用のモック
    rest.get("https://fonts.googleapis.com/*", async (req, res, ctx) => {
      const data = await fetch(`${ASSET_SERVER_URL}/noto_sans_jp.css`);
      const css = await data.text();

      console.log("css: ", css);
      return res(ctx.status(200), ctx.text(css));
    }),
    rest.get("https://fonts.gstatic.com/*", passthroughHandler)
  );

  await page.goto(".");
  await page.waitForLoadState();
  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot("top.png", { fullPage: true });
});
