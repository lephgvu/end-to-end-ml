import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Hearthline estimator", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Hearthline — Boston Home Value Estimator<\/title>/i);
  assert.match(html, /See the signal/);
  assert.match(html, /13 (?:neighborhood and )?housing signals/i);
  assert.match(html, /Calculate estimate/);
  assert.match(html, /Fine-tune all signals/);
  assert.match(html, /Educational estimate, not a professional appraisal/);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the finished product metadata and prediction proxy wired", async () => {
  const [page, layout, estimator, apiRoute, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/HomeEstimator.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/predict/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<HomeEstimator \/>/);
  assert.match(layout, /Hearthline — Boston Home Value Estimator/);
  assert.match(layout, /summary_large_image/);
  assert.match(layout, /\/og\.png/);
  assert.match(estimator, /const features = \[/);
  assert.match(estimator, /fetch\("\/api\/predict"/);
  assert.match(apiRoute, /https:\/\/housing-app-rqh8\.onrender\.com\/predict/);
  assert.match(apiRoute, /REQUIRED_FEATURES/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
});
