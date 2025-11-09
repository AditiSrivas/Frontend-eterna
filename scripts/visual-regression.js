const fs = require('fs')
const path = require('path')
const { PNG } = require('pngjs')
const pixelmatch = require('pixelmatch')

const baselineDir = path.join(process.cwd(), 'visual-baseline')
const outputDir = path.join(process.cwd(), 'visual-output')
const diffDir = path.join(process.cwd(), 'visual-diff')
if (!fs.existsSync(diffDir)) fs.mkdirSync(diffDir)

function compare(name) {
  const baselinePath = path.join(baselineDir, name)
  const outputPath = path.join(outputDir, name)
  const diffPath = path.join(diffDir, name)
  if (!fs.existsSync(baselinePath) || !fs.existsSync(outputPath)) {
    console.warn('Missing baseline or output for', name)
    return
  }
  const img1 = PNG.sync.read(fs.readFileSync(baselinePath))
  const img2 = PNG.sync.read(fs.readFileSync(outputPath))
  const { width, height } = img1
  const diff = new PNG({ width, height })
  const mismatched = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 })
  fs.writeFileSync(diffPath, PNG.sync.write(diff))
  const pct = (mismatched / (width * height)) * 100
  console.log(`${name}: ${pct.toFixed(2)}% pixels differ`)
  if (pct > 0.2) process.exitCode = 1
}

compare('home.png')


