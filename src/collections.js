/**
 The MIT License (MIT)
 Copyright (c) 2006 Somnath Panja, somnathpanja@gmail.com
 Twitter handle: @somnathpanja
 https://in.linkedin.com/pub/somnath-panja/21/614/905
 All rights reserved.
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

/**
 * @description List is a type of collection can hold multiple items
 * @param element Can be a single item or an array of items.
 * @constructor
 */

(function (module) {
  'use strict';

  var List = function List(elements) {
    if (typeof elements !== 'undefined') {
      this.addRange(elements);
    }
  };

  /**
   * @description Extend and array to List
   * @param array
   */
  List.extend = function (array) {
    if (!Array.isArray(array)) throw "Only array can be extended";

    List.each(Object.keys(List.prototype), function (key) {
      if (List.prototype.hasOwnProperty(key)) {
        array[key] = List.prototype[key];
      }
    });

    return array;
  };

  List.prototype = [];
  List.constructor = List;
  List.prototype.constructor = List;

  /**
   * @description Add an item
   * @param pItem
   */
  List.prototype.add = function (pItem) {
    this.push(pItem);
  };

  /**
   * @description Add multiple items
   * @param pItems A single item or an array or List
   */
  List.prototype.addRange = function (pItems) {
    if (typeof pItems !== 'string' && typeof pItems !== 'undefined' && typeof pItems.length !== 'undefined') {
      for (var idx = 0; idx < pItems.length; idx++) {
        this.push(pItems[idx]);
      }
    } else {
      this.push(pItems);
    }
  };

  /**
   * @description Remove an item
   * @param pItem
   * @returns {*}
   */
  List.prototype.remove = function (pItem) {
    var index = this.indexOf(pItem);
    if (index !== -1) {
      return this.removeAt(index);
    }
  };

  /**
   * @description Remove the last item
   * @returns {*}
   */
  List.prototype.removeFirst = function () {
    return (this.length > 0) ? this.removeAt(0) : undefined;
  };

  /**
   * @description Remove the last item
   * @returns {*}
   */
  List.prototype.removeLast = function () {
    return (this.length > 0) ? this.removeAt(this.length - 1) : undefined;
  };

  /**
   * @description Remove all items from list
   * @returns {Array} Array which is removed
   */
  List.prototype.clear = function () {
    return this.splice(0, this.length);
  };

  /**
   * @description insert an item at specific index
   * @param pIndex
   * @param pItem
   */
  List.prototype.insertAt = function (pIndex, pItem) {
    this.splice(pIndex, 0, pItem);
  };

  /**
   * @description Delete an item present in a particular index
   * @param pIndex Index of the item to be removed
   * @returns {*} Returns the item which was removed
   */
  List.prototype.removeAt = function (pIndex) {
    this._doIndexAccess(pIndex);
    return this.splice(pIndex, 1)[0];
  };

  /**
   * @description Returns count of the items present in collection
   * @returns {Number}
   */
  List.prototype.count = function () {
    return this.length;
  };

  /**
   * @description Clean function cleans unwanted items from list
   * @param item2Delete
   * @returns {List}
   */
  List.prototype.clean = function (item2Delete) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === item2Delete) {
        this.splice(i, 1);
        i--;
      }
    }
    return this;
  };

  /**
   * @description Checks if the index is within range
   * @param index
   * @private
   */
  List.prototype._doIndexAccess = function (index) {
    if (typeof index === 'undefined' || index < 0 || index >= this.length)
      throw new Error("Index out of range: " + index + "/" + this.length);
    return index;
  };

  /**
   * @description  Collect first item from the collection. If empty then throws exception.
   * Try using Use list.any() before using list.first()
   * @returns {*}
   */
  List.prototype.first = function () {
    this._doIndexAccess(0);

    if (this.length > 0)
      return this[0];
  };

  /**
   * @description Collect last item from the collection. If empty then throws exception.
   * Try using Use list.any() before using list.first()
   * @returns {*}
   */
  List.prototype.last = function (index) {
    if (typeof index === 'undefined') {
      this._doIndexAccess(this.length - 1);
      return this[this.length - 1];
    } else {
      this._doIndexAccess(this.length - index - 1);
      return this[this.length - index - 1];
    }
  };

  /**
   * @description Collect top N items from the collection
   * If N > length then it does not throws any exception. It will collect available items.
   * But N should not be a negative number
   * @returns {*}
   */
  List.prototype.top = function (n) {
    var thisC = this, i = 0;

    if (n < 0) throw new Error('count can not be negative');
    var list = instanceFactory(thisC);
    if (n > this.length) {
      for (i = 0; i < this.length; i++) list.add(this[i]);
    } else {
      for (i = 0; i < n; i++) list.add(this[i]);
    }

    return list;
  };

  /**
   * @description Collect bottom N items from the collection
   *              If N > length then it does not throws any exception. It will collect available items.
   *              But N should not be a negative number
   * @returns {*}
   */
  List.prototype.bottom = function (n) {
    var thisC = this, i = 0;
    if (n < 0) throw new Error('count can not be negative');

    var list = instanceFactory(thisC);
    if (n > this.length) {
      for (i = 0; i < this.length; i++) list.add(this[i]);
    } else if (n <= this.length) {
      for (i = (this.length - n); i < this.length; i++) list.add(this[i]);
    }

    return list;
  };

  /**
   * @description Collect items within a range
   * @param from From index
   * @param to To index
   * @returns {*}
   */
  List.prototype.range = function (from, to) {
    var thisC = this;
    if (from < 0 || from > to)
      throw new Error('from index should be >= 0 & < list length & <= "to" value');

    var list = instanceFactory(thisC);
    for (var i = from; i <= to; i++)
      list.add(this[i]);
    return list;
  };

  /**
   * @description Check if there is any items in collection. Returns true/false
   * @returns {boolean}
   */
  List.prototype.any = function () {
    return (this.length > 0);
  };

  /**
   * @description Loop through each items
   * @param cb function(item, index){}
   */
  List.prototype.each = function (cb) {
    return List.each(this, cb, arguments[1]);
  };

  /**
   * @description Loop through each items in reverse order
   * @param cb function(item, index){}
   */
  List.prototype.eachReverse = function (cb) {
    return List.eachReverse(this, cb);
  };

  /**
   * @description loop for each item asynchronously
   * @param delegate function pointer to be called in loop params: (item, index, continueCallback)
   * @param onDone function will be called on loop end or any error occurred
   */
  List.prototype.eachAsync = function (delegate, onDone) {
    return List.eachAsync(this, delegate, onDone);
  };

  /**
   * @description loop for each item asynchronously reverse direction from last to first
   * @param delegate function pointer to be called in loop params: (item, index, continueCallback)
   * @param onDone function will be called on loop end or any error occurred
   */
  List.prototype.eachAsyncReverse = function (delegate, onDone) {
    return List.eachAsyncReverse(this, delegate, onDone);
  };

  /**
   * @description Converts List to array
   * @returns {Buffer|Array.<*>|string|Blob|ArrayBuffer}
   */
  List.prototype.toArray = function () {
    return this.slice(0);
  };

  List.prototype.max = function () {
    return Math.max.apply(null, this);
  };

  List.prototype.min = function () {
    return Math.min.apply(null, this);
  };

  /**
   * @description Does additions of all items present in the array or returned by selector or by key
   * @param selector
   * @returns {number}
   */
  List.prototype.sum = function (selector) {
    var sum = 0, i;
    if ((typeof selector === 'string')) {
      for (i = 0; i < this.length; i++) {
        sum += Number(this[i][selector]);
      }
    } else if (selector) {
      for (i = 0; i < this.length; i++) {
        sum += Number(selector(this[i]));
      }
    } else {
      for (i = 0; i < this.length; i++) {
        sum += Number(this[i]);
      }
    }

    return sum;
  };

  /**
   * @description Calculate average of all items present in the array or returned by selector or by key
   * @param selector
   * @returns {number}
   */
  List.prototype.avg = function (selector) {
    return (this.length === 0) ? 0 : (this.sum(selector) / this.length);
  };

  /**
   * @description Write select Query in Javascript in simple way, your selector function just returns what to select
   * @param selector function(item){ return item."what to select";}
   * @returns {*}
   */
  List.prototype.select = function (selector) {
    var thisC = this;
    var list = instanceFactory(thisC);
    if ((typeof selector === 'string')) {
      this.each(function (item) {
        list.add(item[selector]);
      });
    } else if (selector) {
      this.each(function (item, idx) {
        list.add(selector(item, idx));
      });
    } else return this;

    return list;
  };

  /**
   * @description Write select query in javascript and marge all returned array by selector into single one
   * @param selector function(item){ return item."what to select is a array";}
   * @returns {*}
   */
  List.prototype.selectMulti = function (selector) {
    var thisC = this;
    var list = instanceFactory(thisC);
    if ((typeof selector === 'string')) {
      this.each(function (item) {
        list.addRange(item[selector]);
      });
    } else if (selector) {
      this.each(function (item, idx) {
        list.addRange(selector(item, idx));
      });
    } else return thisC;

    return list;
  };

  /**
   * @description Write where condition in selector and where query returns what ever items are selected
   * @param conditionFunc function(item){ return item."what to select";}
   * @returns {List}
   */
  List.prototype.where = function (conditionFunc) {
    var thisC = this;
    var func = conditionFunc;
    var list = instanceFactory(thisC);
    this.each(function (item, idx) {
      if (func(item, idx))
        list.add(item);
    });

    return list;
  };

  /**
   * @description Sort the items in a list by selector in Ascending order
   * @param keySelector
   * @returns {*}
   */
  List.prototype.orderByAsc = function (keySelector) {
    var thisC = this;
    thisC.sort(function (a, b) {
      return keySelector(a) - keySelector(b);
    });
    return thisC;
  };

  /**
   * @description Sort the items in a list by selector in Descending order
   * @param keySelector
   * @returns {*}
   */
  List.prototype.orderByDesc = function (keySelector) {
    var thisC = this;
    thisC.sort(function (a, b) {
      return keySelector(b) - keySelector(a);
    });
    return thisC;
  };

  /**
   * @description Group the items present in collection by the item returned by selector
   * @param keySelector
   * @returns {*}
   */
  List.prototype.groupBy = function (keySelector) {
    var thisC = this;
    var groups = {};
    this.each(function (item) {
      var key = (typeof keySelector === 'string') ? item[keySelector] : keySelector(item);
      if (!groups[key]) {
        groups[key] = instanceFactory(thisC);
      }
      groups[key].add(item);
    });

    var retList = instanceFactory(thisC);
    for (var key in groups) {
      if (groups.hasOwnProperty(key)) {
        retList.add({key: key, value: groups[key]});
      }
    }

    return retList;
  };

  /**
   * @description Collect only Unique items.
   * @example Input: [2,4,6,3,2,3,3,2] =>> Output: [2,4,6,3,6]
   * @returns {*}
   */
  List.prototype.unique = function () {
    var u = {}, a = instanceFactory(this);
    for (var i = 0, l = this.length; i < l; ++i) {
      if (u.hasOwnProperty(this[i])) {
        continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
    }
    return a;
  };

  /**
   * @description Prints in console
   */
  List.prototype.printInConsole = function () {
    var name = this.constructor.name;
    List.each(this, function (item, idx) {
      console.log(name + "[" + idx + "] => " + JSON.stringify(item));
    });

    return this;
  };

  /**
   * @description Prints as table in console
   */
  List.prototype.printInConsoleAsTable = function () {
    var self = this;
    var headers = List.toList(this.first(), true);

    var tableInfo = headers.select(function (header) {
      return {
        headerTxt: header, maxWidth: self.select(function (row) {
          return Math.max(header.length, (typeof row[header] === 'object') ? JSON.stringify(row[header]).length : row[header].toString().length);
        }).max()
      };
    });
    var leftChar = "│", rightChar = "│";
    var header = leftChar + tableInfo.select(function (header) {
        var noOfSpaceReq = header.maxWidth - header.headerTxt.length;
        var str = ' ' + header.headerTxt;

        if (noOfSpaceReq == 1) {
          str += ' ';
        } else if (noOfSpaceReq == 0) {
        } else {
          var emptyStr = new Array(noOfSpaceReq + 1).join('. ').split('.');
          str += emptyStr.join('');
        }

        return str;
      }).join(" │ ") + ' ' + rightChar;

    var line = new Array(header.length - 1).join('.─').split('.').join('');
    console.log('├' + line + '╮');
    console.log(header);
    console.log('├' + line + '┤');

    self.each(function (item) {
      var rowStr = leftChar + List.toList(item).select(function (txt, idx) {
          txt = Array.isArray(txt) ? txt.join(',') : ((typeof txt === 'object') ? JSON.stringify(txt) : txt.toString());
          var header = tableInfo[idx];
          var noOfSpaceReq = header.maxWidth - txt.length;
          var str = ' ' + txt;

          if (noOfSpaceReq == 1) {
            str += ' ';
          } else if (noOfSpaceReq == 0) {
          } else {
            var emptyStr = new Array(noOfSpaceReq + 1).join('. ').split('.');
            str += emptyStr.join('');
          }
          return str;
        }).join(' │ ') + ' ' + rightChar;
      console.log(rowStr);
    });

    console.log('╰' + line + '╯');
    return this;
  };

  /*********************---------------------********************/
  /***********        Static Functions of List     **************/
  /*********************---------------------********************/
  /**
   * @static Static method
   * @param instance
   * @returns {boolean}
   */
  List.isList = function (instance) {
    return (instance instanceof List);
  };

  /**
   * @description loop for each item
   * @static Static method
   * @param arrayOrObj
   * @param cb
   * @param onDone
   */
  List.each = function (arrayOrObj, cb, onDone) {
    if (Utils._isArray(arrayOrObj) || List.isList(arrayOrObj)) {
      for (var i = 0; i < arrayOrObj.length; i++) {
        if (cb(arrayOrObj[i], i) === false) {
          break;
        }
      }
    } else if (Utils._isObject(arrayOrObj)) {
      for (var key in arrayOrObj) {
        if (arrayOrObj.hasOwnProperty(key)) {
          if (cb(arrayOrObj[key], key) === false) {
            break;
          }
        }
      }
    }

    if (onDone) onDone();
    return arrayOrObj;
  };

  /**
   * @description Loop through each items in reverse order
   * @static Static method
   * @param arrayOrObj
   * @param cb
   */
  List.eachReverse = function (arrayOrObj, cb) {
    if (Utils._isArray(arrayOrObj) || List.isList(arrayOrObj)) {
      for (var i = arrayOrObj.length - 1; i >= 0; i--) {
        if (cb(arrayOrObj[i], i) === false) {
          break;
        }
      }
    } else if (Utils._isObject(arrayOrObj)) {
      var keys = Object.keys(arrayOrObj);
      for (var i = keys.length - 1; i >= 0; i--) {
        if (cb(arrayOrObj[keys[i]], keys[i]) === false) {
          break;
        }
      }
    }
    return arrayOrObj;
  };

  /**
   * @description loop for each item asynchronously
   * @static Static method
   * @param arrayOrObj
   * @param delegate function pointer to be called in loop params: (item, index, continueCallback)
   * @param onDone function will be called on loop end or any error occurred
   */
  List.eachAsync = function (arrayOrObj, delegate, onDone) {
    try {
      var idx = -1;
      var continueLoop;
      if (Utils._isArray(arrayOrObj) || List.isList(arrayOrObj)) {
        continueLoop = function () {
          var err = arguments[0];
          if (!err) {
            if (++idx < arrayOrObj.length) {
              delegate(arrayOrObj[idx], idx, continueLoop);
            } else if (idx === arrayOrObj.length) {
              if (onDone) onDone.apply(null, arguments);
            }
          } else {
            if (onDone) onDone.apply(null, arguments);
          }
        };
      } else if (Utils._isObject(arrayOrObj)) {
        var keys = Object.keys(arrayOrObj);
        continueLoop = function () {
          var err = arguments[0];

          if (!err) {
            if (++idx < keys.length) {
              delegate(arrayOrObj[keys[idx]], keys[idx], continueLoop);
            } else if (idx === keys.length) {
              if (onDone) onDone.apply(null, arguments);
            }
          } else {
            if (onDone) onDone.apply(null, arguments);
          }
        };
      }
      continueLoop(null);
    } catch (er) {
      if (onDone) onDone.apply(null, [er]);
    }
    
    return arrayOrObj;
  };

  /**
   * @description loop for each item in reverse order asynchronously
   * @static Static method
   * @param arrayOrObj
   * @param delegate function pointer to be called in loop params: (item, index, continueCallback)
   * @param onDone function will be called on loop end or any error occurred
   */
  List.eachAsyncReverse = function (arrayOrObj, delegate, onDone) {
    try {
      var idx, continueLoop;
      if (Utils._isArray(arrayOrObj) || List.isList(arrayOrObj)) {
        idx = arrayOrObj.length;
        continueLoop = function () {
          var err = arguments[0];
          if (!err) {
            if (--idx >= 0) {
              delegate(arrayOrObj[idx], idx, continueLoop);
            } else if (idx === -1) {
              if (onDone) onDone.apply(null, arguments);
            }
          } else {
            if (onDone) onDone.apply(null, arguments);
          }
        };
      } else if (Utils._isObject(arrayOrObj)) {
        var keys = Object.keys(arrayOrObj);
        idx = keys.length;
        continueLoop = function () {
          var err = arguments[0];
          if (!err) {
            if (--idx >= 0) {
              delegate(arrayOrObj[keys[idx]], keys[idx], continueLoop);
            } else if (idx === -1) {
              if (onDone) onDone.apply(null, arguments);
            }
          } else {
            if (onDone) onDone.apply(null, arguments);
          }
        };
      }

      continueLoop(null);
    } catch (er) {
      if (onDone) onDone.apply(null, [er]);
    }

    return arrayOrObj;
  };

  /**
   * @description loop for nth iteration
   * @static Static method
   * @param noOfIteration Number of iteration
   * @param delegate function pointer to be called in loop params: (item, index, continueCallback)
   * @param onDone function will be called on loop end or any error occurred
   */
  List.loopAsync = function (noOfIteration, delegate, onDone) {
    try {
      var idx = -1;
      var continueLoop = function () {
        var err = arguments[0];
        var isStopSignal = arguments[1];

        if (!err) {
          if (isStopSignal === true) {
            onDone.apply(null, arguments);
          } else if (++idx < noOfIteration) {
            delegate(idx, continueLoop);
          } else if (idx === noOfIteration) {
            onDone.apply(null, arguments);
          }
        } else {
          onDone.apply(null, arguments);
        }
      };

      continueLoop(null);
    } catch (er) {
      onDone.apply(null, [er]);
    }
  };

  /**
   * Execute unlimited functions asynchronously
   * @example List.exeAsync(f1, f2, f3);
   */
  List.exeAsync = function () {
    var delegates = arguments;
    /// DEF:delegates, are function pointers.
    var idx = -1;
    var len = delegates.length;
    var continueLoop = function () {
      idx++;
      if (idx < len) {
        var args = [continueLoop];
        for (var id = 0; id < arguments.length; id++)
          args.push(arguments[id]);

        delegates[idx].apply(null, args);
      }
    };

    continueLoop();
  };


  /**
   * returns list of values extracted from array or object property values or keys
   * @param obj
   * @param isSelectKeys  pass true if you want to consider keys only from the object
   * @returns {List}
   * @example List.toList([f1, f2, f3]); ==> List of f1, f2, f3
   * List.toList({x: {a:1, b:1}, y: {a:2, b:3}, z: {a:3, b:3}}); ==> List of {a:1, b:1}, {a:2, b:2}, {a:3, b:3}
   */
  List.toList = function (obj, isSelectKeys) {
    if (Array.isArray(obj))
      return new List(isSelectKeys ? Object.keys(obj) : obj);
    else {
      if (isSelectKeys) {
        return new List(Object.keys(obj));
      } else {
        var keys = Object.keys(obj);
        var list = new List();
        for (var i = 0; i < keys.length; i++) {
          list.add(obj[keys[i]]);
        }
        return list;
      }
    }
  };

  /*********************---------------------********************/
  /*********************         Queue       ********************/
  /*********************---------------------********************/
  /**
   * @description A Queue
   * @constructor
   */
  var Queue = function Queue() {
  };

  Queue.prototype = List.prototype;
  Queue.constructor = Queue;

  /**
   * @description Push an item in Queue
   * @param item
   */
  Queue.prototype.pushItem = function (item) {
    this.add(item);
  };

  /**
   * @description Push multiple items in queue
   * @param items
   */
  Queue.prototype.pushItems = function (items) {
    this.addRange(items);
  };

  /**
   * @description Pop an item from Queue
   * @returns {*}
   */
  Queue.prototype.popItem = function () {
    if (this.length > 0) {
      return this.removeAt(0);
    }
  };

  /**
   * @description Pop N items from Queue
   * @param n
   * @returns {*}
   */
  Queue.prototype.popItems = function (n) {
    var list = instanceFactory(this);

    if (this.length < n) {
      n = this.length;
    }

    for (var idx = 0; idx < n; idx++) {
      list.add(this.removeAt(0));
    }

    return list;
  };

  /*********************---------------------********************/
  /*********************      Fixed Queue    ********************/
  /*********************---------------------********************/
  /**
   * @description A fixed length queue. While pushing new items in Fixed Length Queue, if collection is full then
   * it automatically pops the item from rare to fit new item
   * @constructor
   */
  var FixedQueue = function FixedQueue(maxCount) {
    this._maxCount = maxCount ? maxCount : 10;
  };

  FixedQueue.prototype = Queue.prototype;
  FixedQueue.constructor = FixedQueue;

  /**
   * @description Automatically keeps the fixed length by removing the old items from the rare
   * @return  returns item which is popped
   * @param item
   */
  FixedQueue.prototype.pushItem = function (item) {
    this.add(item);
    if (this.length > this._maxCount) {
      return this.removeAt(0);
    }
  };

  /**
   * @description Instance factory for collection
   * @param instance
   * @returns {*}
   */
  var instanceFactory = function (instance) {
    if (instance instanceof List) {
      return new List();
    } else if (instance instanceof Queue) {
      return new Queue();
    } else if (instance instanceof FixedQueue) {
      return new FixedQueue(instance._maxCount);
    } else return new List();
  };

  var Collections = {
    List: List,
    Queue: Queue,
    FixedQueue: FixedQueue
  };

  var Utils = {
    _toString: Object.prototype.toString,
    _isFunction: function (f) {
      return (f instanceof Function);
    },
    _isArray: Array.isArray || function (obj) {
      return _toString.call(obj) === '[object Array]';
    },
    _isObject: function (obj) {
      var type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    }
  };

  module.exports = Collections;

})
(module);