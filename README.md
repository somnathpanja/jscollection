# jscollection
A simple and powerful generic collection (List, Stack, Queue, FixedQueue) including power of LINQ for Javascript, node.js

## Installation

  npm install jscollection
  
## List of functions

Basic functions

  * var myList = new List();
  * myList.add(item)                      // Add an item in collection
  * myList.addRange(arrayOfItems)         // Add multiple items in collection
  * myList.insertAt(index, item);         // Insert an item at a given position
  * var retItem = myList.removeAt(index); // Remove an item from a given position
  * myList.remove(item)                   // Remove an item from collection
  * myList.removeLast()                   // Remove the last item from collection
  * myList.removeAt(index)                // Remove an item at specific index from collection
  * myList.first()                        // Get the first item from the collection
  * myList.last()                         // Get the last item from the collection
  * myList.count()                        // Get the first item from the collection
  * myList.any()                          // Get the first item from the collection
  * myList.avg()                          // Get the first item from the collection
  * myList.sum()                          // Get the first item from the collection

Traversing the collection

  * each(function) - travarse the collection
  * eachReverse(function) - travarse the collection in reverse way
  * eachAsyn(function(item,index,nextCallback){}) - travarse the collection and perform asynchronous operations for each

Quering the collection 

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

## How to use

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
    
#### Execute asyncronus functions one after another

    List.exeAsync(function insertIntomongo(next){
            // Do operation in mongo
            next(datareturnedFromMongo); // once you are done call next
    }, function insertIntoOracle(datareturnedFromMongo, next){
            // Do operation in oracle
            next(datareturnedFromOracle); // // once you are done call next
    }, function onDone(datareturnedFromOracle, next){
           
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
