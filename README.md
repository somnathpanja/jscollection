# jscollection
A simple and powerful generic collection (List, Stack, Queue, FixedQueue) including power of LINQ for Javascript, node.js

## Installation

  npm install jscollection --save

## How to use

Creating list
'''js
    var list = new List([1, 2, 3, 4]); OR
    var list = new List();
    list.addRange([1, 2, 3, 4]);
'''
Adding Item to List

    var list = new List();
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);
        
Lets add some objects

    var list = new List([{name:"Student1", marks: 20}, 
                         {name:"Student2", marks: 20}, 
                         {name:"Student3", marks: 20}
                         ]);
    
Perform select query by key

    var names = list.select("name");
        
Perform select query by selector function

    var names = list.select(function(t){return t.name;});


## Tests

  node test/test.js

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release
