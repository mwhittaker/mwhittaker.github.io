// import common.js
// import range.js

range_test = {}

//         0  1  2  3  4  5  6  7  8  9
// [3, 6]           ----------
// [2, 4]        -------
// [5, 7]                 -------
// [4, 5]              ----
// [0, 2]  ------
// [7, 9]                       ------
// [2, 7]        ---------------
//         0  1  2  3  4  5  6  7  8  9
range_test.r3_6 = new range.Range(3, 6);
range_test.r2_4 = new range.Range(2, 4);
range_test.r5_7 = new range.Range(5, 7);
range_test.r4_5 = new range.Range(4, 5);
range_test.r0_2 = new range.Range(0, 2);
range_test.r7_9 = new range.Range(7, 9);
range_test.r2_7 = new range.Range(2, 7);

range_test.test_range = function() {
  new range.Range(0, 0);
  new range.Range(0, 1);
  new range.Range(10, 20);
  common.expect_error(function () {new range.Range(1, 0)});
  common.expect_error(function () {new range.Range(2, 0)});
}

range_test.test_comes_before = function() {
  common.assert(!range_test.r2_4.comes_before(range_test.r3_6));
  common.assert(!range_test.r5_7.comes_before(range_test.r3_6));
  common.assert(!range_test.r4_5.comes_before(range_test.r3_6));
  common.assert( range_test.r0_2.comes_before(range_test.r3_6));
  common.assert(!range_test.r7_9.comes_before(range_test.r3_6));
  common.assert(!range_test.r2_7.comes_before(range_test.r3_6));
}

range_test.test_comes_after = function() {
  common.assert(!range_test.r2_4.comes_after(range_test.r3_6));
  common.assert(!range_test.r5_7.comes_after(range_test.r3_6));
  common.assert(!range_test.r4_5.comes_after(range_test.r3_6));
  common.assert(!range_test.r0_2.comes_after(range_test.r3_6));
  common.assert( range_test.r7_9.comes_after(range_test.r3_6));
  common.assert(!range_test.r2_7.comes_after(range_test.r3_6));
}

range_test.overlaps = function() {
  common.assert( range_test.r2_4.overlaps(range_test.r3_6));
  common.assert( range_test.r5_7.overlaps(range_test.r3_6));
  common.assert( range_test.r4_5.overlaps(range_test.r3_6));
  common.assert(!range_test.r0_2.overlaps(range_test.r3_6));
  common.assert(!range_test.r7_9.overlaps(range_test.r3_6));
  common.assert( range_test.r2_7.overlaps(range_test.r3_6));
}

range_test.main = function() {
  range_test.test_range();
  range_test.test_comes_before();
  range_test.test_comes_after();
  range_test.overlaps();
}

range_test.main()
