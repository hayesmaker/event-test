const EventEmitter = require('./event-emitter');
const eeUnify = require('event-emitter/unify');
const pipe = require('event-emitter/pipe');
const allOff = require('event-emitter/all-off');
const hasListeners = require('event-emitter/has-listeners');

class Shape extends EventEmitter {
  constructor(id) {
    super();
    this.id = id;
  }
}

class Square extends Shape {
  constructor(id) {
    super(id);
  }
  activate() {
    this.on('SQUARE', this.action);
  }
  deactivate() {
    this.off('SQUARE', this.action);
    // allOff(this);
  }
  action() {
    console.log('Square action', this.id);
  }
}

module.exports = Square;

class Circle extends Shape {
  constructor(id) {
    super(id);
  }
  activate() {
    this.on('CIRCLE', this.action.bind(this));
  }
  deactivate() {
    const func = this.action.bind(this);
    func();
    this.off('CIRCLE', func);
    // allOff(this);
  }
  action() {
    console.log('Circle action');
  }
}

const square = new Square('square');
const circle = new Circle('circle');

eeUnify(square, circle);
// pipe(square, circle);

// console.log('ACTIVATE THEM');

square.activate();
circle.activate();

// console.log('EMIT 1');

square.emit('CIRCLE');
circle.emit('SQUARE');
square.emit('CIRCLE');
circle.emit('SQUARE');
square.emit('CIRCLE');
circle.emit('SQUARE');
square.emit('CIRCLE');
circle.emit('SQUARE');

console.log('DEACTIVATE START');

square.deactivate();
circle.deactivate();

console.log('DEACTIVATE END');

// console.log('EMIT 2');

square.emit('CIRCLE');
circle.emit('SQUARE');
square.emit('CIRCLE');
circle.emit('SQUARE');
square.emit('CIRCLE');
circle.emit('SQUARE');
square.emit('CIRCLE');
circle.emit('SQUARE');
