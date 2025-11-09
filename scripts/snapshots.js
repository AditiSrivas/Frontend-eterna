/* minimal placeholder script to generate snapshots with Playwright */
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

async function main() {
  const outDir = path.join(process.cwd(), 'visual-output')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await page.screenshot({ path: path.join(outDir, 'home.png'), fullPage: true })
  await browser.close()
  console.log('Snapshot saved to visual-output/home.png')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })


