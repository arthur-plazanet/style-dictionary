// src/utils/utopia.js

/**
 * Generate a Utopia fluid type scale.
 *
 * Based on https://utopia.fyi/type/calculator/
 * by James Gilyead & Trys Mudford
 */

export function generateUtopiaScale({
  minViewport = 360,
  maxViewport = 1280,
  minFont = 16,
  maxFont = 20,
  scaleMin = 1.2,
  scaleMax = 1.25,
  steps = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'md', 'sm', 'xs'],
} = {}) {
  const results: Record<number, string> = {}

  steps.forEach((step, index) => {
    const minSize = minFont * scaleMin ** index
    const maxSize = maxFont * scaleMax ** index

    const slope = ((maxSize - minSize) / (maxViewport - minViewport)) * 100
    const intercept = minSize - (slope / 100) * minViewport

    const clampValue = `clamp(${(minSize / 16).toFixed(3)}rem, ${(intercept / 16).toFixed(3)}rem + ${slope.toFixed(3)}vw, ${(maxSize / 16).toFixed(3)}rem)`
    // const clampValue = `clamp(${minSize / 16}rem, ${
    //   intercept / 16
    // }rem + ${slope}vw, ${maxSize / 16}rem)`;

    results[index] = clampValue
  })

  return results
}
