import { writeFileSync } from 'node:fs'

const target = await fetch(
  'http://127.0.0.1:9370/json/new?http://127.0.0.1:5173',
  { method: 'PUT' },
).then((response) => response.json())
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve) => socket.addEventListener('open', resolve, { once: true }))

let nextId = 0
const pending = new Map()
const errors = []
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.method === 'Runtime.exceptionThrown') {
    errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text)
  }
  if (!message.id || !pending.has(message.id)) return
  const { resolve, reject } = pending.get(message.id)
  pending.delete(message.id)
  if (message.error) reject(new Error(message.error.message))
  else resolve(message.result)
})
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params }))
  })
const evaluate = async (expression) => {
  const response = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  })
  return response.result.value
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
await send('Runtime.enable')

const results = []
for (const width of [320, 375, 430, 768, 1440]) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height: 900,
    deviceScaleFactor: 1,
    mobile: width < 600,
  })
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/#celebrations' })
  await delay(1400)
  await evaluate(
    "document.querySelector('.event-card--vidai').scrollIntoView({ behavior: 'instant', block: 'center' })",
  )
  await delay(900)

  const result = await evaluate(`(() => {
    const card = document.querySelector('.event-card--vidai')
    const artwork = card.querySelector('.event-card__artwork')
    const image = artwork.querySelector('img')
    const frameStyle = getComputedStyle(artwork)
    const rect = artwork.getBoundingClientRect()
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      imageLoaded: image.complete && image.naturalWidth > 0,
      imageSource: image.currentSrc,
      objectFit: getComputedStyle(image).objectFit,
      objectPosition: getComputedStyle(image).objectPosition,
      innerOutlineRemoved: getComputedStyle(artwork, '::before').display === 'none',
      outerFramePresent: frameStyle.borderTopWidth === '1px' &&
        frameStyle.borderTopStyle === 'solid',
      frameFitsViewport: rect.left >= 0 && rect.right <= innerWidth,
      imageTransparentType: image.currentSrc.endsWith('.png'),
    }
  })()`)
  results.push({ width, ...result })

  if (width === 375 || width === 1440) {
    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
    })
    writeFileSync(
      `/tmp/wedding-vidai-${width}.png`,
      Buffer.from(screenshot.data, 'base64'),
    )
  }
}

console.log(JSON.stringify({ results, errors }, null, 2))
socket.close()
