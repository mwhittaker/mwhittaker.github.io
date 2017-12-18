/// <reference path="assert.ts" />
/// <reference path="range.ts" />
/// <reference path="unittest.ts" />

namespace range_test {

//         0  1  2  3  4  5  6  7  8  9
// [3, 6]           ----------
// [2, 4]        -------
// [5, 7]                 -------
// [4, 5]              ----
// [0, 2]  ------
// [7, 9]                       ------
// [2, 7]        ---------------
//         0  1  2  3  4  5  6  7  8  9
let _r3_6 = new range.Range(3, 6);
let _r2_4 = new range.Range(2, 4);
let _r5_7 = new range.Range(5, 7);
let _r4_5 = new range.Range(4, 5);
let _r0_2 = new range.Range(0, 2);
let _r7_9 = new range.Range(7, 9);
let _r2_7 = new range.Range(2, 7);

unittest.register("test_range.test_range", function() {
  new range.Range(0, 0);
  new range.Range(0, 1);
  new range.Range(10, 20);
  unittest.expect_error(function () {new range.Range(1, 0)});
  unittest.expect_error(function () {new range.Range(2, 0)});
});

unittest.register("test_range.test_comes_before", function() {
  assert.assert(!_r2_4.comes_before(_r3_6));
  assert.assert(!_r5_7.comes_before(_r3_6));
  assert.assert(!_r4_5.comes_before(_r3_6));
  assert.assert( _r0_2.comes_before(_r3_6));
  assert.assert(!_r7_9.comes_before(_r3_6));
  assert.assert(!_r2_7.comes_before(_r3_6));
});

unittest.register("test_range.test_comes_after", function() {
  assert.assert(!_r2_4.comes_after(_r3_6));
  assert.assert(!_r5_7.comes_after(_r3_6));
  assert.assert(!_r4_5.comes_after(_r3_6));
  assert.assert(!_r0_2.comes_after(_r3_6));
  assert.assert( _r7_9.comes_after(_r3_6));
  assert.assert(!_r2_7.comes_after(_r3_6));
});

unittest.register("test_range.test_overlaps", function() {
  assert.assert( _r2_4.overlaps(_r3_6));
  assert.assert( _r5_7.overlaps(_r3_6));
  assert.assert( _r4_5.overlaps(_r3_6));
  assert.assert(!_r0_2.overlaps(_r3_6));
  assert.assert(!_r7_9.overlaps(_r3_6));
  assert.assert( _r2_7.overlaps(_r3_6));
});

} // namespace range_test
