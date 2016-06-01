// allow ng-repeat to iterate by number
Number.prototype.toArray = Number.prototype.toArray || function() {
  var value = this.valueOf();
  return new Array(isNaN(value) ? 0 : value);
}

// add array splice helper
Array.prototype.remove = Array.prototype.remove || function(element) {
  var index = this.indexOf(element);

  if(index > -1) {
    this.splice(index, 1);
  }

  return this;
}
