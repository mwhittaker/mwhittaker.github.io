// import common.js

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
