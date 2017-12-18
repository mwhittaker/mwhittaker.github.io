"use strict";
var assert;
(function (assert_1) {
    // https://stackoverflow.com/a/15313435
    function assert(b, msg) {
        if (msg === void 0) { msg = "Assertion failed."; }
        if (!b) {
            throw new Error(msg);
        }
    }
    assert_1.assert = assert;
    function _assert_comparison(lhs, rhs, cmp, cmp_str, msg) {
        if (!msg) {
            msg = lhs + " " + cmp_str + " " + rhs + ".";
        }
        assert(cmp(lhs, rhs), msg);
    }
    function assert_eq(lhs, rhs, msg) {
        var cmp = function (l, r) { return l === r; };
        _assert_comparison(lhs, rhs, cmp, "===", msg);
    }
    assert_1.assert_eq = assert_eq;
    function assert_ne(lhs, rhs, msg) {
        var cmp = function (l, r) { return l !== r; };
        _assert_comparison(lhs, rhs, cmp, "!==", msg);
    }
    assert_1.assert_ne = assert_ne;
    function assert_lt(lhs, rhs, msg) {
        var cmp = function (l, r) { return l < r; };
        _assert_comparison(lhs, rhs, cmp, "<", msg);
    }
    assert_1.assert_lt = assert_lt;
    function assert_le(lhs, rhs, msg) {
        var cmp = function (l, r) { return l <= r; };
        _assert_comparison(lhs, rhs, cmp, "<=", msg);
    }
    assert_1.assert_le = assert_le;
    function assert_gt(lhs, rhs, msg) {
        var cmp = function (l, r) { return l > r; };
        _assert_comparison(lhs, rhs, cmp, ">", msg);
    }
    assert_1.assert_gt = assert_gt;
    function assert_ge(lhs, rhs, msg) {
        var cmp = function (l, r) { return l >= r; };
        _assert_comparison(lhs, rhs, cmp, ">=", msg);
    }
    assert_1.assert_ge = assert_ge;
})(assert || (assert = {})); // namespace assert
/// <reference path="assert.ts" />
var unittest;
(function (unittest) {
    var _unittests = [];
    function register(name, test) {
        _unittests.push([name, test]);
    }
    unittest.register = register;
    function run_all() {
        for (var _i = 0, _unittests_1 = _unittests; _i < _unittests_1.length; _i++) {
            var _a = _unittests_1[_i], name_1 = _a[0], test = _a[1];
            console.log(name_1);
            test();
        }
    }
    unittest.run_all = run_all;
    function expect_error(f) {
        try {
            f();
            var error_thrown = false;
        }
        catch (e) {
            var error_thrown = true;
        }
        assert.assert(error_thrown, "Expected an Error.");
    }
    unittest.expect_error = expect_error;
})(unittest || (unittest = {})); // namespace unittest
/// <reference path="assert.ts" />
/// <reference path="unittest.ts" />
var assert_test;
(function (assert_test) {
    unittest.register("assert_test.test_assert", function () {
        assert.assert(true);
        assert.assert(true, "msg");
        unittest.expect_error(function () { assert.assert(false); });
        unittest.expect_error(function () { assert.assert(false, "msg"); });
    });
    unittest.register("assert_test.test_assert_eq", function () {
        assert.assert_eq(1, 1);
        unittest.expect_error(function () { assert.assert_eq(1, 2); });
    });
    unittest.register("assert_test.test_assert_ne", function () {
        assert.assert_ne(1, 2);
        unittest.expect_error(function () { assert.assert_ne(1, 1); });
    });
    unittest.register("assert_test.test_assert_lt", function () {
        assert.assert_lt(1, 2);
        unittest.expect_error(function () { assert.assert_lt(1, 1); });
        unittest.expect_error(function () { assert.assert_lt(2, 1); });
    });
    unittest.register("assert_test.test_assert_le", function () {
        assert.assert_le(1, 1);
        assert.assert_le(1, 2);
        unittest.expect_error(function () { assert.assert_le(2, 1); });
    });
    unittest.register("assert_test.test_assert_gt", function () {
        assert.assert_gt(2, 1);
        unittest.expect_error(function () { assert.assert_gt(1, 1); });
        unittest.expect_error(function () { assert.assert_gt(1, 2); });
    });
    unittest.register("assert_test.test_assert_ge", function () {
        assert.assert_ge(1, 1);
        assert.assert_ge(2, 1);
        unittest.expect_error(function () { assert.assert_ge(1, 2); });
    });
})(assert_test || (assert_test = {})); // assert_test
/// <reference path="unittest.ts" />
function main() {
    unittest.run_all();
}
window.onload = main;
/// <reference path="assert.ts" />
var range;
(function (range) {
    // Range(start, stop) represents the range [start, stop] that is inclusive on
    // both ends.
    var Range = /** @class */ (function () {
        function Range(start, stop) {
            this.start = start;
            this.stop = stop;
            assert.assert_le(start, stop);
        }
        Range.prototype.comes_before = function (that) {
            return this.stop < that.start;
        };
        Range.prototype.comes_after = function (that) {
            return this.start > that.stop;
        };
        Range.prototype.overlaps = function (that) {
            return !(this.comes_before(that) || this.comes_after(that));
        };
        return Range;
    }());
    range.Range = Range;
})(range || (range = {})); // namespace range
/// <reference path="assert.ts" />
/// <reference path="range.ts" />
/// <reference path="unittest.ts" />
var range_test;
(function (range_test) {
    //         0  1  2  3  4  5  6  7  8  9
    // [3, 6]           ----------
    // [2, 4]        -------
    // [5, 7]                 -------
    // [4, 5]              ----
    // [0, 2]  ------
    // [7, 9]                       ------
    // [2, 7]        ---------------
    //         0  1  2  3  4  5  6  7  8  9
    var _r3_6 = new range.Range(3, 6);
    var _r2_4 = new range.Range(2, 4);
    var _r5_7 = new range.Range(5, 7);
    var _r4_5 = new range.Range(4, 5);
    var _r0_2 = new range.Range(0, 2);
    var _r7_9 = new range.Range(7, 9);
    var _r2_7 = new range.Range(2, 7);
    unittest.register("test_range.test_range", function () {
        new range.Range(0, 0);
        new range.Range(0, 1);
        new range.Range(10, 20);
        unittest.expect_error(function () { new range.Range(1, 0); });
        unittest.expect_error(function () { new range.Range(2, 0); });
    });
    unittest.register("test_range.test_comes_before", function () {
        assert.assert(!_r2_4.comes_before(_r3_6));
        assert.assert(!_r5_7.comes_before(_r3_6));
        assert.assert(!_r4_5.comes_before(_r3_6));
        assert.assert(_r0_2.comes_before(_r3_6));
        assert.assert(!_r7_9.comes_before(_r3_6));
        assert.assert(!_r2_7.comes_before(_r3_6));
    });
    unittest.register("test_range.test_comes_after", function () {
        assert.assert(!_r2_4.comes_after(_r3_6));
        assert.assert(!_r5_7.comes_after(_r3_6));
        assert.assert(!_r4_5.comes_after(_r3_6));
        assert.assert(!_r0_2.comes_after(_r3_6));
        assert.assert(_r7_9.comes_after(_r3_6));
        assert.assert(!_r2_7.comes_after(_r3_6));
    });
    unittest.register("test_range.test_overlaps", function () {
        assert.assert(_r2_4.overlaps(_r3_6));
        assert.assert(_r5_7.overlaps(_r3_6));
        assert.assert(_r4_5.overlaps(_r3_6));
        assert.assert(!_r0_2.overlaps(_r3_6));
        assert.assert(!_r7_9.overlaps(_r3_6));
        assert.assert(_r2_7.overlaps(_r3_6));
    });
})(range_test || (range_test = {})); // namespace range_test
