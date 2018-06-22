# jscollection
[![Known Vulnerabilities](https://snyk.io/test/github/somnathpanja/jscollection/badge.svg?targetFile=package.json)](https://snyk.io/test/github/somnathpanja/jscollection?targetFile=package.json)
[![Build Status](https://travis-ci.org/somnathpanja/jscollection.svg?branch=master)](https://travis-ci.org/somnathpanja/jscollection)

A simple and powerful generic javascript collection (List, Stack, Queue, FixedQueue) including power of LINQ for Javascript, node.js

## Installation

  npm install jscollection

# WHATS NEW in v1.1.0 (23/06/2018)

##### List.sequentialExe: For better error handling, execute unlimited functions sequentially & asynchronously using sequentialExe
##### List.sequentialExe: Execute unlimited functions in parallel (asynchronously) using parallelExe

## List of functions

###### Basic functions
```javascript
* var myList = new List();
* myList.add(item)               // Add an item in collection
* myList.addRange(arrayOfItems)  // Add multiple items in collection
* myList.insertAt(index, item);  // Insert an item at a given position
* myList.removeAt(index);        // Remove an item from a given position also returns the deleted item
* myList.remove(item)            // Remove an item from collection also returns the deleted item
* myList.removeLast()            // Remove the last item from collection also returns the deleted item
* myList.removeAt(index)         // Remove an item at specific index from collection also returns the deleted item
* myList.first()                 // Get the first item from the collection, throws Index out of range exception if empty
* myList.last()                  // Get the last item from the collection, throws Index out of range exception if empty
* myList.count()                 // Get the size of the collection
* myList.any()                   // Is there any items present in collection? returns true/false
* myList.avg()                   // Calculate average of numeric values present in collection
* myList.sum()                   // Calculate sum of numeric values present in collection
* myList.reverse()               // Reversing the elements in an array
* myList.sort()                  // Sort items in collection
* myList.sort(compareFunction)   // Sort items in collection | http://www.w3schools.com/jsref/jsref_sort.asp#compareFunction
```
###### Traversing the collection
```javascript
* myList.each(function)                 // Traverse the collection
* myList.eachReverse(function)          // Traverse the collection in reverse way
* myList.eachAsync(function(item,index,nextCallback){}) // traverse the collection and perform asynchronous operations for each
* myList.eachAsyncReverse(function(item,index,nextCallback){}) // traverse the collection and perform asynchronous operations for each in reverse direction
```
###### Querying the collection | **See more examples at bottom**
```javascript
* myList.select(selector function)
* myList.selectMulti(selector function)
* myList.where(selector function)
* myList.groupby(selector function)
* myList.orderByAsc(comparator function)
* myList.orderByDesc(comparator function)
* myList.unique()
* myList.top(count)
* myList.bottom(count)
* myList.range(fromIndex,toIndex)
```
###### Static Functions | When you don't really need to convert an array to a List, So first argument of the functions below will be your array. 
```javascript
* List.extend(myArray); // Static Function | Extends an array to List in order to avail features of List
* List.toList(myArray, isSelectKeys);
* List.toList(myObject, isSelectKeys); // Creates new List from an Array or values list of a normal object, pass isSelectKeys as true if you want to consider keys
* List.printInConsole(); // Prints the data present in list in console | you can use it for debug purpose
* List.each(myArray, function)         // Traverse the collection
* List.eachReverse(myArray, function)  // Traverse the collection in reverse way
* List.eachAsync(myArray, function(item,index,nextCallback){}) // traverse the collection and perform asynchronous operations for each
* List.eachAsyncReverse(myArray, function(item,index,nextCallback){}) // traverse the collection and perform asynchronous operations for each in reverse direction
```
## How to use js collection? Example?

####Creating list
```javascript
    var list = new List([1, 2, 3, 4]); 
    // OR
    var list = new List();
    list.addRange([1, 2, 3, 4]);
```
####Adding Item to List
```javascript
    var list = new List();
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);
```
####Lets add some objects
```javascript
    // Lists of students as an example
    var list = new List([{name:"Jhon", marks: 80, class: 1}, 
                         {name:"Micle", marks: 91, class: 1}, 
                         {name:"Ritu", marks: 50, class: 2},
                         {name:"Sonia", marks: 50, class: 2}
                         ]);
```
####Removing Item from List using remove(), removeLast(), removeAt() and clear()
```javascript
    list.remove(item);
    var removedItem = list.removeLast();    // Removes the last item from collection
    var removedItem = list.removeAt(index); // Removes an item present at index
```
####Delete or clear all items from collection using clear()
```javascript
    list.clear();
```
####Traversing a collection using each, eachReverse
```javascript
    list.each(function(item, indexOfItem){
        console.log(item.name +':' + item.marks);
    });
    
     list.eachReverse(function(item, indexOfItem){
        console.log(item.name +':' + item.marks);
    });
```
#### Traversing a collection asynchronously using eachAsync, eachAsyncReverse
```javascript
    list.eachAsync(function(item, indexOfItem, next){
        console.log(item.name +':' + item.marks);
        next();
    });
    
    list.eachAsyncReverse(function(item, indexOfItem, previous){
        console.log(item.name +':' + item.marks);
        previous();
    });
```
####Break the loop while traversing through collection
```javascript
    list.each(function(item, indexOfItem){
        console.log(item.name +':' + item.marks);
        if(indexOfItem == 3) return false; // Returning false will break the loop
    });
```
####Perform select query by key using select
```javascript
    var names = list.select("name");
```
####Perform select query by selector function
```javascript
    var names = list.select(function(t){return t.name;});
```
####Perform where query (Select names of the student where markes >= 80)
```javascript
    var names = list.where(function(t){return (t.marks >= 80);}).select('name');
```
####Perform groupby query in javascript
```javascript
    /* According to above data set our result will be creting two groups. 
       One group where class=1 and another for class=2 */
    var groups = list.groupby('class'}); 
    // OR
    var groups = list.groupby(function(t){return t.class;});
```
#### Execute asynchronous functions one after another without caring about error
```javascript
    List.exeAsync(function insertIntomongo(next){
            // Do operation in mongo
            next(datareturnedFromMongo); // once you are done call next
    }, function insertIntoOracle(next, datareturnedFromMongo){
            // Do operation in oracle
            next(datareturnedFromOracle); // // once you are done call next
    }, function onDone(next, datareturnedFromOracle){
           // final call back here
    });
```
#### For better error handling, execute unlimited functions sequentially & asynchronously using sequentialExe
```javascript
    List.sequentialExe(function insertIntomongo(next){
            // Do operation in mongo
            next(error, datareturnedFromMongo); // once you are done call next
    }, function insertIntoOracle(next, datareturnedFromMongo){
            // Do operation in oracle
            next(error, datareturnedFromOracle); // // once you are done call next
    }, function onDone(error){
           // final call back here
           // Any error in any function will skip next function and directly comes to onDone function
    });
```
#### Execute unlimited functions in parallel (asynchronously) using parallelExe
```javascript
    List.parallelExe(function insertIntomongo(next){
            // Do operation in mongo
            next(datareturnedFromMongo); // once you are done call next
    }, function insertIntoOracle(next, datareturnedFromMongo){
            // Do operation in oracle
            next(datareturnedFromOracle); // // once you are done call next
    }, function onDone(next, results){
           // final call back here
           // err is nothing but the latest occurred error. results will contain output from all the executed functions
           So results = [[mongoError, datareturnedFromMongo],[oracleError, datareturnedFromOracle]];
    });
```
#### Call a function N times asynchronously using loopAsync
```javascript
    list.loopAsync(N, function callMeNTimes(index, next){
        console.log('Called :' + index);
        next(err, break);  // you can pass break = true to break the loop
    }, onDone(err){
         // if break is called or any error occurred then onDone function will be called
    });
```
#### * For more examples please Checkout jscollection/examples folder.

## Tests

  npm test
  install list "chai": "^3.5.0", "mocha": "^2.5.1"

## Authors and Contributors

@somnathpanja (somnathpanja@gmail.com)

## Support or Contact

Having trouble with Pages? Check out our documentation or report issue and we’ll help you sort it out.
https://github.com/somnathpanja/jscollection/issues

### Jscollection is maintained by somnathpanja (Somnath Panja).

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.
