const ee = require('event-emitter');

class EventEmitter {}

ee(EventEmitter.prototype);

module.exports = EventEmitter;
