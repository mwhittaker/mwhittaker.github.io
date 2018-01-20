// import history.js

kvs = {}

// type Kvs = {
//   _kvs: {any -> any}
//   get: any -> any
//   set: any -> any -> undefined
// }
kvs.Kvs = function() {
  this._kvs = {};

  this.get = function(k) {
    if (!(k in this._kvs)) {
      return null;
    }
    return this._kvs[k];
  }

  this.set = function(k, v) {
    this._kvs[k] = v;
  }
}

kvs.RequestBuilder = function() {
  this.get() = function(k) {
    return new history.Request("get", [k]);
  }

  this.set() = function(k, v) {
    return new history.Request("set", [k, v]);
  }
}
