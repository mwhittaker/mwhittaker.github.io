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
const r3_6 = new range.Range(3, 6);
const r2_4 = new range.Range(2, 4);
const r5_7 = new range.Range(5, 7);
const r4_5 = new range.Range(4, 5);
const r0_2 = new range.Range(0, 2);
const r7_9 = new range.Range(7, 9);
const r2_7 = new range.Range(2, 7);

unittest.register("test_range.test_range", () => {
  // tslint:disable:no-unused-expression
  new range.Range(0, 0);
  new range.Range(0, 1);
  new range.Range(10, 20);

  unittest.expect_error(() => { new range.Range(1, 0); });
  unittest.expect_error(() => { new range.Range(2, 0); });
});

unittest.register("test_range.test_comes_before", () => {
  assert.assert(!r2_4.comes_before(r3_6));
  assert.assert(!r5_7.comes_before(r3_6));
  assert.assert(!r4_5.comes_before(r3_6));
  assert.assert( r0_2.comes_before(r3_6));
  assert.assert(!r7_9.comes_before(r3_6));
  assert.assert(!r2_7.comes_before(r3_6));
});

unittest.register("test_range.test_comes_after", () => {
  assert.assert(!r2_4.comes_after(r3_6));
  assert.assert(!r5_7.comes_after(r3_6));
  assert.assert(!r4_5.comes_after(r3_6));
  assert.assert(!r0_2.comes_after(r3_6));
  assert.assert( r7_9.comes_after(r3_6));
  assert.assert(!r2_7.comes_after(r3_6));
});

unittest.register("test_range.test_overlaps", () => {
  assert.assert( r2_4.overlaps(r3_6));
  assert.assert( r5_7.overlaps(r3_6));
  assert.assert( r4_5.overlaps(r3_6));
  assert.assert(!r0_2.overlaps(r3_6));
  assert.assert(!r7_9.overlaps(r3_6));
  assert.assert( r2_7.overlaps(r3_6));
});

unittest.register("test_range.test_compare", () => {
  const r01 = new range.Range(0, 1);
  const r02 = new range.Range(0, 2);
  const r12 = new range.Range(1, 2);

  assert.assert_eq(r01.compare(r01), 0);
  assert.assert_lt(r01.compare(r02), 0);
  assert.assert_lt(r01.compare(r12), 0);
  assert.assert_gt(r02.compare(r01), 0);
  assert.assert_eq(r02.compare(r02), 0);
  assert.assert_lt(r02.compare(r12), 0);
  assert.assert_gt(r12.compare(r01), 0);
  assert.assert_gt(r12.compare(r02), 0);
  assert.assert_eq(r12.compare(r12), 0);
});

unittest.register("test_range.test_contiguous_ranges", () => {
  const r01 = new range.Range(0, 1);
  const r12 = new range.Range(1, 2);
  const r23 = new range.Range(2, 3);

  assert.assert(r01.comes_before(r12));
  assert.assert(r12.comes_before(r23));
  assert.assert(!r01.comes_after(r12));
  assert.assert(!r12.comes_after(r23));

  assert.assert(r23.comes_after(r12));
  assert.assert(r12.comes_after(r01));
  assert.assert(!r23.comes_before(r12));
  assert.assert(!r12.comes_before(r01));

  assert.assert(r01.overlaps(r01));
  assert.assert(r12.overlaps(r12));
  assert.assert(r23.overlaps(r23));
  assert.assert(!r01.overlaps(r12));
  assert.assert(!r12.overlaps(r23));
});

} // namespace range_test
