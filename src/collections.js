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
    var List = function (elements) {
        if (typeof elements !== 'undefined') {
            this.addRange(elements);
        }
    };

    List.extend = function (array) {
        if (!Array.isArray(array)) throw "Only array can be extended";

        var proto = JSON.stringify(List.prototype);
        List.each(Object.keys(List.prototype), function (key) {
            if (List.prototype.hasOwnProperty(key)) {
                array[key] = List.prototype[key];
            }
        });
    };

    List.prototype = [];
    List.constructor = List;

    /**
     * @description loop from last
     * @static Static method
     * @param array
     * @param cb
     */
    List.eachReverse = function (array, cb) {
        for (var i = array.length - 1; i >= 0; i--) {
            if (cb(array[i], i) == false) {
                break;
            }
        }
    };

    /**
     * @description Add an item
     * @param pItem
     */
    List.prototype.add = function (pItem) {
        this.push(pItem);
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
     * @returns {T} Returns the item which was removed
     */
    List.prototype.removeAt = function (pIndex) {
        this._doIndexAccess();
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
     * @description Checks if the index is within range
     * @param index
     * @private
     */
    List.prototype._doIndexAccess = function (index) {
        if (index < 0 || index >= this.length)
            throw new Error("Index out of range: " + index + "/" + this.length);
    };

    /**
     * @description  Collect first item from the collection. If empty then throws exception.
     * Try using Use list.any() before using list.first()
     * @returns {*}
     */
    List.prototype.first = function () {
        this._doIndexAccess();

        if (this.length > 0)
            return this[0];
    };

    /**
     * @description Collect last item from the collection. If empty then throws exception.
     * Try using Use list.any() before using list.first()
     * @returns {*}
     */
    List.prototype.last = function (index) {
        this._doIndexAccess();
        return this[this.length - index - 1];
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
        List.each(this, cb, arguments[1]);
    };

    /**
     * @description Loop through each items in reverse order
     * @param cb function(item, index){}
     */
    List.prototype.eachFromLast = function (cb) {
        List.eachFromLast(this, cb);
    };

    /**
     * @description Converts List to array
     * @returns {Buffer|Array.<T>|string|Blob|ArrayBuffer}
     */
    List.prototype.toArray = function () {
        return this.slice(0);
    };

    /**
     * @description Clean function cleans unwanted items from list
     * @param item2Delete
     * @returns {List}
     */
    List.prototype.clean = function (item2Delete) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == item2Delete) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
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
        return (this.length == 0) ? 0 : (this.sum(selector) / this.length);
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
            this.each(function (item) {
                list.add(selector(item));
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
            this.each(function (item) {
                list.addRange(selector(item));
            });
        } else return thisC;

        return list;
    };

    /**
     * @description Write where condition in selector and where query returns what ever items are selected
     * @param selector function(item){ return item."what to select";}
     * @returns {*}
     */
    List.prototype.where = function (conditionFunc) {
        var thisC = this;
        var func = conditionFunc;
        var list = instanceFactory(thisC);
        this.each(function (item) {
            if (func(item))
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
        var list = instanceFactory(thisC);
        list.sort(function (a, b) {
            return keySelector(a) - keySelector(b);
        });
        return list;
    };

    /**
     * @description Sort the items in a list by selector in Descending order
     * @param keySelector
     * @returns {*}
     */
    List.prototype.orderByDesc = function (keySelector) {
        var thisC = this;
        var list = instanceFactory(thisC);
        list.sort(function (a, b) {
            return keySelector(b) - keySelector(a);
        });
        return list;
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
            var key = keySelector(item);
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
     * @description loop for each item asynchronously
     * @param delegate function pointer to be called in loop params: (item, index, continueCallback)
     * @param onDone function will be called on loop end or any error occurred
     */
    List.prototype.eachAsync = function (delegate, onDone) {
        List.eachAsync(this, delegate, onDone);
    };

    /**
     * @description Prints in console
     */
    List.prototype.printInConsole = function () {
        List.each(this, function(item, idx){
            console.log(idx + ": " + JSON.stringify(item));
        });
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
     * @param array
     * @param cb
     * @param onDone
     */
    List.each = function (array, cb, onDone) {
        for (var i = 0; i < array.length; i++) {
            if (cb(array[i], i) == false) {
                break;
            }
        }

        if (onDone) onDone();
    };

    /**
     * @description loop for each item asynchronously
     * @static Static method
     * @param array
     * @param delegate function pointer to be called in loop params: (item, index, continueCallback)
     * @param onDone function will be called on loop end or any error occurred
     */
    List.eachAsync = function (array, delegate, onDone) {
        try {
            var idx = -1;
            var continueLoop = function () {
                var err = arguments[0];

                if (!err) {
                    if (++idx < array.length) {
                        delegate(array[idx], idx, continueLoop);
                    } else if (idx == array.length) {
                        onDone.apply(null, arguments);
                    }
                } else {
                    onDone.apply(null, arguments);
                }
            };
        } catch (er) {
            onDone.apply(null, [er]);
        }

        continueLoop(null);
    };

    /**
     * @description loop for each item in reverse order asynchronously
     * @static Static method
     * @param array
     * @param delegate function pointer to be called in loop params: (item, index, continueCallback)
     * @param onDone function will be called on loop end or any error occurred
     */
    List.eachAsyncReverse = function (array, delegate, onDone) {
        try {
            var idx = array.length;
            var continueLoop = function () {
                var err = arguments[0];

                if (!err) {
                    if (--idx >= 0) {
                        delegate(array[idx], idx, continueLoop);
                    } else if (idx == -1) {
                        onDone.apply(null, arguments);
                    }
                } else {
                    onDone.apply(null, arguments);
                }
            };
        } catch (er) {
            onDone.apply(null, [er]);
        }

        continueLoop(null);
    };

    /**
     * @description loop for nth iteration
     * @static Static method
     * @param iteration Number of iteration
     * @delegate function pointer to be called in loop params: (item, index, continueCallback)
     * @onDone function will be called on loop end or any error occurred
     * @param cb
     */
    List.loopAsync = function (noOfIteration, delegate, onDone) {
        try {
            var idx = -1;
            var continueLoop = function () {
                var err = arguments[0];
                var isStopSignal = arguments[1];

                if (!err) {
                    if (isStopSignal == true) {
                        onDone.apply(null, arguments);
                    } else if (++idx < noOfIteration) {
                        delegate(idx, continueLoop);
                    } else if (idx == noOfIteration) {
                        onDone.apply(null, arguments);
                    }
                } else {
                    onDone.apply(null, arguments);
                }
            };
        } catch (er) {
            onDone.apply(null, [er]);
        }

        continueLoop(null);
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
     * returns list of values extracted from array or object property values
     * @example List.exeAsync(f1, f2, f3);
     */
    List.toList = function (obj) {
        if(Array.isArray(obj))
            return new List(obj);
        else {
            var list = new List();
            Object.keys(obj).forEach(function(key){
                if(obj.hasOwnProperty(key)){
                    list.add(obj[key]);
                }
            });
            return list;
        }
    };

    /*********************---------------------********************/
    /*********************         Queue       ********************/
    /*********************---------------------********************/
    /**
     * @description A Queue
     * @constructor
     */
    var Queue = function () {
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
     * @returns {T}
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
    var FixedQueue = function (maxCount) {
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

    module.exports = Collections;

})(module);