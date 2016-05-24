var expect = require("chai").expect;
var List = require("../index").List;

describe("UNIT TEST => (List)", function () {
  describe("BASICS OF ARRAY TESTS", function () {
    it(".join()", function () {
      var list1 = (new List([1, 2, 3, 4, 5, 6, 7]));
      expect(list1.join(', ')).to.equal('1, 2, 3, 4, 5, 6, 7');
      expect(list1.join('')).to.equal('1234567');
    });
  });

  describe("BASIC", function () {
    it("Instantiate List", function () {
      var list = new List([1, 2, 3, 4]);
      expect(list.length).to.equal(4);
      expect(List.constructor).to.equal(List);
    });

    it(".add()", function () {
      var list = new List([1, 2, 3, 4]);
      list.add(5);
      expect(list.count()).to.equal(5).to.equal(list.toArray().length);
    });

    it(".addRange()", function () {
      var list = new List([1, 2, 3, 4]);
      list.addRange('ABCD');
      expect(list.count()).to.equal(5);
      list.addRange([{}, {}, {}, {}]);
      expect(list.count()).to.equal(9);
    });

    it(".remove()", function () {
      var list = new List([1, 2, 3, 4]);
      list.addRange('ABCD');
      expect(list.count()).to.equal(5);
      list.addRange([{}, {}, {}, {}]);
      expect(list.count()).to.equal(9);
    });

    it(".removeFirst()", function () {
      var list = new List([1, 2, 3, 4]);
      var item = list.removeFirst();
      expect(list.count()).to.equal(3);
      expect(item).to.equal(1);
      expect(list.first()).to.equal(2);
    });

    it(".removeLast()", function () {
      var list = new List([1, 2, 3, 4]);
      var item = list.removeLast();
      expect(list.count()).to.equal(3);
      expect(item).to.equal(4);
      expect(list.last()).to.equal(3);
    });

    it(".clear()", function () {
      var list = new List([1, 2, 3, 4]);
      list.clear();
      expect(list.count()).to.equal(0);
    });

    it(".top()", function () {
      var list = new List([1, 2, 3, 4]);
      var tops = list.top(2);
      expect(tops.count()).to.equal(2);
      expect(tops.first()).to.equal(1);
      expect(tops.last()).to.equal(2);
    });

    it(".bottom()", function () {
      var list = new List([1, 2, 3, 4]);
      var tops = list.bottom(2);
      expect(tops.count()).to.equal(2);
      expect(tops.first()).to.equal(3);
      expect(tops.last()).to.equal(4);
    });

    it(".range()", function () {
      var list = new List([1, 2, 3, 4, 6, 7, 8]);
      var out = list.range(3, 6);
      expect(out.count()).to.equal(4);
      expect(out.first()).to.equal(4);
      expect(out.last()).to.equal(8);
    });

    it(".any()", function () {
      var list = new List([1, 2, 3, 4, 6, 7, 8]);
      var out = list.range(3, 6);
      expect(out.any()).to.equal(true);
      out.clear();
      expect(out.any()).to.equal(false);
      expect(list.any()).to.equal(true);
    });

    it(".insertAt()", function () {
      var list = new List([1, 2, 3, 4, 6, 7, 8]);
      list.insertAt(1, 1.5);
      expect(list[1]).to.equal(1.5);
    });

    it(".removeAt()", function () {
      var list = new List([1, 2, 3, 4, 6, 7, 8]);
      var item = list.removeAt(1);
      expect(item).to.equal(2);
      expect(list[1]).to.equal(3);
    });
  });

  describe("LOOPS", function () {
    it(".each()", function () {
      var rows = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4}
      ];

      var retIds = [];

      List.each(rows, function (item, index) {
        // console.log('   Visiting Index:' + index + ' item: ' + JSON.stringify(item));
        retIds.push(item);
      });

      expect(retIds[0].id).to.equal(1);
      expect(retIds[1].id).to.equal(2);
      expect(retIds[2].id).to.equal(3);
      expect(retIds[3].id).to.equal(4);
    });
    it(".eachReverse()", function () {
      var rows = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4}
      ];

      var retIds = [];

      List.eachReverse(rows, function (item, index) {
        retIds.push(item);
      });

      expect(retIds[0].id).to.equal(4);
      expect(retIds[1].id).to.equal(3);
      expect(retIds[2].id).to.equal(2);
      expect(retIds[3].id).to.equal(1);
    });

    it(".eachAsync()", function () {
      var rows = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4}
      ];

      var retIds = [];

      List.eachAsync(rows, function (item, index, next) {
        retIds.push(item);
        next();
      }, function onDone() {
        expect(retIds[0].id).to.equal(1);
        expect(retIds[1].id).to.equal(2);
        expect(retIds[2].id).to.equal(3);
        expect(retIds[3].id).to.equal(4);
      });
    });
    it(".eachAsyncReverse()", function () {
      var rows = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4}
      ];

      var retIds = [];

      List.eachAsyncReverse(rows, function (item, index, next) {
        retIds.push(item);
        next();
      }, function onDone() {
        expect(retIds[0].id).to.equal(4);
        expect(retIds[1].id).to.equal(3);
        expect(retIds[2].id).to.equal(2);
        expect(retIds[3].id).to.equal(1);
      });
    });
  });

  describe("AGGREGATION", function () {
    it(".sum()", function () {
      expect(new List([1, 2, 3, 4]).sum()).to.equal(10);
    });
    it(".avg()", function () {
      expect(new List([1, 2, 3, 4]).avg()).to.equal(2.5);
    });
  });

  describe("SQL QUERY IN JAVASCRIPT", function () {
    var students = new List([{name: "Name1", marks: 40, subjects: ['A', 'B', 'C']},
      {name: "Name2", marks: 40, subjects: ['B', 'C']}, {name: "Name3", marks: 90, subjects: ['A', 'C']},
      {name: "Name4", marks: 80, subjects: ['A', 'B', 'C']}, {name: "Name5", marks: 60, subjects: ['A', 'B']},
      {name: "Name6", marks: 60, subjects: ['A', 'C']}, {
        name: "Name6",
        marks: undefined,
        subjects: ['A', 'B', 'C']
      }]);

    it(".select() => select names of all students", function () {
      var allNames1 = students.select('name');
      expect(allNames1.count()).to.equal(7);
      expect(List.isList(allNames1)).to.equal(true);

      var allNames2 = students.select(function (st) {
        return st.name;
      });

      expect(allNames1.count()).to.equal(allNames2.count());
      expect(allNames1.first()).to.equal(allNames2.first());
      expect(allNames1.last()).to.equal(allNames2.last());
    });

    it(".selectMulti() => select all the subjects studied by students", function () {
      var allNames1 = students.selectMulti('subjects');
      var allNames2 = students.selectMulti(function (it) {
        return it.subjects;
      });

      expect(allNames1.count()).to.equal(allNames2.count());
      expect(allNames1.first()).to.equal(allNames2.first());
      expect(allNames1.last()).to.equal(allNames2.last());
    });

    it(".where() => select all the students who got marks more or equal to 60", function () {
      var selected = students.where(function (st) {
        return (st.marks >= 60);
      });

      expect(selected.count()).to.equal(4);
    });

    it(".orderByAsc() => select all the students who got marks more or equal to 60 order by ascending marks", function () {
      var selected = students.where(function (st) {
        return (st.marks >= 60);
      }).orderByAsc(function (t) {
        return t.marks;
      });

      expect(selected.count()).to.equal(4);
      expect(selected.first().marks).to.equal(60);
      expect(selected.last().marks).to.equal(90);
    });

    it(".orderByDesc", function () {
      var selected = students.where(function (st) {
        return (st.marks >= 60);
      }).orderByDesc(function (t) {
        return t.marks;
      });

      expect(selected.count()).to.equal(4);
      expect(selected.first().marks).to.equal(90);
      expect(selected.last().marks).to.equal(60);
    });

    it(".groupBy() => group the student by subject", function () {
      var group = students.groupBy('marks');
      expect(group.select('key').count()).to.equal(5);
      expect(group.first().value.count()).to.equal(2);
      expect(group.last().value.count()).to.equal(1);
    });

    it(".unique() => select all the subjects studied by students", function () {
      var allNames1 = students.selectMulti('subjects').unique();
      expect(allNames1.count()).to.equal(3);
      expect(allNames1.first()).to.equal('A');
      expect(allNames1.last()).to.equal('C');
    });
  });

  describe("MISCELLANEOUS", function () {
    it(".ToArray()", function () {
      var list = new List([1, 2, 3]);
      var arry = list.toArray();
      expect(list).to.not.equal(arry);
    });

    it("List.isList()", function () {
      var list = new List([1, 2, 3]);
      expect(List.isList(list)).to.equal(true);
    });
  });
});