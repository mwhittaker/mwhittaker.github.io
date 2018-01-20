// import history.js

register = {}

// type Register = {
//   _x: any,
//   write: any -> undefined
//   read: any -> any
// }
register.Register = function(x) {
  this._x = x;

  this.write = function(x) {
    this._x = x;
  }

  this.read = function() {
    return this._x;
  }
}

register.RequestBuilder = function() {
  this.write = function(x) {
    return new history.Request("write", [x]);
  }

  this.read = function() {
    return new history.Request("read", []);
  }
}
