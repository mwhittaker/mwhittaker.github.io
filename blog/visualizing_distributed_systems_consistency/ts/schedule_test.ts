/// <reference path="assert.ts" />
/// <reference path="range.ts" />
/// <reference path="register.ts" />
/// <reference path="schedule.ts" />
/// <reference path="unittest.ts" />

namespace schedule_test {

unittest.register("schedule_test.test_event", () => {
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

} // namespace schedule_test
