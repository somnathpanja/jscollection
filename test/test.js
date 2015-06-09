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
 * @fileOverview Test
 * @author       somnath Panja
 */

(function (module) {

    var Collection = require('./../src/collections.js');
    var List = Collection.List;
    var Queue = Collection.Queue;
    var FixedQueue = Collection.FixedQueue;

    var p = function () {
        var str = '';
        for (var idx = 0; idx < arguments.length; idx++) {
            if ('Failed' == arguments[idx])
                str += '------------------------------';

            str += ': ' + arguments[idx];
        }

        console.log(str);
    };

    var success = function (args) {
        var testGroupName = args.callee.caller.name.toString();
        var testCaseName = args.callee.name.toString();

        console.log(testGroupName + ' -> ' + testCaseName + " -> Success");
    };

    var failed = function (args, extraInfo) {
        var testGroupName = args.callee.caller.name.toString();
        var testCaseName = args.callee.name.toString();

        var print = testGroupName + ' -> ' + testCaseName ;

        if(extraInfo) {
            print += JSON.stringify(extraInfo) + " >"
        }

        print += " ----------------> Failed!";
        console.log(print);
    };

    (function TestList() {

        (function addRangeTest() {
            var list = new List();
            list.addRange([]);

            if (list.length === 0 && list.toArray().length == 0) {
                success(arguments);
            } else {
                failed(arguments, {'list.length': list.length, 'list.toArray().length': list.toArray().length });
            }
        })();

        (function singleAddContractorTest() {
            var list = new List(1);

            if (list[0] === 1) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function multipleAddContractorTest() {
            var list = new List([1, 2, 3, 4]);

            if (list[0] === 1 && list[1] === 2 && list[2] === 3 && list[3] === 4) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function EmptyListTest() {
            var list = new List([]);

            if (list.count() == 0) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function singleAddTest() {
            var list = new List();
            list.add(1);
            list.add(2);
            list.add(3);
            list.add(4);

            if (list[0] === 1 && list[1] === 2 && list[2] === 3 && list[3] === 4) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function singleAddRangeTest() {
            var list = new List();
            list.addRange([1, 2, 3, 4]);

            if (list[0] === 1 && list[1] === 2 && list[2] === 3 && list[3] === 4) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function removeAtTest() {
            var list = new List([1, 2, 3, 4]);

            if (list.removeAt(0) == 1 && list.removeAt(0) == 2 && list.removeAt(0) == 3 && list.removeAt(0) == 4) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function removeTest() {
            var list = new List([1, 2, 3, 4]);

            if (list.remove(3) == 3 && list[2] !== 3) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function insertAtTest() {
            var list = new List([2, 4, 6, 8]);
            list.insertAt(0, 1); // 1, 2, 4, 6, 8
            list.insertAt(2, 3); // 1, 2, 3, 4, 6, 8
            list.insertAt(4, 5); // 1, 2, 3, 4, 5, 6, 8
            list.insertAt(6, 7); // 1, 2, 3, 4, 5, 6, 7, 8

            if (list[0] === 1 && list[1] === 2 && list[2] === 3 && list[3] === 4
                && list[4] === 5 && list[5] === 6 && list[6] === 7) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function clearTest() {
            var list = new List([1, 2, 3, 4]);
            list.clear();

            if (list.count() == 0) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function clearTest() {
            var list = new List([1, 2, 3, 4]);
            list.clear();

            if (list.count() == 0) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function firstTest() {
            var list = new List([1, 2, 3, 4]);

            if (list.first() == 1) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function lastTest() {
            var list = new List([1, 2, 3, 4]);

            if (list.last(0) == 4 && list.last(1) == 3 && list.last(2) == 2 && list.last(3) == 1) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function rangeTest() {
            var list = new List([1, 2, 3, 4]);
            var rangeList = list.range(0, 2);

            if (rangeList.length == 3 && rangeList[0] == 1 && rangeList[1] == 2 && rangeList[2] == 3) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function selectTest() {
            var list = new List([
                {"reminder_id": 1394605968734, "resource_id": "{\"aid\":1,\"folder\":\"[Gmail]/All Mail\",\"uid\":1868}", "conversation_id": "1462171569175222559", "ts_due": 1279949899}
            ]);
            var rangeList = list.select(function (item) {
                item.ts_reminder = item['ts_due'];
                delete item['ts_due'];
                return item;
            }).toArray();

            if (rangeList.length == 1) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function arrayUniqueTest() {
            var list1 = (new List([1, 2, 3, 2, 2 , 1 , 3])).unique();

            if (list1.length == 3) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function arrayJoinTestTest() {
            var list1 = (new List([1, 2, 3, 4, 5 , 6 , 7]));
            var str = list1.join(', ');
            if (str == '1, 2, 3, 4, 5, 6, 7') {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function eachTest() {
            console.log('each-Started');
            var rows = [
                { id: 1},
                {id: 2 },
                {id: 3 },
                {id: 4 }
            ];

            var retIds = [];

            List.each(rows, function (item, index) {
                // console.log('   Visiting Index:' + index + ' item: ' + JSON.stringify(item));
                retIds.push(item);
            });

            if (retIds[0].id == 1 && retIds[1].id == 2 && retIds[2].id == 3 && retIds[3].id == 4) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function topTest1() {
            var rows = [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 }
            ];

            var list = new List(rows);
            var newList = list.top(3);

            if (list.length == 5 && newList.length == 3 && newList[0].id == 1 && newList[1].id == 2 && newList[2].id == 3) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function topTest2() {
            var rows = [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 }
            ];

            var list = new List(rows);
            var newList = list.top(10);

            if (list.length == 5 && newList.length == 5 && newList[0].id == 1 && newList[1].id == 2 && newList[2].id == 3) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function bottomTest1() {
            var rows = [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 }
            ];

            var list = new List(rows);
            var newList = list.bottom(3);

            if (list.length == 5 && newList.length == 3 && newList[0].id == 3 && newList[1].id == 4 && newList[2].id == 5) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function bottomTest2() {
            var rows = [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 }
            ];

            var list = new List(rows);
            var newList = list.bottom(13);

            if (list.length == 5 && newList.length == 5 && newList[0].id == 1 && newList[1].id == 2
                && newList[2].id == 3 && newList[3].id == 4 && newList[4].id == 5) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function eachAsynTestWithArray() {
            console.log('eachAsynTestWithArray-Started');
            var args = arguments;

            var foo = function (item, cb) {
                cb.apply(null, [null, item]);
                return;
            };

            var rows = [
                { id: 1},
                {id: 2 },
                {id: 3 },
                {id: 4 },
                {id: 5 }
            ];

            var retIds = [];

            List.eachAsyn(rows, function (item, index, continueLoop) {
                foo(item, function (err, data) {
                    if (err) {
                        continueLoop(err);
                        return;
                    }

                    // console.log('   Visiting Index:' + index + ' item: ' + JSON.stringify(item));
                    retIds.push(rows[0]);

                    continueLoop();
                });
            }, function onCompleted(err) {
                if (err) {
                    failed(args);
                }

                if (retIds.length == 5) {
                    success(args);
                } else {
                    failed(args);
                }

                console.log('eachAsynTestWithArray-End');
            });
        })();

        (function eachAsynTestWithList() {
            console.log('eachAsynTestWithList-Started');
            var args = arguments;
            var foo = function (item, cb) {
                cb.apply(null, [null]);
                return;
            };

            var rows = new List([
                { id: 1},
                {id: 2 },
                {id: 3 },
                {id: 4 },
                {id: 5 }
            ]);

            var retIds = [];

            rows.eachAsyn(function (item, index, continueLoop) {
                foo(item, function (err) {
                    if (err) {
                        continueLoop(err);
                        return;
                    }

                    // console.log('   Visiting Index:' + index + ' item: ' + JSON.stringify(item));
                    retIds.push(rows[index]);

                    continueLoop();
                });

            }, function onCompleted(err) {
                if (err) {
                    failed(arguments);
                }

                if (retIds[0].id == 1 && retIds[4].id == 5 && retIds.length == 5) {
                    success(args);
                } else {
                    failed(args);
                }

                console.log('eachAsynTestWithList-End');
            });
        })();

        (function whereTest() {
            var rows = [
                { id: 1},
                {id: 2 },
                {id: 3 },
                {id: 4 }
            ];

            var retIds = (new List(rows)).where(function (t) { return (t.id == 1);});
            if (retIds[0].id == 1) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

        (function exeAsynFunctionsTest() {
            var thisArgs = arguments;
            var rows = [
                {id: 1},
                {id: 2 },
                {id: 3 }
            ];

            List.exeAsync(function (next) {
                if (rows[0].id === 1 && rows[1].id === 2 && rows[2].id === 3) {
                    next(rows[0], rows[1], rows[2]);
                } else failed(thisArgs, 'Called 1st Func');
            }, function (next, one, two, three) {
                if (one.id === 1 && two.id === 2 && three.id === 3) {
                    next(one.id, two.id, three.id);
                } else failed(thisArgs, 'Called 2nd Func');
            }, function (next, one, two, three) {
                if (one === 1 && two === 2 && three === 3) {
                    next(-1);
                } else failed(thisArgs, 'Called 3nd Func');
            }, function (next, one) {
                if (one === -1) success(thisArgs); else failed(thisArgs, 'Called 4nd Func');
            });
        })();

        (function listAsArrayAccessTest() {
            var rows = [
                { id: 1},
                {id: 2 },
                {id: 3 },
                {id: 4 }
            ];

            var retIds = (new List(rows));

            if (retIds[0].id == 1 && retIds[1].id == 2) {
                success(arguments);
            } else {
                failed(arguments);
            }
        })();

    })();

})(module);
