# GAZO Bus
Message bus related functions.

## Install
```bash
npm install gazo-bus --save
```

## Use
```javascript
const Bus = require('gazo-bus')('example-project')
```

### Publish message
```javascript
Bus.publish('user-registered', {username: 'johndoe'})
```

### Parse received message
```javascript
Bus.parseMessage(event.data)
```
