/**
 * 规范化并压缩 community-gallery 图片。
 */
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const ffmpeg = require('ffmpeg-static')

const GALLERY_DIR = path.join(__dirname, '..', 'public', 'community-gallery')
const WORK_DIR = path.join(GALLERY_DIR, '__compress_work__')
const OUT_DIR = path.join(WORK_DIR, 'out')
const MAX_WIDTH = 1600
const JPEG_QUALITY = 4

function listImageFiles(dir) {
  return fs.readdirSync(dir).filter((name) => {
    if (name.startsWith('__')) return false
    return /\.(jpe?g|png|webp|avif)$/i.test(name)
  })
}

function sortGalleryNames(names) {
  return names.slice().sort((a, b) => {
    const matchA = /^community-(\d+)\./i.exec(a)
    const matchB = /^community-(\d+)\./i.exec(b)
    if (matchA && matchB) return Number(matchA[1]) - Number(matchB[1])
    if (matchA) return -1
    if (matchB) return 1
    return a.localeCompare(b, 'en')
  })
}

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })
}

function compressToJpeg(inputPath, outputPath) {
  execFileSync(
    ffmpeg,
    [
      '-y',
      '-i',
      inputPath,
      '-vf',
      `scale='min(${MAX_WIDTH},iw)':-2`,
      '-q:v',
      String(JPEG_QUALITY),
      outputPath,
    ],
    { stdio: 'ignore' },
  )
}

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`
}

function main() {
  const images = sortGalleryNames(listImageFiles(GALLERY_DIR))
  if (images.length === 0) {
    throw new Error('community-gallery 中没有图片')
  }
  ensureCleanDir(WORK_DIR)
  ensureCleanDir(OUT_DIR)
  let beforeBytes = 0
  let afterBytes = 0
  images.forEach((name, index) => {
    const srcPath = path.join(GALLERY_DIR, name)
    beforeBytes += fs.statSync(srcPath).size
    const ext = path.extname(name)
    const stagedPath = path.join(WORK_DIR, `src-${String(index + 1).padStart(2, '0')}${ext}`)
    fs.copyFileSync(srcPath, stagedPath)
    const destName = `community-${String(index + 1).padStart(2, '0')}.jpg`
    const destPath = path.join(OUT_DIR, destName)
    compressToJpeg(stagedPath, destPath)
    afterBytes += fs.statSync(destPath).size
    console.log(`${name} -> ${destName}`)
  })
  for (const name of listImageFiles(GALLERY_DIR)) {
    fs.unlinkSync(path.join(GALLERY_DIR, name))
  }
  for (const name of fs.readdirSync(OUT_DIR)) {
    fs.renameSync(path.join(OUT_DIR, name), path.join(GALLERY_DIR, name))
  }
  fs.rmSync(WORK_DIR, { recursive: true, force: true })
  console.log(`count=${images.length}`)
  console.log(`before=${formatMb(beforeBytes)} after=${formatMb(afterBytes)}`)
}

main()
