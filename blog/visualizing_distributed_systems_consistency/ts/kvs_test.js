// import common.js

kvs_test = {};

kvs_test.main = function() {
  var k = new kvs.Kvs();
  common.assert_eq(k.get(0), null);
  common.assert_eq(k.get(1), null);
  k.set(0, "zero");
  k.set(1, "one");
  common.assert_eq(k.get(0), "zero");
  common.assert_eq(k.get(1), "one");
  k.set(1, "uno");
  common.assert_eq(k.get(1), "uno");
}

kvs_test.main();
