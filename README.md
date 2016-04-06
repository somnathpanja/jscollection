# jscollection
A simple and powerful generic collection (List, Stack, Queue, FixedQueue) including power of LINQ for Javascript, node.js

## Installation

  npm install jscollection
  
## List of functions

Basic functions
   
  * var myList = new List();
  * myList.add(item)               // Add an item in collection
  * myList.addRange(arrayOfItems)  // Add multiple items in collection
  * myList.insertAt(index, item);  // Insert an item at a given position
  * myList.removeAt(index);        // Remove an item from a given position also returns the deleted item
  * myList.remove(item)            // Remove an item from collection also returns the deleted item
  * myList.removeLast()            // Remove the last item from collection also returns the deleted item
  * myList.removeAt(index)         // Remove an item at specific index from collection also returns the deleted item
  * myList.first()                 // Get the first item from the collection
  * myList.last()                  // Get the last item from the collection
  * myList.count()                 // Get the size of the collection
  * myList.any()                   // Is there any items present in collection?
  * myList.avg()                   // Calculate average of values present in collection
  * myList.sum()                   // Calculate sum of values present in collection

Traversing the collection

  * each(function)                 // Traverse the collection
  * eachReverse(function)          // Traverse the collection in reverse way
  * eachAsync(function(item,index,nextCallback){}) // traverse the collection and perform asynchronous operations for each

Querying the collection 

  * select(selector function)
  * selectMulti(selector function)
  * where(selector function)
  * groupby(selector function)
  * orderByAsc(comparator function)
  * orderByDesc(comparator function)
  * unique()
  * top(count)
  * bottom(count)
  * range(fromIndex,toIndex)

Others

  * List.extend(myArray);          // Extend an array to List in order to avail features of List

## How to use js collection? Example?

####Creating list

    var list = new List([1, 2, 3, 4]); 
    // OR
    var list = new List();
    list.addRange([1, 2, 3, 4]);

####Adding Item to List

    var list = new List();
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);

####Lets add some objects

    // Lists of students as an example
    var list = new List([{name:"Jhon", marks: 80, class: 1}, 
                         {name:"Micle", marks: 91, class: 1}, 
                         {name:"Ritu", marks: 50, class: 2},
                         {name:"Sonia", marks: 50, class: 2}
                         ]);
                         
####Removing Item to List using remove(), removeLast(), removeAt() and clear()

    list.remove(item);
    var removedItem = list.removeLast();    // Removes the last item from collection
    var removedItem = list.removeAt(index); // Removes an item present at index

####Delete or clear all items from collection using clear()

    list.clear();

####Traversing a collection using each, eachReverse

    list.each(function(item, indexOfItem){
        console.log(item.name +':' + item.marks);
    });
    
     list.eachReverse(function(item, indexOfItem){
        console.log(item.name +':' + item.marks);
    });
    
####Break the loop while traversing through collection

    list.each(function(item, indexOfItem){
        console.log(item.name +':' + item.marks);
        if(indexOfItem == 3) return false; // Returning false will break the loop
    });
    
####Perform select query by key using select

    var names = list.select("name");
        
####Perform select query by selector function

    var names = list.select(function(t){return t.name;});

####Perform where query (Select names of the student where markes >= 80)

    var names = list.where(function(t){return (t.marks >= 80);}).select('name');
    
####Perform groupby query in javascript

    /* According to above data set our result will be creting two groups. 
       One group where class=1 and another for class=2 */
    var groups = list.groupby('class'}); 
    // OR
    var groups = list.groupby(function(t){return t.class;});
    
#### Execute asynchronous functions one after another

    List.exeAsync(function insertIntomongo(next){
            // Do operation in mongo
            next(datareturnedFromMongo); // once you are done call next
    }, function insertIntoOracle(next, datareturnedFromMongo){
            // Do operation in oracle
            next(datareturnedFromOracle); // // once you are done call next
    }, function onDone(next, datareturnedFromOracle){
           // final call back here
    });
    
#### Call a function N times asynchronously using loopAsync
    
    list.loopAsync(N, function callMeNTimes(index, next){
        console.log('Called :' + index);
        next();
    });
       
## Tests

  node test/test.js

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release
* 1.0.1 Released
* 1.0.3 Released
* 1.0.4 Released
* 1.0.5 Released