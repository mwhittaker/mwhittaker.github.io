import * as assert from "./assert";
import * as priority_queue from "./priority_queue";
import * as unittest from "./unittest";

unittest.register("priority_queue_test.test_pop_empty", () => {
  const q = new priority_queue.PriorityQueue((x: number) => x);
  unittest.expect_error(() => { q.pop_min(); });
});

unittest.register("priority_queue_test.test_push_and_pop_int", () => {
  const q = new priority_queue.PriorityQueue((x: number) => x);
  q.push(1);
  q.push(3);
  q.push(4);
  q.push(2);
  assert.assert_eq(1, q.pop_min());
  assert.assert_eq(2, q.pop_min());
  assert.assert_eq(3, q.pop_min());
  assert.assert_eq(4, q.pop_min());
});

interface Triple {
  x: string;
  y: number;
  z: string;
}

unittest.register("priority_queue_test.test_push_and_pop_object", () => {
  const q = new priority_queue.PriorityQueue((t: Triple) => t.y);

  const t1 = { x: "a", y: 1, z: "aa" };
  const t4 = { x: "d", y: 4, z: "dd" };
  const t2 = { x: "b", y: 2, z: "bb" };
  const t3 = { x: "c", y: 3, z: "cc" };
  q.push(t1);
  q.push(t4);
  q.push(t2);
  q.push(t3);

  assert.assert_eq(t1, q.pop_min());
  assert.assert_eq(t2, q.pop_min());
  assert.assert_eq(t3, q.pop_min());
  assert.assert_eq(t4, q.pop_min());
});
