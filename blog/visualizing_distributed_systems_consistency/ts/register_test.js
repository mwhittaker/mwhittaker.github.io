// import common.js
// import register.js

register_test = {};

register_test.main = function() {
  var r = new register.Register(0);
  common.assert_eq(r.read(), 0);
  r.write(1);
  common.assert_eq(r.read(), 1);
  r.write(2);
  r.write(3);
  common.assert_eq(r.read(), 3);
  common.assert_eq(r.read(), 3);
}

register_test.main();
