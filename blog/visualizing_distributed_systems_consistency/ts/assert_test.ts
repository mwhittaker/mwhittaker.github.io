/// <reference path="assert.ts" />
/// <reference path="unittest.ts" />

namespace assert_test {

unittest.register("assert_test.test_assert", function() {
  assert.assert(true);
  assert.assert(true, "msg");
  unittest.expect_error(function() { assert.assert(false); });
  unittest.expect_error(function() { assert.assert(false, "msg"); });
});

unittest.register("assert_test.test_assert_eq", function() {
  assert.assert_eq(1, 1);
  unittest.expect_error(function() { assert.assert_eq(1, 2); });
});

unittest.register("assert_test.test_assert_ne", function() {
  assert.assert_ne(1, 2);
  unittest.expect_error(function() { assert.assert_ne(1, 1); });
});

unittest.register("assert_test.test_assert_lt", function() {
  assert.assert_lt(1, 2);
  unittest.expect_error(function() { assert.assert_lt(1, 1); });
  unittest.expect_error(function() { assert.assert_lt(2, 1); });
});

unittest.register("assert_test.test_assert_le", function() {
  assert.assert_le(1, 1);
  assert.assert_le(1, 2);
  unittest.expect_error(function() { assert.assert_le(2, 1); });
});

unittest.register("assert_test.test_assert_gt", function() {
  assert.assert_gt(2, 1);
  unittest.expect_error(function() { assert.assert_gt(1, 1); });
  unittest.expect_error(function() { assert.assert_gt(1, 2); });
});

unittest.register("assert_test.test_assert_ge", function() {
  assert.assert_ge(1, 1);
  assert.assert_ge(2, 1);
  unittest.expect_error(function() { assert.assert_ge(1, 2); });
});

unittest.register("assert_test.test_assert_array_eq", function() {
  assert.assert_array_eq([], []);
  assert.assert_array_eq([1], [1]);
  assert.assert_array_eq([1, 2], [1, 2]);
  assert.assert_array_eq([1, 2, 3], [1, 2, 3]);
  unittest.expect_error(function() { assert.assert_array_eq([], [1]); });
  unittest.expect_error(function() { assert.assert_array_eq([1], []); });
  unittest.expect_error(function() { assert.assert_array_eq([1], [1, 2]); });
  unittest.expect_error(function() { assert.assert_array_eq([1, 2], [1]); });
  unittest.expect_error(function() { assert.assert_array_eq([1], [1, 2]); });
  unittest.expect_error(function() { assert.assert_array_eq([1, 2], [2, 1]); });
});

} // assert_test
