const pubsub = require('@google-cloud/pubsub')

module.exports = (options) => {
  const bus = pubsub(options)

  /**
   * Publish message on a given topic.
   *
   * @param {string} topic
   * @param {Object} payload
   * @return {Promise}
   */
  const publish = (topic, payload) => {
    return bus.topic(topic).publish(payload)
  }

  /**
   * Parse incoming message.
   *
   * @param {string} messageId
   * @param {string} publishTime
   * @param {string} data
   * @return {Object}
   */
  const parseMessage = ({messageId, publishTime, data}) => ({
    id: messageId,
    timestamp: publishTime,
    payload: JSON.parse(Buffer.from(data, 'base64').toString())
  })

  return {publish, parseMessage}
}
