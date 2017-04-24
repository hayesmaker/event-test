import assert from 'assert';
import Square from '../spike';
import sinon from 'sinon';

describe('Spike event emitter tests', function () {
  var square;

  beforeEach(function() {
    square = new Square(1);
  });

  afterEach(function() {
    square = null;
  });

  it('Square should be created ok', function () {
    //sanity check imports by testing if mySquare is not null or undefined
    assert.ok(square);
  });

  it('Square id should be 1', function () {
    assert.equal(square.id, 1);
  });

  it('Given square is active, check that action was called', function() {
    sinon.spy(square, 'action');
    square.activate();
    square.emit('SQUARE');
    assert(square.action.calledOnce);
    square.action.restore();
  });

  it('Given that square is not active, check that action was not called', function() {
    sinon.spy(square, 'action');
    square.activate();
    square.deactivate();
    square.emit('SQUARE');
    assert(square.action.notCalled);
    square.action.restore();
  });



});