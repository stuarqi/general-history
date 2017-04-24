/**
 * Created by zhangsq on 2017/4/24.
 */
'use strict';

const assert = require('assert');
let version = +process.versions.node.match(/^\w+?/)[0];

const GeneralHistory = version > 5 ? require('../../src/general-history') : require('../../lib/general-history');

describe('GeneralHistory', () => {
  let history;

  it('Should be able to create instance', () => {
    history = new GeneralHistory({stackLimit: 10});
    [
      'push',
      'back',
      'forward',
      'locate',
      'list',
      'clear',
      'count',
      'canBack',
      'canForward',
      'current',
      'currentIndex'
    ]
      .forEach(propertyName => assert.ok(propertyName in history));
  });

  describe('#push()', () => {
    it('Should be have instance method push()', () => {
      assert.ok(typeof history.push === 'function');
    });

    it('Should be able to push data', () => {
      assert.ok(history.push('hello') === history);
      assert.ok(history.push('world') === history);
      [1, 2, 3, 4, 5].forEach(num => assert.ok(history.push(num) === history));
    });
  });

  describe('#back()', () => {
    it('Should be have instance method back()', () => {
      assert.ok(typeof history.back === 'function');
    });

    it('Should be able to back history', () => {
      assert.ok(history.back() === 4);
      assert.ok(history.canBack);
      assert.ok(history.current === 4);
      assert.ok(history.currentIndex === 5);
    });

    it('Should be able to back by step', () => {
      assert.ok(history.back(5) === 'hello');
    });

    it('Should be return null if can\'t back', () => {
      assert.ok(history.back() === null);
      assert.ok(history.back(2) === null);
    });

    it('#canBack', () => {
      assert.ok(!history.canBack);
    });
  });

  describe('#forward()', () => {
    it('Should be have instance method forward()', () => {
      assert.ok(typeof history.forward === 'function');
    });

    it('Should be able to forward history', () => {
      assert.ok(history.forward() === 'world');
      assert.ok(history.canForward);
    });

    it('Should be able to forward by step', () => {
      assert.ok(history.forward(5) === 5);
    });

    it('Should be return null if can\'t forward', () => {
      assert.ok(history.forward() === null);
      assert.ok(history.forward(2) === null);
    });

    it('#canForward', () => {
      assert.ok(!history.canForward);
    });
  });

  describe('#locate()', () => {
    it('Should be have instance method locate()', () => {
      assert.ok(typeof history.locate === 'function');
    });

    it('Should be able to locate history', () => {
      assert.ok(history.locate(0) === 'hello');
      assert.ok(history.locate(2) === 1);
      assert.ok(history.locate(6) === 5);
    });

    it('Should be return null if locate a history of not exists', () => {
      assert.ok(history.locate(-1) === null);
      assert.ok(history.locate(10) === null);
    });
  });

  describe('#list()', () => {
    it('Should be have method of instance named list()', () => {
      assert.ok(typeof history.list === 'function');
    });

    it('Should be able to get history list', () => {
      assert.deepEqual(history.list(), ['hello', 'world', 1, 2, 3, 4, 5]);
    });

    it('Should be able custom preprocessor of #list()', () => {
      assert.deepEqual(history.list(item => typeof item === 'string' ? item.toUpperCase() : item + 1), ['HELLO', 'WORLD', 2, 3, 4, 5, 6]);
    });
  });

  describe('#count', () => {
    it('Should be able to get history count', () => {
      assert.ok(history.count === 7);
    })
  });

  describe('#clear()', () => {
    it('Should be have method of instance named clear()', () => {
      assert.ok(typeof history.clear === 'function');
    });

    it('Should be able to clear history', () => {
      assert.ok(history.clear() === history);
      assert.ok(history.count === 0);
    });
  });

  describe('Composite test', () => {
    before(() => {
      for (let i = 0; i < 5; i++) {
        history.push(i + 10);
      }
    });

    it('Should be able push if backed', () => {
      assert.ok(history.back(2) === 12);
      assert.ok(history.push(15) === history);
      assert.ok(history.count === 4);
      assert.ok(!history.canForward);
      assert.deepEqual(history.list(), [10, 11, 12, 15]);
    });

    it('Should be able shrink history stack by limit', () => {
      for (let i = 0; i < 20; i++) {
        assert.ok(history.push(i + 10));
      }
      assert.ok(history.count === 10);
    });
  });
});