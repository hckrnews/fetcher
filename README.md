# Fetcher

[![NPM version][npm-image]][npm-url] [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_fetcher&metric=coverage)](https://sonarcloud.io/summary/new_code?id=hckrnews_fetcher) [![Scrutinizer Code Quality][scrutinizer-image]][scrutinizer-url] [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_fetcher&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=hckrnews_fetcher) 
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_fetcher&metric=bugs)](https://sonarcloud.io/summary/new_code?id=hckrnews_fetcher) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_fetcher&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=hckrnews_fetcher) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_fetcher&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=hckrnews_fetcher) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_fetcher&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=hckrnews_fetcher)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_fetcher&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=hckrnews_fetcher) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_fetcher&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=hckrnews_fetcher) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=hckrnews_fetcher&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=hckrnews_fetcher)

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
