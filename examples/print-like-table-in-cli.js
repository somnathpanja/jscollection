var collection = require('./../index');
var List = collection.List;

var students = new List([{name: "Ranjan", marks: 40, subjects: ['Physics', 'Chemistry', 'Mathematics']},
  {name: "Somnath", marks: 40, subjects: ['Chemistry', 'Mathematics']},
  {name: "Rohan", marks: 90, subjects: ['Physics', 'Mathematics']},
  {name: "Vinay", marks: 80, subjects: ['Physics', 'Chemistry', 'Mathematics']},
  {name: "Rohit", marks: 60, subjects: ['Physics', 'Chemistry']},
  {name: "Pratiksha", marks: 60, subjects: ['Physics', 'Mathematics']},
  {name: "Ruby", marks: undefined, subjects: ['Physics', 'Chemistry', 'Mathematics']}]);

console.log('*******[select names of all the students groupBy departments(i.e. subject)]*********');

var groupByDepartments = students.selectMulti(function (student) {
  return List.toList(student.subjects).select(function (subj) { return {department: subj, studentName: student.name};});
}).groupBy('department').select(function cleanup(group) {
  return {department: group.key, students: group.value.select('studentName').toArray()};
});

groupByDepartments.printInConsoleAsTable();