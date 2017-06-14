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
  const subscribe = (topic, subscriber, options = {}) => {
    return bus.topic(topic).subscribe(options)
      .then(([subscription]) => {
        subscription.on('message', subscriber)
      })
  }

  /**
   * Create a a new topic.
   *
   * @param {string} topicName
   * @return {Promise}
   */
  const createTopic = bus.createTopic.bind(bus)

  return {
    publish,
    subscribe,
    createTopic,
  }
}

/**
 * Parse incoming message payload.
 *
 * @param {Object} e
 * @return {Object}
 */
module.exports.parsePayload = (e) => {
  if (typeof e.data === 'object') return e.data

  return JSON.parse(Buffer.from(e.data.data, 'base64').toString())
}
