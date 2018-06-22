var collection = require('./../index');
var List = collection.List;


var list = new List([{name:'name1', pid:1212}, {name:'name2', pid:1212}]);
list.eachAsync(function(item, idx, next){
  console.log(item.name);
  next();
}, function done () {
  console.log('DONE');
});