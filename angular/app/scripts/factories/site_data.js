angular.module('bookSwitchApp').factory('SiteData', function(
  $cookies,
  appConfig
) {
  var data = {};
  // SiteData attributes to automatically be read from/written to cookies
  // Note: saveToCookie is required for subsequent attributes and should be set first
  var cookieAttributes = ['saveToCookie', 'username', 'token', 'lastIsbnEntered'];
  var cookiesOptions = {
    expires: new Date((new Date()).getTime() + appConfig.cookieExpirationInDays * 24 * 60 * 60 * 1000)
  };

  function set(key, value) {
    data[key] = value;

    // if key is in cookieAttributes, save to cookie
    if(cookieAttributes.indexOf(key) > -1)
      // if data.saveToCookie is true, set expiration on cookie, otherwise set as session cookie
      $cookies.put(key, value, get('saveToCookie') ? cookiesOptions : {});
  }

  function get(key) {
    return data[key];
  }

  function remove(key) {
    delete data[key];

    if($cookies.get(key))
      $cookies.remove(key);
  }

  function removeAll() {
    angular.forEach(data, function(value, key) {
      remove(key);
    })
  }

  function loadDataFromCookies(attributes) {
    angular.forEach(attributes, function(value) {
      var cookieValue = $cookies.get(value);

      if(angular.isDefined(cookieValue)) {
        set(value, cookieValue);
      }
    });
  }

  // Read cookies and save to data object
  loadDataFromCookies(cookieAttributes);

  return {
    set: set,
    get: get,
    remove: remove,
    removeAll: removeAll
  }
});
