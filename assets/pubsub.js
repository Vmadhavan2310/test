/* exported subscribe, publish */

let subscribers = {}

window.subscribe = function(eventName, callback) {
  if (subscribers[eventName] === undefined) {
    subscribers[eventName] = []
  }

  subscribers[eventName] = [...subscribers[eventName], callback];

  return function unsubscribe() {
    subscribers[eventName] = subscribers[eventName].filter((cb) => {
      return cb !== callback
    });
  }
};

window.publish = function(eventName, data) {
  if (subscribers[eventName]) {
    subscribers[eventName].forEach((callback) => {
      callback(data)
    })
  }
}
