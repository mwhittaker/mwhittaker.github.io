/// <reference path="assert.ts" />
/// <reference path="queue.ts" />
/// <reference path="unittest.ts" />

namespace queue_test {

unittest.register("queue_test.test_push_pop", () => {
  const q = new queue.Queue();

  assert.assert_eq(q.pop(), undefined);
  for (let i = 0; i < 10; ++i) {
    q.push(i);
  }
  for (let i = 0; i < 10; ++i) {
    assert.assert_eq(q.pop(), i);
  }

  q.push(1);
  q.push(2);
  assert.assert_eq(q.pop(), 1);
  q.push(3);
  assert.assert_eq(q.pop(), 2);
  assert.assert_eq(q.pop(), 3);
});

unittest.register("queue_test.test_call", () => {
  const q = new queue.Queue();

  assert.assert_eq(q.call("pop")(), undefined);
  for (let i = 0; i < 10; ++i) {
    q.call("push")(i);
  }
  for (let i = 0; i < 10; ++i) {
    assert.assert_eq(q.call("pop")(), i);
  }

  q.call("push")(1);
  q.call("push")(2);
  assert.assert_eq(q.call("pop")(), 1);
  q.call("push")(3);
  assert.assert_eq(q.call("pop")(), 2);
  assert.assert_eq(q.call("pop")(), 3);
});

} // namespace queue_test
