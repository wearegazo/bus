const pubsub = require('@google-cloud/pubsub')

/**
 * Connect to a pubsub bus.
 *
 * @param {Object} options
 * @return {Object}
 */
module.exports.connect = (options = {}) => {
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
   * Subscribe to a given topic.
   *
   * @param {string} topic
   * @param {Function} subscriber
   * @param {Object} options
   * @return {Promise}
   */
  const subscribe = (topic, subscriber, options) => {
    return bus.topic(topic).subscribe(options)
      .then(([subscription]) => {
        subscription.on('message', subscriber)
      })
  }

  return {
    publish,
    subscribe,
  }
}

/**
 * Parse incoming message.
 *
 * @param {string} messageId
 * @param {string} publishTime
 * @param {string} data
 * @return {Object}
 */
module.exports.parseMessage = ({messageId, publishTime, data}) => ({
  id: messageId,
  timestamp: publishTime,
  payload: JSON.parse(Buffer.from(data, 'base64').toString())
})
