/**
 * Created by zhangsq on 2017/4/24.
 */
'use strict';

/**
 * 通用历史记录类，提供历史记录的新增、后退和前进等功能
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeneralHistory = function () {

  /**
   * 构造方法
   * @param {object} opts 设置参数
   * @param {number} [opts.stackLimit=50] 存储堆栈限制
   */
  function GeneralHistory() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      stackLimit: 50
    };

    _classCallCheck(this, GeneralHistory);

    this._opts = opts;

    this._reset();
  }

  /**
   * 重置
   * @private
   */


  _createClass(GeneralHistory, [{
    key: '_reset',
    value: function _reset() {
      // 存储堆栈
      this._stack = [];

      // 记录指针
      this._pointer = -1;
    }

    /**
     * 根据存储堆栈的限制收缩堆栈
     * @private
     */

  }, {
    key: '_shrinkStack',
    value: function _shrinkStack() {
      var stack = this._stack;
      var limit = this._opts.stackLimit;

      while (stack.length > limit) {
        stack.shift();
      }

      return this;
    }

    /**
     * 增加历史记录
     * @param {object} data 历史记录的数据
     * @returns {GeneralHistory}
     */

  }, {
    key: 'push',
    value: function push(data) {
      var stack = this._stack;
      var pointer = this._pointer;

      if (pointer < stack.length - 1) {
        // 如果指针不在最后（执行了记录回退操作），则清理指针后面的所有数据
        stack.splice(pointer + 1);
      }
      // 在堆栈中增加记录
      stack.push(data);

      // 尝试收缩堆栈
      this._shrinkStack();

      // 将指针指向新增记录
      this._pointer = stack.length - 1;

      return this;
    }

    /**
     * 回退历史记录
     * @param {number} [step=1] 回退步数
     * @returns {object} 如果返回 null， 说明回退无效
     */

  }, {
    key: 'back',
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      return this.locate(this._pointer - step);
    }

    /**
     * 前进历史记录，进行了回退操作后，用于恢复回退操作
     * @param {number} [step=1] 前进步数
     * @returns {object} 如果返回 null，说明前进无效
     */

  }, {
    key: 'forward',
    value: function forward() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      return this.locate(this._pointer + step);
    }

    /**
     * 定位历史记录并返回相应数据
     * @param {number} index 历史记录位置索引
     * @returns {object}  如果返回 null，说明定位无效
     */

  }, {
    key: 'locate',
    value: function locate(index) {
      var stack = this._stack;
      var result = null;

      if (index >= 0 && index < stack.length) {
        result = stack[index];
        this._pointer = index;
      }

      return result;
    }

    /**
     * 获取历史记录列表
     * @param {function} [preprocessor] 记录的预处理方法
     * @returns {Array}
     */

  }, {
    key: 'list',
    value: function list() {
      var preprocessor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (item) {
        return item;
      };

      return this._stack.map(preprocessor);
    }

    /**
     * 清空记录
     */

  }, {
    key: 'clear',
    value: function clear() {
      this._reset();
      return this;
    }

    /**
     * 记录总数
     * @returns {Number}
     */

  }, {
    key: 'count',
    get: function get() {
      return this._stack.length;
    }

    /**
     * 是否可以后退
     * @returns {boolean}
     */

  }, {
    key: 'canBack',
    get: function get() {
      return this._pointer > 0;
    }

    /**
     * 是否可以前进
     * @returns {boolean}
     */

  }, {
    key: 'canForward',
    get: function get() {
      return this._pointer < this._stack.length - 1;
    }

    /**
     * 当前记录数据
     * @returns {object}
     */

  }, {
    key: 'current',
    get: function get() {
      return this._stack[this._pointer];
    }

    /**
     * 当前记录索引
     * @returns {number}
     */

  }, {
    key: 'currentIndex',
    get: function get() {
      return this._pointer;
    }
  }]);

  return GeneralHistory;
}();

module.exports = GeneralHistory;