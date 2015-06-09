# jscollection
A simple and powerful generic collection (List, Stack, Queue, FixedQueue) including power of LINQ for Javascript, node.js

## Installation

  npm install jscollection --save

## How to use

####Creating list

    var list = new List([1, 2, 3, 4]); 
    // OR
    var list = new List();
    list.addRange([1, 2, 3, 4]);

Adding Item to List

    var list = new List();
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);
        
Lets add some objects

    // Lists of students as an example
    var list = new List([{name:"Jhon", marks: 80, class: 1}, 
                         {name:"Micle", marks: 91, class: 1}, 
                         {name:"Ritu", marks: 50, class: 2},
                         {name:"Sonia", marks: 50, class: 2}
                         ]);
    
Perform select query by key

    var names = list.select("name");
        
Perform select query by selector function

    var names = list.select(function(t){return t.name;});

Perform where query (Select names of the student where markes >= 80)

    var names = list.where(function(t){return (t.marks >= 80);}).select('name');
    
Perform groupby query (Lets group by class)

    /* According to above data set our result will be creting two groups. 
       One group where class=1 and another for class=2 */
    var groups = list.groupby('class'}); 
    // OR
    var groups = list.groupby(function(t){return t.class;});


## Tests

  node test/test.js

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release
