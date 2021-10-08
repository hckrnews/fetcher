export default class URLString {
  constructor () {
    this.url = null
    this.path = {}
    this.searchParams = {}
  }

  setUrl (url) {
    if (!url || url.constructor !== String) {
      throw new Error('url isnt a valid string')
    }
    this.url = new URL(url).href
  }

  setSearchParams (searchParams) {
    if (!searchParams) {
      return
    }
    if (searchParams.constructor !== Object) {
      throw new Error('searchParams isnt a valid object')
    }
    this.searchParams = searchParams
  }

  setPath (path) {
    if (!path) {
      return
    }
    if (path.constructor !== Object) {
      throw new Error('path isnt a valid object')
    }
    this.path = path
  }

  urlReducer (accumulator, [key, value]) {
    if (!value) {
      return accumulator + '/' + key
    }

    return accumulator + '/' + key + '/' + value
  }

  toString () {
    const completeUrl = new URL(Object.entries(this.path).reduce(this.urlReducer, this.url))
    Object.entries(this.searchParams).forEach(([searchParam, searchValue]) => {
      if (searchValue) {
        completeUrl.searchParams.append(searchParam, searchValue)
      }
    })

    return completeUrl.href
  }

  /**
     * Generate an url from the url, path and search params
     *
     * @param {string} url
     * @param {object} path
     * @param {object} searchParams
     *
     * @return {string}
     */
  static create ({ url, path, searchParams }) {
    const newUrl = new URLString()
    newUrl.setUrl(url)
    newUrl.setPath(path)
    newUrl.setSearchParams(searchParams)

    return newUrl.toString()
  }
}
