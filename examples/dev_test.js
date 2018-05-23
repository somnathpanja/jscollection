var foo = function () {
  var params = ['first'];
  Array.prototype.push.apply(params, arguments);

  console.log(params);


};


foo('two', 'three');