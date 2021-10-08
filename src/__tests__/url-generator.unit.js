import { expect, describe, it } from '@jest/globals'
import URLString from '../url-generator.js'

const TestCases = [
  {
    description: 'Add ',
    url: 'https://www.gazelle.nl/test',
    path: { channel: 'pb1001', sku: '206003L' },
    searchParams: {},
    expectedResult: 'https://www.gazelle.nl/test/channel/pb1001/sku/206003L'
  },
  {
    description: 'Fetch get discounts should return multiple discounts',
    url: 'https://www.gazelle.nl/test',
    path: { channel: 'pb1001' },
    searchParams: {},
    expectedResult: 'https://www.gazelle.nl/test/channel/pb1001'
  },
  {
    description: 'It should return null if the channel is invalid',
    url: 'https://www.gazelle.nl/test',
    path: { channel: 'xyz' },
    searchParams: {},
    expectedResult: 'https://www.gazelle.nl/test/channel/xyz'
  },
  {
    description: 'It should return null if there are no search params',
    url: 'https://www.gazelle.nl/test',
    path: {},
    searchParams: null,
    expectedResult: 'https://www.gazelle.nl/test'
  },
  {
    description: 'It should return null if there are no search params',
    url: 'https://www.gazelle.nl/test',
    path: null,
    searchParams: { page: 1 },
    expectedResult: 'https://www.gazelle.nl/test?page=1'
  },
  {
    description: 'It should return null if there are no search params',
    url: 'https://www.gazelle.nl/test',
    path: {},
    searchParams: { page: 1, size: null },
    expectedResult: 'https://www.gazelle.nl/test?page=1'
  },
  {
    description: 'Fetch get discount should return assingle simple',
    url: 'https://www.gazelle.nl/test',
    path: { channel: 'pb1001', sku: '206003L' },
    searchParams: { page: 2, size: 5 },
    expectedResult: 'https://www.gazelle.nl/test/channel/pb1001/sku/206003L?page=2&size=5'
  },
  {
    description: 'It should set the key and if there is no value, dont add a slash',
    url: 'https://www.gazelle.nl/test',
    path: { channel: 'pb1001', sku: undefined },
    searchParams: { page: 2, size: 5 },
    expectedResult: 'https://www.gazelle.nl/test/channel/pb1001/sku?page=2&size=5'
  },
  {
    description: 'It should skip a search param if it doesnt contain a value',
    url: 'https://www.gazelle.nl/test',
    path: { channel: 'pb1001', sku: undefined },
    searchParams: { page: 2, size: undefined },
    expectedResult: 'https://www.gazelle.nl/test/channel/pb1001/sku?page=2'
  }
]

describe.each(TestCases)(
  'URL string helper',
  ({ description, url, path, searchParams, expectedResult }) => {
    it(description, async () => {
      const results = URLString.create({ url, path, searchParams })

      expect(results).toEqual(expectedResult)
    })
  }
)

const ErrorTestCases = [
  {
    description: 'It should throw an error if the url isnt a string',
    url: 42,
    path: {},
    searchParams: {},
    expectedResult: 'url isnt a valid string'
  },
  {
    description: 'It should throw an error if the url isnt valid',
    url: 'ok',
    path: {},
    searchParams: {},
    expectedResult: 'Invalid URL'
  },
  {
    description: 'It should throw an error if the path isnt an object',
    url: 'https://www.gazelle.nl',
    path: 42,
    searchParams: {},
    expectedResult: 'path isnt a valid object'
  },
  {
    description: 'It should throw an error if the search params isnt an object',
    url: 'https://www.gazelle.nl',
    path: {},
    searchParams: 42,
    expectedResult: 'searchParams isnt a valid object'
  }
]

describe.each(ErrorTestCases)(
  'test url string error handling',
  ({ description, url, path, searchParams, expectedResult }) => {
    it(description, () => {
      expect(() => URLString.create({ url, path, searchParams })).toThrowError(expectedResult)
    })
  }
)
