import { expect, describe, it } from '@jest/globals'
import localFetcher from '../local-fetcher.js'

describe('Test the local Fetcher', () => {
  it('It should get the json from the file', async () => {
    const { json } = await localFetcher('./src/__fixtures__/example.json')

    expect(json()).toEqual({
      test: 'ok'
    })
  })

  it('It should get the text of the file', async () => {
    const { text } = await localFetcher('./src/__fixtures__/example.json')

    expect(text()).toEqual(`{
    "test": "ok"
}
`)
  })

  it('It should the stream of the file', async () => {
    const { body } = await localFetcher('./src/__fixtures__/example.json')

    let result = ''
    body.on('data', (chunk) => {
      result += chunk
    })

    body.on('end', () => {
      const data = JSON.parse(result)
      expect(data).toEqual({
        test: 'ok'
      })
    })
  })
})
