# GAZO Bus
Message bus related functions.

## Install
```bash
npm install gazo-bus --save
```

## Use
```javascript
const gazoBus = require('gazo-bus')
```

### Parse received message
```javascript
gazoBus.parseMessage(event.data)
```

### Publish message
```javascript
const bus = gazoBus.connect(options)
bus.publish('user-registered', {username: 'johndoe'})
```
