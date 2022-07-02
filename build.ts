import { $ } from "zx";
import { workspaces } from "./package.json";

async function main() {
  $`rm -rf dist`;
  $`mkdir -p dist/assets`;
  for (const workspace of workspaces) {
    await $`yarn build:${workspace}`;
    await $`cp ${workspace}/dist/index.html ./dist/${workspace}.html`;
    try { await $`test -f ${workspace}/dist/assets/*.js`; } catch (_) { continue; }
    await $`cp ${workspace}/dist/assets/* ./dist/assets/`;
  }
}

main();
