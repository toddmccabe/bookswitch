bookSwitchApp.filter('possessive', function() {
  return function(input) {
    input = input || '';

    if(input.slice(-1).toLowerCase() == 's') {
      return input + '\'';
    } else {
      return input + '\'s';
    }
  }
});
