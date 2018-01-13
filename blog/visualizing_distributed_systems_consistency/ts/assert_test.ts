import * as assert from "./assert";
import * as unittest from "./unittest";

unittest.register("assert_test.test_assert", () => {
  assert.assert(true);
  assert.assert(true, "msg");
  unittest.expect_error(() => { assert.assert(false); });
  unittest.expect_error(() => { assert.assert(false, "msg"); });
});

unittest.register("assert_test.test_assert_eq", () => {
  assert.assert_eq(1, 1);
  unittest.expect_error(() => { assert.assert_eq(1, 2); });
});

unittest.register("assert_test.test_assert_ne", () => {
  assert.assert_ne(1, 2);
  unittest.expect_error(() => { assert.assert_ne(1, 1); });
});

unittest.register("assert_test.test_assert_lt", () => {
  assert.assert_lt(1, 2);
  unittest.expect_error(() => { assert.assert_lt(1, 1); });
  unittest.expect_error(() => { assert.assert_lt(2, 1); });
});

unittest.register("assert_test.test_assert_le", () => {
  assert.assert_le(1, 1);
  assert.assert_le(1, 2);
  unittest.expect_error(() => { assert.assert_le(2, 1); });
});

unittest.register("assert_test.test_assert_gt", () => {
  assert.assert_gt(2, 1);
  unittest.expect_error(() => { assert.assert_gt(1, 1); });
  unittest.expect_error(() => { assert.assert_gt(1, 2); });
});

unittest.register("assert_test.test_assert_ge", () => {
  assert.assert_ge(1, 1);
  assert.assert_ge(2, 1);
  unittest.expect_error(() => { assert.assert_ge(1, 2); });
});

unittest.register("assert_test.test_assert_array_eq", () => {
  assert.assert_array_eq([], []);
  assert.assert_array_eq([1], [1]);
  assert.assert_array_eq([1, 2], [1, 2]);
  assert.assert_array_eq([1, 2, 3], [1, 2, 3]);
  unittest.expect_error(() => { assert.assert_array_eq([], [1]); });
  unittest.expect_error(() => { assert.assert_array_eq([1], []); });
  unittest.expect_error(() => { assert.assert_array_eq([1], [1, 2]); });
  unittest.expect_error(() => { assert.assert_array_eq([1, 2], [1]); });
  unittest.expect_error(() => { assert.assert_array_eq([1], [1, 2]); });
  unittest.expect_error(() => { assert.assert_array_eq([1, 2], [2, 1]); });
});
