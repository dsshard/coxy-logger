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

| value | type | default value |
| --- | --- | --- |
| name | string | null |
| length uuid | number | 5 |

```javascript
const logger = new Logger;

const logger2 = new Logger({ name: 'abc' });

const logger3 = new Logger({ name: 'foo', length: 8 });
```

**Methods**

|  |  |
| --- | --- | 
| logger.resetId() | reset Id |

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
const logger2 = new Logger({ length: 10 });
logger.wann('message') //[2f301fe0-b] 123

const logger = new Logger({ name: 'foo', length: 8 });
logger.warn('message') //[foo] [675da0e1] 123
```
