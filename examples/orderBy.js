var collection = require('./../index');
var List = collection.List;

var students = new List([{name: "Ranjan", marks: 40, subjects: ['Physics', 'Chemistry', 'Mathematics']},
  {name: "Somnath", marks: 40, subjects: ['Chemistry', 'Mathematics']},
  {name: "Rohan", marks: 90, subjects: ['Physics', 'Mathematics']},
  {name: "Vinay", marks: 80, subjects: ['Physics', 'Chemistry', 'Mathematics']},
  {name: "Rohit", marks: 60, subjects: ['Physics', 'Chemistry']},
  {name: "Pratiksha", marks: 60, subjects: ['Physics', 'Mathematics']},
  {name: "Ruby", marks: undefined, subjects: ['Physics', 'Chemistry', 'Mathematics']}]);

console.log('*******[select all the students who got marks more or equal to 60 order by ascending marks]*********');

var selected = students.where(function (st) {
  return (st.marks >= 60);
}).orderByAsc(function (t) {
  return t.marks;
}).select(function (st) {
  return {name: st.name, total_marks: st.marks}
});

selected.printInConsole();

console.log('*******[select all the students who got marks more or equal to 60 order by descending marks]*********');

var selected = students.where(function (st) {
  return (st.marks >= 60);
}).orderByDesc(function (t) {
  return t.marks;
}).select(function (st) {
  return {name: st.name, total_marks: st.marks}
});

selected.printInConsole();
