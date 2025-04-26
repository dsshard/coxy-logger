# @coxy/logger

A flexible and extensible logger for Node.js and browsers with UUIDs, prefixes, time tracking, and middleware support.

## Installation

```bash
npm install @coxy/logger
```

## Quick Start

### Importing

Using **ES Modules**:

```javascript
import { Logger } from '@coxy/logger';
```

Using **CommonJS**:

```javascript
const { Logger } = require('@coxy/logger');
```

## Creating a Logger

```javascript
const logger = new Logger();

const namedLogger = new Logger({ name: 'my-app' });

const customLogger = new Logger({ name: 'service', uuidLen: 8, isTime: true });
```

### Logger Parameters

| Parameter   | Type               | Default | Description                         |
|-------------|--------------------|---------|-------------------------------------|
| `name`      | string \| string[] | `null`  | Custom name or array of names.      |
| `uuidLen`   | number             | `5`     | Length of the UUID string.          |
| `isTime`    | boolean            | `false` | Enable/disable time tracking.       |
| `isEnabled` | boolean            | `true`  | Enable/disable the logger globally. |

---

## Methods

| Method                              | Description                                              |
|-------------------------------------|----------------------------------------------------------|
| `logger.log(...args)`               | Log a standard message.                                  |
| `logger.info(...args)`              | Log an informational message.                            |
| `logger.warn(...args)`              | Log a warning message.                                   |
| `logger.error(...args)`             | Log an error message.                                    |
| `logger.use(middleware)`            | Add a middleware function that intercepts all messages.  |
| `logger.setEnableStatus(flag)`      | Dynamically enable or disable logging.                   |
| `logger.setEnableTime(flag)`        | Dynamically enable or disable time tracking.             |
| `logger.resetId()`                  | Generate and assign a new UUID.                          |
| `logger.fork(params?)`              | Create a child logger inheriting prefixes and options.   |

---

## Examples

### Basic Logging

```javascript
const logger = new Logger();

logger.log('App started');
logger.info('Fetching data');
logger.warn('Low memory');
logger.error('Unhandled exception');
```

### Using Prefixes and UUIDs

```javascript
const logger = new Logger({ name: 'MainService', uuidLen: 8 });

logger.info('Service initialized');
// Output: [MainService] [2a3b4c5d] Service initialized
```

### Forking a Logger

```javascript
const mainLogger = new Logger({ name: 'Parent' });
const childLogger = mainLogger.fork({ name: 'Child' });

childLogger.log('Child started');
// Output: [Parent] [Child] [abcd1234] Child started
```

### Enabling Time Tracking

```javascript
const logger = new Logger({ isTime: true });

logger.log('Start task');
setTimeout(() => logger.log('End task'), 1000);

// Output:
// [uuid] [time: 0ms] Start task
// [uuid] [time: 1000ms] End task
```

### Disabling the Logger

```javascript
const logger = new Logger();

logger.setEnableStatus(false);
logger.log('This will not be printed');

logger.setEnableStatus(true);
logger.log('Logging resumed');
```

### Using Middleware

```javascript
const logger = new Logger();

logger.use((type, ...args) => {
  if (type === 'error') {
    // send errors to external monitoring service
    sendErrorToService(args);
  }
});

logger.error('Critical error');
```

---

## Why Choose Coxy Logger?

- **Simple API**: Minimalistic but powerful.
- **UUID & Prefix Support**: Traceable logs for distributed systems.
- **Middleware System**: Hook into logs programmatically.
- **Forkable**: Inherit and branch loggers easily.
- **Performance Optimized**: Lightweight and fast.

---

## License

MIT License.

---

> 🔗 **Fun Fact:** Early logging systems in aviation had similar concepts of unique identifiers and timestamps to trace black box recordings accurately!

