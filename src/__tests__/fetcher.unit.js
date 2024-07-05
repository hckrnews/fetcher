import { expect, describe, it } from '@jest/globals'
import { fetcher, Fetcher } from '../index.js'
import pino from 'pino'
import { ValidationError } from '@trojs/error'
import example from '../__fixtures__/example.js'
import TestFetcher from '../__fixtures__/test-fetcher.js'

const fetch = () => ({
  status: 200,
  json: async () => example
})

const testCases = [
  {
    description: 'Get should return 42',
    status: 200,
    url: 'https://gazelle.nl',
    path: { channel: 'pb1001', sku: '206003L' },
    fetcherName: 'default',
    expectedResult: example
  },
  {
    description: 'It should use the default fetcher if the fetcher isnt found',
    status: 200,
    url: 'https://gazelle.nl',
    path: { channel: 'pb1001', sku: '206003L' },
    fetcherName: 'notexisting',
    expectedResult: example
  }
]

describe.each(testCases)(
  'Test the Fetcher helper with test cases',
  ({ description, status, url, path, fetcherName, expectedResult }) => {
    it(description, async () => {
      const fetch = () => ({
        status,
        json: async () => example
      })
      const DefaultFetcher = fetcher(fetcherName)
      const currentFetcher = DefaultFetcher.create({ fetch })
      const results = await currentFetcher.get({ url, path })

      expect(results).toEqual(expectedResult)
    })
  }
)

const errorTestCases = [
  {
    description: 'Test the http status 400',
    status: 400,
    url: 'https://gazelle.nl',
    path: { channel: 'pb1001', sku: '206003L' },
    fetcherName: 'default',
    expectedResult: 'Wrong data send to the server, url: https://gazelle.nl//channel/pb1001/sku/206003L, status: 400'
  },
  {
    description: 'Test the http status 400',
    status: 401,
    url: 'https://gazelle.nl',
    path: { channel: 'pb1001', sku: '206003L' },
    fetcherName: 'default',
    expectedResult: 'Wrong data send to the server, url: https://gazelle.nl//channel/pb1001/sku/206003L, status: 401'
  },
  {
    description: 'Test the http status 400',
    status: 403,
    url: 'https://gazelle.nl',
    path: { channel: 'pb1001', sku: '206003L' },
    fetcherName: 'default',
    expectedResult: 'Wrong data send to the server, url: https://gazelle.nl//channel/pb1001/sku/206003L, status: 403'
  },
  {
    description: 'Test the http status 400',
    status: 404,
    url: 'https://gazelle.nl',
    path: { channel: 'pb1001', sku: '206003L' },
    fetcherName: 'default',
    expectedResult: 'Page not found on the server, url: https://gazelle.nl//channel/pb1001/sku/206003L, status: 404'
  },
  {
    description: 'Test the http status 400',
    status: 405,
    url: 'https://gazelle.nl',
    path: { channel: 'pb1001', sku: '206003L' },
    fetcherName: 'default',
    expectedResult: 'Wrong data send to the server, url: https://gazelle.nl//channel/pb1001/sku/206003L, status: 405'
  },
  {
    description: 'Test the http status 408 (timeout)',
    status: 408,
    url: 'https://gazelle.nl',
    path: { channel: 'pb1001', sku: '206003L' },
    fetcherName: 'default',
    expectedResult: 'Cannot connect to the server, url: https://gazelle.nl//channel/pb1001/sku/206003L, status: 408'
  },
  {
    description: 'Test the http status 400',
    status: 422,
    url: 'https://gazelle.nl',
    path: { channel: 'pb1001', sku: '206003L' },
    fetcherName: 'default',
    expectedResult: 'Wrong data send to the server, url: https://gazelle.nl//channel/pb1001/sku/206003L, status: 422'
  },
  {
    description: 'Test the http status 400',
    status: 500,
    url: 'https://gazelle.nl',
    path: { channel: 'pb1001', sku: '206003L' },
    fetcherName: 'default',
    expectedResult: 'Cannot access the server, url: https://gazelle.nl//channel/pb1001/sku/206003L, status: 500'
  },
  {
    description: 'Test the http status 400',
    status: 503,
    url: 'https://gazelle.nl',
    path: { channel: 'pb1001', sku: '206003L' },
    fetcherName: 'default',
    expectedResult: 'Cannot access the server, url: https://gazelle.nl//channel/pb1001/sku/206003L, status: 503'
  }
]

describe.each(errorTestCases)(
  'Test the Fetcher helper with error test cases',
  ({ description, status, url, path, fetcherName, expectedResult }) => {
    it(description, async () => {
      const fetch = () => ({
        status,
        json: async () => example
      })
      const DefaultFetcher = fetcher(fetcherName)
      const currentFetcher = DefaultFetcher.create({ fetch })

      await expect(currentFetcher.get({ url, path }))
        .rejects.toThrow(expectedResult)
    })
  }
)

describe('Test a custom Fetcher', () => {
  it('It should run the get on the custom fetcher', async () => {
    const fetchers = {
      test: TestFetcher
    }
    const NewTestFetcher = fetcher('test', fetchers)
    const logger = {
      debug: (message) => console.debug(message)
    }
    const testFetcher = NewTestFetcher.create({ fetch, logger })
    const results = await testFetcher.get({ url: 'https://gazelle.nl' })
    expect(results).toEqual(42)
  })

  it('It should use the default fetcher if the fetcher isnt found', async () => {
    const fetchers = {
      test: TestFetcher
    }
    const NewTestFetcher = fetcher('test2', fetchers)
    const logger = {
      debug: (message) => console.debug(message)
    }
    const testFetcher = NewTestFetcher.create({ fetch, logger })
    const results = await testFetcher.get({ url: 'https://gazelle.nl' })
    expect(results).toEqual(example)
  })

  it('It should run the get on the custom fetcher', async () => {
    const fetchers = {
      test: TestFetcher
    }
    const NewTestFetcher = fetcher('test', fetchers)
    const logger = {
      debug: (message) => console.debug(message)
    }
    const testFetcher = NewTestFetcher.create({ fetch, logger })
    const results = await testFetcher.get({ url: 'https://gazelle.nl' })
    expect(results).toEqual(42)
  })

  it('It should run the get on the custom fetcher', async () => {
    const fetchers = {
      test: TestFetcher
    }
    const NewTestFetcher = fetcher('test', fetchers)
    const logger = pino()
    const testFetcher = NewTestFetcher.create({ fetch, logger })
    const results = await testFetcher.get({ url: 'https://gazelle.nl' })
    expect(results).toEqual(42)
  })

  it('It should throw an exception if the logger is invalid', async () => {
    const fetchers = {
      test: TestFetcher
    }
    const NewTestFetcher = fetcher('test', fetchers)
    const logger = 42
    expect(() => { NewTestFetcher.create({ fetch, logger }) }).toThrow('Invalid logger')
  })

  it('It should throw an error if there is no fetch given', () => {
    expect(() => { Fetcher.create({ fetch: null }) }).toThrow('No fetch')
  })

  it('It should has all the error details if the logger isnt valid', () => {
    try {
      Fetcher.create({ fetch: 42 })
    } catch (error) {
      expect(error.message).toEqual('No fetch')
      expect(error.value).toEqual(42)
      expect(error.type instanceof Function).toEqual(true)
      expect(error.me).toEqual(Fetcher)
    }
  })

  it('It should has all the error details if the http status is 400+', async () => {
    const url = 'https://gazelle.nl'
    const path = { channel: 'pb1001', sku: '206003L' }
    const fetch = () => ({
      status: 418,
      json: async () => example
    })
    const DefaultFetcher = fetcher()
    const currentFetcher = DefaultFetcher.create({ fetch })

    try {
      await currentFetcher.get({ url, path })
    } catch (error) {
      expect(error instanceof ValidationError).toEqual(true)
      expect(error.message).toEqual('Wrong data send to the server, url: https://gazelle.nl//channel/pb1001/sku/206003L, status: 418')
      expect(error.value.requestData).toEqual({
        url: 'https://gazelle.nl//channel/pb1001/sku/206003L',
        method: 'GET'
      })
      expect(error.type instanceof fetch.constructor).toEqual(true)
      expect(error.me).toEqual(Fetcher)
    }
  })
})
