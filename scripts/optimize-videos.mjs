import { spawn } from 'node:child_process'
import { readdir, stat, rename, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const force = process.argv.includes('--force')
const run = (command, args) => new Promise((resolve, reject) => {
  const process = spawn(command, args, { stdio: ['ignore', 'ignore', 'pipe'] })
  let stderr = ''
  process.stderr.on('data', chunk => { stderr = (stderr + chunk).slice(-4000) })
  process.on('error', reject)
  process.on('exit', code => code === 0 ? resolve() : reject(new Error(`${command} exited ${code}: ${stderr}`)))
})

// Keep supplied recordings intact. Only these smaller files are used in cards.
for (const locale of ['vi', 'en']) {
  const directory = path.join(root, 'public/videos', locale)
  for (const filename of await readdir(directory)) {
    if (!filename.endsWith('.mp4') || filename.endsWith('.preview.mp4') || filename.endsWith('.tmp.mp4')) continue
    const original = path.join(directory, filename)
    const output = original.replace(/\.mp4$/, '.preview.mp4')
    const sourceInfo = await stat(original)
    const existing = await stat(output).catch(() => null)
    if (!force && existing && existing.mtimeMs >= sourceInfo.mtimeMs) continue
    const temporary = output.replace(/\.mp4$/, '.tmp.mp4')
    try {
      await run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', original,
        '-map', '0:v:0', '-an', '-vf', "scale=w='min(1280,iw)':h=-2", '-r', '24',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart', temporary])
      await rename(temporary, output)
      const optimized = await stat(output)
      console.log(`${locale}/${filename}: ${sourceInfo.size} → ${optimized.size} bytes`)
    } catch (error) {
      await unlink(temporary).catch(() => {})
      throw error
    }
  }
}
