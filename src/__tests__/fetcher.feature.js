import { expect, describe, it } from '@jest/globals'
import { fetcher } from '../index.js'
import fetch from '@hckrnews/auto-fetch'

describe('Test the local Fetcher in the fetcher', () => {
  it('It should work', async () => {
    const DefaultFetcher = fetcher()
    const currentFetcher = DefaultFetcher.create({ fetch })
    const results = await currentFetcher.get({ url: './src/__fixtures__/example.json' })
    const expectedResult = {
      test: 'ok'
    }

    expect(results).toEqual(expectedResult)
  })
})
