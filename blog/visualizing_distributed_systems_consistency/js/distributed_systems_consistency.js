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
            console.log("running unit test '" + name_1 + "'");
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
    // Range(start, stop) represents the range [start, stop).
    var Range = /** @class */ (function () {
        function Range(start, stop) {
            this.start = start;
            this.stop = stop;
            assert.assert_le(start, stop);
        }
        Range.prototype.comes_before = function (that) {
            return this.stop <= that.start;
        };
        Range.prototype.comes_after = function (that) {
            return this.start >= that.stop;
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
    var r3_6 = new range.Range(3, 6);
    var r2_4 = new range.Range(2, 4);
    var r5_7 = new range.Range(5, 7);
    var r4_5 = new range.Range(4, 5);
    var r0_2 = new range.Range(0, 2);
    var r7_9 = new range.Range(7, 9);
    var r2_7 = new range.Range(2, 7);
    unittest.register("test_range.test_range", function () {
        new range.Range(0, 0);
        new range.Range(0, 1);
        new range.Range(10, 20);
        unittest.expect_error(function () { new range.Range(1, 0); });
        unittest.expect_error(function () { new range.Range(2, 0); });
    });
    unittest.register("test_range.test_comes_before", function () {
        assert.assert(!r2_4.comes_before(r3_6));
        assert.assert(!r5_7.comes_before(r3_6));
        assert.assert(!r4_5.comes_before(r3_6));
        assert.assert(r0_2.comes_before(r3_6));
        assert.assert(!r7_9.comes_before(r3_6));
        assert.assert(!r2_7.comes_before(r3_6));
    });
    unittest.register("test_range.test_comes_after", function () {
        assert.assert(!r2_4.comes_after(r3_6));
        assert.assert(!r5_7.comes_after(r3_6));
        assert.assert(!r4_5.comes_after(r3_6));
        assert.assert(!r0_2.comes_after(r3_6));
        assert.assert(r7_9.comes_after(r3_6));
        assert.assert(!r2_7.comes_after(r3_6));
    });
    unittest.register("test_range.test_overlaps", function () {
        assert.assert(r2_4.overlaps(r3_6));
        assert.assert(r5_7.overlaps(r3_6));
        assert.assert(r4_5.overlaps(r3_6));
        assert.assert(!r0_2.overlaps(r3_6));
        assert.assert(!r7_9.overlaps(r3_6));
        assert.assert(r2_7.overlaps(r3_6));
    });
    unittest.register("test_range.test_contiguous_ranges", function () {
        var r01 = new range.Range(0, 1);
        var r12 = new range.Range(1, 2);
        var r23 = new range.Range(2, 3);
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
})(range_test || (range_test = {})); // namespace range_test
/// <reference path="state_machine.ts" />
var register;
(function (register) {
    var Register = /** @class */ (function () {
        function Register(x) {
            this.x = x;
        }
        Register.prototype.read = function () {
            return this.x;
        };
        Register.prototype.write = function (x) {
            this.x = x;
        };
        Register.prototype.call = function (function_name) {
            var that = this;
            switch (function_name) {
                case "read": return function () { return that.read(); };
                case "write": return function (x) { return that.write(x); };
                default: throw new Error("Unknown function " + function_name + ".");
            }
        };
        return Register;
    }());
    register.Register = Register;
})(register || (register = {})); // namespace register
/// <reference path="register.ts" />
/// <reference path="unittest.ts" />
/// <reference path="assert.ts" />
var register_test;
(function (register_test) {
    unittest.register("register_test.test_read_write", function () {
        var reg = new register.Register(0);
        assert.assert_eq(reg.read(), 0);
        for (var i = 1; i < 10; ++i) {
            reg.write(i);
            assert.assert_eq(reg.read(), i);
        }
    });
    unittest.register("register_test.test_call", function () {
        var reg = new register.Register(0);
        assert.assert_eq(reg.call("read")(), 0);
        for (var i = 1; i < 10; ++i) {
            reg.call("write")(i);
            assert.assert_eq(reg.call("read")(), i);
        }
    });
})(register_test || (register_test = {})); // namespace register_test
/// <reference path="range.ts" />
/// <reference path="state_machine.ts" />
var schedule;
(function (schedule) {
    var Event = /** @class */ (function () {
        function Event(f, args, response, range) {
            this.f = f;
            this.args = args;
            this.original_response = response;
            this.original_range = range;
            this.response = response;
            this.range = range;
        }
        Event.prototype.call = function (sm) {
            this.response = sm.call(this.f).apply(void 0, this.args);
        };
        return Event;
    }());
    schedule.Event = Event;
    //export class LocalSchedule<T extends state_machine.StateMachine> {
    //}
})(schedule || (schedule = {})); // namespace schedule
/// <reference path="assert.ts" />
/// <reference path="range.ts" />
/// <reference path="register.ts" />
/// <reference path="schedule.ts" />
/// <reference path="unittest.ts" />
var schedule_test;
(function (schedule_test) {
    unittest.register("schedule_test.test_event", function () {
        var read = new schedule.Event("read", [], 0, new range.Range(0, 1));
        var write = new schedule.Event("write", [1], undefined, new range.Range(1, 2));
        var reg = new register.Register(0);
        assert.assert_eq(read.response, 0);
        assert.assert_eq(write.response, undefined);
        write.call(reg);
        assert.assert_eq(write.response, undefined);
        read.call(reg);
        assert.assert_eq(read.response, 1);
    });
})(schedule_test || (schedule_test = {})); // namespace schedule_test
