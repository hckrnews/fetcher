# Fetcher

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
