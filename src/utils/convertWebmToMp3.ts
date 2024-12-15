import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL, fetchFile } from '@ffmpeg/util'

export const convertWebmToMp3 = async (webmBlob: Blob) => {
  const ffmpeg = new FFmpeg()

  const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'
  try {
    const coreURL = await toBlobURL(
      `${baseURL}/ffmpeg-core.js`,
      'text/javascript'
    )
    const wasmURL = await toBlobURL(
      `${baseURL}/ffmpeg-core.wasm`,
      'application/wasm'
    )
    const workerURL = await toBlobURL(
      `${baseURL}/ffmpeg-core.worker.js`,
      'text/javascript'
    )

    const loadPromise = ffmpeg.load({
      coreURL,
      wasmURL,
      workerURL
    })

    const timeoutPromise = new Promise(
      (_, reject) =>
        setTimeout(() => reject(new Error('FFmpeg load timeout')), 30000) // 30 seconds timeout
    )

    await Promise.race([loadPromise, timeoutPromise])
  } catch (error) {
    console.error('Error loading FFmpeg core files:', error)
    throw new Error('Failed to load FFmpeg core files.')
  }

  // Write the input file to the virtual file system
  await ffmpeg.writeFile('input.webm', await fetchFile(webmBlob))

  // Convert the file to MP3
  await ffmpeg.exec(['-i', 'input.webm', 'output.mp3'])

  // Read the converted file
  const mp3Data = await ffmpeg.readFile('output.mp3')
  const blob = new Blob([mp3Data], { type: 'audio/mp3' })

  // Create a Blob from the file data
  return blob
}
