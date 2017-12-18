// import common.js
// import history.js
// import range.js

history_test = {}

history_test.test_local_history = function() {
  var request = new history.Request("f", []);
  var call = new history.Call(request, undefined);
  var e0_2 = new history.Event(new range.Range(0, 2), call);
  var e3_5 = new history.Event(new range.Range(3, 5), call);
  var e6_8 = new history.Event(new range.Range(6, 8), call);
  var e1_7 = new history.Event(new range.Range(1, 7), call);

  // No events.
  var events = [];
  var local_history = new history.LocalHistory("none", events);

  // Disjoint sorted events.
  var events = [e0_2, e3_5, e6_8];
  var local_history = new history.LocalHistory("disjoint_sorted", events);

  // Overlapping events.
  common.expect_error(function() {
    var events = [e0_2, e3_5, e6_8, e1_7];
    var local_history = new history.LocalHistory("overlapping", events);
  });

  // Disjoing out-of-order events.
  common.expect_error(function() {
    var events = [e0_2, e6_8, e3_5];
    var local_history = new history.LocalHistory("out-of-order", events);
  });
}

history_test.main = function() {
  history_test.test_local_history();
}

history_test.main();
