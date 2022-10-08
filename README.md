# ts-node-logger

**Install**

```shell
npm install @coxy/ts-node-logger
```

**Create logger**

```javascript
import { Logger } from '@coxy/ts-node-logger';
```

... or using CommonJS syntax:

```javascript
const { Logger } = require('@coxy/ts-node-logger');
```

**Params**

| value | type   | default value |
|-------|--------|--------------:|
| name  | string |          null |
| uuid  | number |          null |

```javascript
const logger = new Logger;

const logger2 = new Logger({ name: 'abc' });

const logger3 = new Logger({ name: 'foo', uuid: 8 });
```

**Methods**


| Method                          | Description                        |                  |
|---------------------------------|:-----------------------------------|------------------|
| logger.resetId()                | reset Id                           |                  |
| logger.fork({ name: 'string' }) | fork current logger & add new name |                  |
| logger.disableLogger(false)     | enable/disable logger              | default enabled  |
| logger.enableTime(true)         | enable/disable time log (ms)       | default disabled |

```javascript
const logger = new Logger;
logger.log('123'); //[3e691f06-fb1a-e2] 123
logger.resetId();
logger.log('123'); //[2e0ab648-1310-cd] 123
```

**Exapmle**

```javascript
const logger = new Logger;

logger.log('some message'); //[675da0e1] some message
logger.info('some message'); //[675da0e1] some message
logger.warn('some message'); //[675da0e1] some message
logger.error('some message'); //[675da0e1] some message
```

```javascript
const logger2 = new Logger({ uuid: 10 });
logger.wann('message') //[2f301fe0-b] 123

const logger = new Logger({ name: 'foo', uuid: 8 });
logger.warn('message') //[foo] [675da0e1] 123
```
