const pubsub = require('@google-cloud/pubsub')

module.exports = (projectId) => {
  const bus = pubsub({projectId})

  const publish = (topic, payload) => {
    return bus.topic(topic).publish(payload)
  }

  const parseMessage = ({messageId, publishTime, data}) => ({
    id: messageId,
    timestamp: publishTime,
    payload: JSON.parse(Buffer.from(data, 'base64').toString())
  })

  return {publish, parseMessage}
}

