/**
 * Created by somnath.panja on 7/23/2015.
 */

var collection = require('./../index');
var List = collection.List;
var Queue = collection.Queue;
var FixedQueue = collection.FixedQueue;

/* Working with list */
// Creating list
var myList = new List();
var myList = new List([1, 2, 3, 4]);

// Adding items in List
myList.add(1);
myList.addRange([3, 4, 5]);  // Adding multiple Items
myList.insertAt(1, 2);       // Inserting 2 at index position 1
myList.removeAt(4);          // removing the item from index position 4
myList.removeFirst();        // Remove first time from collection if exists
myList.removeLast();         // Remove last time from collection if exists

// Base functions
var isThisCollectionIsAList = List.isList(myList);  // Check whether the type of the collection is List
var myArrayOfItems = myList.toArray();          // Collect javaScript array from collection

// Accessing items from collection
var item = myList[2];                // Get the item from 2 index position, similarly like Array
var firstItem = myList.first();      // Get the first item from the collection, returns undefined if does not exist
var lastItem = myList.last();        // Get the last item from the collection,  returns undefined if does not exist
var length = myList.count();         // Get length of the collection. myList.lenght also works
var isAnyItemInList = myList.any();  // return true/false
var average = myList.avg();          // Get the first item from the collection
var total = myList.sum();            // Get the first item from the collection

// Working with objects and static functions
/** Here is a list of students having name, marks in different subjects and grade. Grade is set to undefined
 *  Our job is to display name, average marks and grade for each student where
 *       avg > 90 is "A"
 *       avg > 80 but < 75 is "B"
 *       else are "c" grade
 */
var students = [
    {"name": "Somnath", "marks": {"physics": 59, "english": 78, "programming": 70}, "grade": undefined},
    {"name": "Rob", "marks": {"physics": 49, "english": 88, "programming": 30}, "grade": undefined},
    {"name": "John", "marks": {"physics": 29, "english": 48, "programming": 20}, "grade": undefined},
    {"name": "Danish", "marks": {"physics": 29, "english": 58, "programming": 70}, "grade": undefined},
    {"name": "Jenny", "marks": {"physics": 29, "english": 38, "programming": 60}, "grade": undefined},
    {"name": "Rohit", "marks": {"physics": 39, "english": 76, "programming": 20}, "grade": undefined}
];

List.extend(students); // extend the array to list, Now all list functionality can be used

var result = students.select(function (s) {
    var avgMarks = List.toList(s.marks).avg();
    return {
        name: s.name,
        avg: avgMarks,
        grade: (avgMarks > 90) ? "A" : ((avgMarks > 80 && avgMarks < 75) ? "B" : "C")
    }
});

// Print the result in console
result.printInConsole();