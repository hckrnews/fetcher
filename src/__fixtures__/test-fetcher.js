import Fetcher from '../fetcher.js'

export default class TestFetcher extends Fetcher {
  async get ({ url, path, searchParams }) {
    this.log(`Call a request to ${url}`)
    return 42
  }

  static create ({ fetch, logger }) {
    const fetcher = new TestFetcher()
    fetcher.setFetch(fetch)
    fetcher.setLogger(logger)

    return fetcher
  }
}
