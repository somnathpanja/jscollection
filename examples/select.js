var collection = require('./../index');
var List = collection.List;

var students = new List([{name: "Ranjan", marks: 40, subjects: ['Physics', 'Chemistry', 'Mathematics']},
  {name: "Somnath", marks: 40, subjects: ['Chemistry', 'Mathematics']},
  {name: "Rohan", marks: 90, subjects: ['Physics', 'Mathematics']},
  {name: "Vinay", marks: 80, subjects: ['Physics', 'Chemistry', 'Mathematics']},
  {name: "Rohit", marks: 60, subjects: ['Physics', 'Chemistry']},
  {name: "Pratiksha", marks: 60, subjects: ['Physics', 'Mathematics']},
  {name: "Ruby", marks: undefined, subjects: ['Physics', 'Chemistry', 'Mathematics']}]);

console.log('*******[select names of all students]*********');

// var nameOfAllStudentsList = students.select('name'); // will work also in this case
var nameOfAllStudentsList = students.select(function (st) { return st.name;});
nameOfAllStudentsList.printInConsole();