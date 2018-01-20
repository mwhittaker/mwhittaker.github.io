// import common.js
// import history.js
// import range.js
// import ordering.js
// import register.js

history_test = {}

// Local History Tests /////////////////////////////////////////////////////////
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

history_test.test_local_history_move = function() {
}

// Example Histories ///////////////////////////////////////////////////////////
//    0  1  2  3  4  5  6  7  8  9
//    w(1)     w(2)     r()   2
// A  -------  -------  -------
//      r()       2  w(1)
// B     ----------  -------------
history_test.simple_concurrent_history = function() {
  var reg = new register.Register(0);
  var req = new register.RequestBuilder();
  var history_a = new history.LocalHistory("A", [
      new history.Event(
        new range.Range(0, 2),
        new history.Call(req.write(1), undefined)
      ),
      new history.Event(
        new range.Range(3, 5),
        new history.Call(req.write(2), undefined)
      ),
      new history.Event(
        new range.Range(6, 8),
        new history.Call(req.read(), 2)
      ),
  ]);
  var history_b = new history.LocalHistory("B", [
      new history.Event(
        new range.Range(1, 4),
        new history.Call(req.read(), 2)
      ),
      new history.Event(
        new range.Range(5, 9),
        new history.Call(req.write(1), undefined)
      ),
  ]);
  var ordering = function(_, _) {
    return ordering.PartiallyOrdered.UN;
  };
  return new history.History(reg, [history_a, history_b], ordering);
}

//    0  1  2  3  4  5  6  7  8  9
//    w(1)        w(2)        r()2
// A  ----        ----        ----
//          r()2        w(1)
// B        ----        ----
history_test.simple_serial_event_history = function() {
  var h = history_test.simple_concurrent_history();

}


history_test.test_history_serial_events = function() {
}

history_test.main = function() {
  history_test.test_local_history();
  history_test.test_local_history_move();
  history_test.test_history_serial_events();
}

history_test.main();
