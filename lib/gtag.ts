export const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || ''

export const existsGaId = GA_MEASUREMENT_ID !== '';

export function pageview(path: string) {
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: path })
}