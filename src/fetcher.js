import { NotImplementedError, ServerError, ValidationError, NotFoundError, TimeoutError } from '@hckrnews/error'
import URLString from './url-generator.js'
import pino from 'pino'

const exampleAsyncFunction = async () => true
const AsyncFunction = exampleAsyncFunction.constructor

/**
 * Base of the fetchers.
 * This fetcher just get the data from fixtures.
 */
class Fetcher {
  constructor () {
    this.fetch = null
    this.logger = null
  }

  /**
   * Set the fetch method
   *
   * @param {any} fetch
   */
  setFetch (fetch) {
    if (fetch?.constructor !== Function && fetch?.constructor !== AsyncFunction) {
      throw new NotImplementedError({
        message: 'No fetch',
        value: fetch,
        type: Function,
        me: this.me
      })
    }

    this.fetch = fetch
  }

  get hasLogger () {
    return this.logger !== null && this.logger !== undefined
  }

  log (message, type = 'debug') {
    if (!this.hasLogger) {
      return
    }

    this.logger[type](message)
  }

  /**
   * Set the fetch method
   *
   * @param {function} logger
   */
  setLogger (logger) {
    const loggerIsAFunction = logger?.constructor === Function
    const loggerIsAnObject = logger?.constructor === Object
    const loggerIsPino = logger?.constructor === pino().constructor
    if (logger && !(loggerIsAFunction || loggerIsAnObject || loggerIsPino)) {
      throw new NotImplementedError({
        message: 'Invalid logger',
        value: logger,
        type: Function,
        me: this.me
      })
    }

    this.logger = logger
  }

  /**
   * Get the data from the fixtures.
   * Return the results as object.
   *
   * @param {string} url
   * @param {object} path
   * @param {object} searchParams
   *
   * @return {object}
   */
  async get ({ url, path, searchParams }) {
    const requestData = {
      url: (path || searchParams) ? URLString.create({ url, path, searchParams }) : url,
      method: 'GET'
    }
    this.log(`Call a ${requestData.method} request to ${requestData.url}`)

    const response = await this.fetch(requestData.url)

    this.validate({ requestData, response })

    return response.json()
  }

  validate ({ requestData, response }) {
    if (response.status >= 500) {
      throw new ServerError({
        message: `Cannot access the server, url: ${requestData.url}, status: ${response.status}`,
        value: { requestData, response },
        type: this.fetch,
        me: this.me
      })
    }

    if (response.status === 404) {
      throw new NotFoundError({
        message: `Page not found on the server, url: ${requestData.url}, status: ${response.status}`,
        value: { requestData, response },
        type: this.fetch,
        me: this.me
      })
    }

    if (response.status === 408) {
      throw new TimeoutError({
        message: `Cannot connect to the server, url: ${requestData.url}, status: ${response.status}`,
        value: { requestData, response },
        type: this.fetch,
        me: this.me
      })
    }

    if (response.status >= 400) {
      throw new ValidationError({
        message: `Wrong data send to the server, url: ${requestData.url}, status: ${response.status}`,
        value: { requestData, response },
        type: this.fetch,
        me: this.me
      })
    }
  }

  get me () {
    return this.constructor
  }

  /**
   * Create a fetcher
   *
   * @param {any} fetch
   *
   * @return {Fetcher}
   */
  static create ({ fetch, logger = null }) {
    const fetcher = new Fetcher()
    fetcher.setFetch(fetch)
    fetcher.setLogger(logger)

    return fetcher
  }
}

export default Fetcher
export {
  Fetcher
}
