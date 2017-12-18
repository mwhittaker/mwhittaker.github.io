queue = {}

// type Queue = {
//   _xs: [any],
//   push: any -> undefined
//   pop: undefined -> any
// }
queue.Queue = function() {
  this._xs = [];

  this.push = function(x) {
    this._xs.push(x);
  }

  this.pop = function() {
    return this._xs.shift();
  }
}
