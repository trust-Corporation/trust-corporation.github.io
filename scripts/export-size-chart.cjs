// Requires Playwright and a local Chrome installation; see DEPLOYMENT.md.
// Render the actual HTML table so the downloadable chart uses the same data.
const { chromium } = require('playwright');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

async function main() {
  const root = path.resolve(__dirname, '..');
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 1400 }, deviceScaleFactor: 2 });
    await page.goto(pathToFileURL(path.join(root, 'products/hex-wrench.html')).href, { waitUntil: 'load' });
    await page.locator('.size-diagram img').evaluate(async image => {
      image.loading = 'eager';
      await image.decode();
    });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: `
      html { scroll-behavior: auto; }
      .size-section { width: 1000px; padding: 0; }
      .size-download { display: none; }
      .size-table tbody tr:hover td { background: white; }
    ` });
    const output = path.join(root, 'images/catalog/hex-wrench-size-chart.png');
    await page.locator('.size-sheet').screenshot({ path: output, animations: 'disabled' });
    console.log(output);
  } finally {
    await browser.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
