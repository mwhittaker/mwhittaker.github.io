"use strict";
var assert;
(function (assert_1) {
    // tslint:disable:no-shadowed-variable
    function assert(b, msg) {
        if (msg === void 0) { msg = "Assertion failed."; }
        if (!b) {
            throw new Error(msg);
        }
    }
    assert_1.assert = assert;
    function _assert_comparison(lhs, rhs, cmp, cmp_str, msg) {
        var prefix = lhs + " " + cmp_str + " " + rhs;
        msg = msg ? prefix + ": " + msg : prefix + ".";
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
    function assert_array_eq(lhs, rhs, msg) {
        assert_eq(lhs.length, rhs.length, msg);
        for (var i = 0; i < lhs.length; ++i) {
            assert_eq(lhs[i], rhs[i], msg ? "index " + i + ": " + msg : "index " + i + ".");
        }
    }
    assert_1.assert_array_eq = assert_array_eq;
})(assert || (assert = {})); // namespace assert
/// <reference path="assert.ts" />
var unittest;
(function (unittest) {
    var unittests = [];
    function register(name, test) {
        unittests.push([name, test]);
    }
    unittest.register = register;
    function run_all() {
        for (var _i = 0, unittests_1 = unittests; _i < unittests_1.length; _i++) {
            var _a = unittests_1[_i], name_1 = _a[0], test = _a[1];
            console.log(name_1);
            test();
        }
    }
    unittest.run_all = run_all;
    function expect_error(f) {
        try {
            f();
            assert.assert(false, "Expected an Error.");
        }
        catch (e) {
            // Do nothing. An error is expected.
        }
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
    unittest.register("assert_test.test_assert_array_eq", function () {
        assert.assert_array_eq([], []);
        assert.assert_array_eq([1], [1]);
        assert.assert_array_eq([1, 2], [1, 2]);
        assert.assert_array_eq([1, 2, 3], [1, 2, 3]);
        unittest.expect_error(function () { assert.assert_array_eq([], [1]); });
        unittest.expect_error(function () { assert.assert_array_eq([1], []); });
        unittest.expect_error(function () { assert.assert_array_eq([1], [1, 2]); });
        unittest.expect_error(function () { assert.assert_array_eq([1, 2], [1]); });
        unittest.expect_error(function () { assert.assert_array_eq([1], [1, 2]); });
        unittest.expect_error(function () { assert.assert_array_eq([1, 2], [2, 1]); });
    });
})(assert_test || (assert_test = {})); // assert_test
/// <reference path="unittest.ts" />
function main() {
    unittest.run_all();
}
window.onload = main;
// <reference path="assert.ts" />
// <reference path="pervasives.ts" />
// <reference path="unittest.ts" />
var pervasives_test;
(function (pervasives_test) {
    unittest.register("pervasives_test.test_min_and_argmin", function () {
        var unittests = [
            [[], null, null],
            [["a"], 0, "a"],
            [["a", "b"], 0, "a"],
            [["b", "a"], 1, "a"],
            [["a", "b", "c"], 0, "a"],
            [["b", "a", "c"], 1, "a"],
            [["b", "c", "a"], 2, "a"],
        ];
        var cmp = function (x, y) { return x.localeCompare(y); };
        for (var _i = 0, unittests_2 = unittests; _i < unittests_2.length; _i++) {
            var _a = unittests_2[_i], xs = _a[0], i = _a[1], s = _a[2];
            assert.assert_eq(pervasives.argmin(xs, cmp), i);
            assert.assert_eq(pervasives.min(xs, cmp), s);
        }
    });
    unittest.register("pervasives_test.test_filter_map", function () {
        var f = function (x) {
            if (x % 2 === 0) {
                return x * x;
            }
            else {
                return null;
            }
        };
        var unittests = [
            [[], []],
            [[0], [0]],
            [[0, 1], [0]],
            [[0, 1, 2], [0, 4]],
            [[0, 1, 1, 2, 2, 2], [0, 4, 4, 4]],
        ];
        for (var _i = 0, unittests_3 = unittests; _i < unittests_3.length; _i++) {
            var _a = unittests_3[_i], xs = _a[0], expected = _a[1];
            assert.assert_array_eq(pervasives.filter_map(xs, f), expected);
        }
    });
})(pervasives_test || (pervasives_test = {})); // namespace pervasives_test
// <reference path="assert.ts" />
var pervasives;
(function (pervasives) {
    function argmin(xs, cmp) {
        if (xs.length === 0) {
            return null;
        }
        var min_x = xs[0];
        var min_index = 0;
        for (var i = 1; i < xs.length; ++i) {
            var x = xs[i];
            if (cmp(x, min_x) < 0) {
                min_x = x;
                min_index = i;
            }
        }
        return min_index;
    }
    pervasives.argmin = argmin;
    function min(xs, cmp) {
        var min_index = argmin(xs, cmp);
        if (min_index !== null) {
            return xs[min_index];
        }
        else {
            return null;
        }
    }
    pervasives.min = min;
    function filter_map(xs, f) {
        return xs.map(f).filter(function (x) { return x !== null; }).map(function (x) { return x; });
    }
    pervasives.filter_map = filter_map;
})(pervasives || (pervasives = {})); // namespace pervasives
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
        // Lexicographically compare ranges.
        Range.prototype.compare = function (that) {
            var start_cmp = this.start - that.start;
            var stop_cmp = this.stop - that.stop;
            if (start_cmp < 0) {
                return start_cmp;
            }
            else if (start_cmp === 0) {
                return stop_cmp;
            }
            else {
                assert.assert_gt(start_cmp, 0);
                return start_cmp;
            }
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
        // tslint:disable:no-unused-expression
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
    unittest.register("test_range.test_compare", function () {
        var r01 = new range.Range(0, 1);
        var r02 = new range.Range(0, 2);
        var r12 = new range.Range(1, 2);
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
            var _this = this;
            // let that = this;
            switch (function_name) {
                // case "read": return function() { return that.read(); };
                // case "write": return function(x: any) { return that.write(x); };
                case "read": return function () { return _this.read(); };
                case "write": return function (x) { return _this.write(x); };
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
/// <reference path="pervasives.ts" />
/// <reference path="range.ts" />
/// <reference path="state_machine.ts" />
var schedule;
(function (schedule) {
    var Event = /** @class */ (function () {
        function Event(process_name, index, f, args, response, range) {
            this.process_name = process_name;
            this.index = index;
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
    var LocalSchedule = /** @class */ (function () {
        function LocalSchedule(process_name) {
            this.process_name = process_name;
            this.events = [];
        }
        LocalSchedule.prototype.add = function (f, args, response, range) {
            // Check that all events are serial.
            if (this.events.length > 0) {
                var last_event = this.events[this.events.length - 1];
                assert.assert(last_event.range.comes_before(range));
            }
            var index = this.events.length;
            var e = new Event(this.process_name, index, f, args, response, range);
            this.events.push(e);
        };
        return LocalSchedule;
    }());
    schedule.LocalSchedule = LocalSchedule;
    var Schedule = /** @class */ (function () {
        function Schedule(local_schedules, state_machine_constructor) {
            // TODO(mwhittaker): Check that all names are unique.
            // TODO(mwhittaker): Construct indexes for local_schedule and
            // local_schedule_index.
            this.local_schedules = local_schedules;
            this.state_machine_constructor = state_machine_constructor;
        }
        Schedule.prototype.local_schedule = function (name) {
            name;
            throw new Error("TODO");
        };
        Schedule.prototype.local_schedule_index = function (name) {
            name;
            throw new Error("TODO");
        };
        //private merged_events(): Event<SM>[] {
        //let merged_events: Event<SM>[] = [];
        //let local_events = this.local_schedules.map((s) => s.events.slice());
        //function heads(): Event<SM>[] {
        //const head_or_null = (es: Event<SM>[]) => es.length > 0 ? es[0] : null;
        //return pervasives.filter_map(local_events, head_or_null);
        //}
        //while (heads().length > 0) {
        //}
        //merged_events as any;
        //local_events as any;
        //throw new Error();
        //}
        Schedule.prototype.are_events_serial = function () {
            return true;
        };
        return Schedule;
    }());
    schedule.Schedule = Schedule;
})(schedule || (schedule = {})); // namespace schedule
/// <reference path="assert.ts" />
/// <reference path="range.ts" />
/// <reference path="register.ts" />
/// <reference path="schedule.ts" />
/// <reference path="unittest.ts" />
var schedule_test;
(function (schedule_test) {
    unittest.register("schedule_test.test_event", function () {
        // let read = new schedule.Event<register.Register>(
        //   "read", [], 0, new range.Range(0, 1));
        // let write = new schedule.Event<register.Register>(
        //   "write", [1], undefined, new range.Range(1, 2));
        // let reg = new register.Register(0);
        //
        // assert.assert_eq(read.response, 0);
        // assert.assert_eq(write.response, undefined);
        // write.call(reg);
        // assert.assert_eq(write.response, undefined);
        // read.call(reg);
        // assert.assert_eq(read.response, 1);
    });
})(schedule_test || (schedule_test = {})); // namespace schedule_test
//# sourceMappingURL=distributed_systems_consistency.js.map