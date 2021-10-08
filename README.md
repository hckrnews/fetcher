# Fetcher

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Scrutinizer Code Quality][scrutinizer-image]][scrutinizer-url]

With this package you can create fetchers.

## Example usage

```javascript
import { fetcher, Fetcher } from '@hckrnews/fetcher'
import { MagentoMockFetcher } from './magento-fetcher.js'
import fetch from 'node-fetch'
import { logger as stackdriver } from './logger-stackdriver.js'

const logger = stackdriver()

// Default fetcher
const defaultFetcher = Fetcher.create({ fetch, logger })
const result = await defaultFetcher.get({ url, path, searchParams })

// Default fetcher option 2
const DefaultFetcher = fetcher()

const defaultFetcher = DefaultFetcher.create({ fetch, logger })
const result = await defaultFetcher.get({ url, path, searchParams })

// Use a custom fetcher
const magentoFetcher = MagentoMockFetcher.create({ fetch, logger })
const result = await magentoFetcher.get({ url, path, searchParams })

// Add a custom fetcher
const fetchers = {
  magento: MagentoMockFetcher
}
const MagentoFetcher = fetcher('magento', fetchers)

const magentoFetcher = MagentoFetcher.create({ fetch, logger })
const result = await magentoFetcher.get({ url, path, searchParams })
```

[npm-url]: https://www.npmjs.com/package/@hckrnews/fetcher
[npm-image]: https://img.shields.io/npm/v/@hckrnews/fetcher.svg
[travis-url]: https://app.travis-ci.com/hckrnews/fetcher
[travis-image]: https://app.travis-ci.com/hckrnews/fetcher.svg?branch=main
[coveralls-url]: https://coveralls.io/r/hckrnews/fetcher
[coveralls-image]: https://img.shields.io/coveralls/hckrnews/fetcher/main.svg
[scrutinizer-url]: https://scrutinizer-ci.com/g/hckrnews/fetcher/?branch=main
[scrutinizer-image]: https://scrutinizer-ci.com/g/hckrnews/fetcher/badges/quality-score.png?b=main
