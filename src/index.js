import Fetcher from './fetcher.js'
import localFetch from './local-fetcher.js'

const defaultFetchers = {
  default: Fetcher
}
const fetcher = (config = 'default', fetchers = {}) => {
  const allFetchers = {
    ...defaultFetchers,
    ...fetchers
  }
  const configKey = config.toLowerCase()

  return (allFetchers[configKey])
    ? allFetchers[configKey]
    : allFetchers.default
}

export default fetcher

export {
  fetcher,
  defaultFetchers,
  Fetcher,
  localFetch
}
