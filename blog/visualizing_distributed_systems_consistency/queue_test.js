// import common.js
// import queue.js

queue_test = {};

queue_test.main = function() {
  var q = new queue.Queue();
  q.push(1);
  q.push(2);
  q.push(3);
  common.assert_eq(q.pop(), 1);
  common.assert_eq(q.pop(), 2);
  common.assert_eq(q.pop(), 3);
  q.push(1);
  common.assert_eq(q.pop(), 1);
  q.push(2);
  common.assert_eq(q.pop(), 2);
  q.push(3);
  common.assert_eq(q.pop(), 3);
}

queue_test.main();
