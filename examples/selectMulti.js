var collection = require('./../index');
var List = collection.List;

var students = new List([{name: "Ranjan", marks: 40, subjects: ['Physics', 'Chemistry', 'Mathematics']},
  {name: "Somnath", marks: 40, subjects: ['Chemistry', 'Mathematics']},
  {name: "Rohan", marks: 90, subjects: ['Physics', 'Mathematics']},
  {name: "Vinay", marks: 80, subjects: ['Physics', 'Chemistry', 'Mathematics']},
  {name: "Rohit", marks: 60, subjects: ['Physics', 'Chemistry']},
  {name: "Pratiksha", marks: 60, subjects: ['Physics', 'Mathematics']},
  {name: "Ruby", marks: undefined, subjects: ['Physics', 'Chemistry', 'Mathematics']}]);

console.log('*******[select all the unique subjects studied by students]*********');

// var allSubjects = students.selectMulti(function (it) {return it.subjects; }).unique(); // will work also
var allSubjects = students.selectMulti('subjects').unique();

allSubjects.printInConsole();
