// import common.js
// import range.js

history = {}

// type Request = {
//   fun: string,
//   args: [any],
//   call: state_machine -> any,
// }
history.Request = function Request(fun, args) {
  common.typecheck(fun, "string");
  common.instance_of(args, Array);

  this.fun = fun;
  this.args = args;

  this.call = function(state_machine) {
    var f = state_machine[this.fun];
    return f.apply(state_machine, this.args);
  }
}

// type Call = {
//   request: Reqest,
//   response: any,
//   expected_response: any,
//
//   call: state_machine -> undefined,
// }
history.Call = function Call(request, expected_response) {
  common.instance_of(request, history.Request);

  this.request = request;
  this.response = null;
  this.expected_response = expected_response;

  this.call = function(state_machine) {
    this.response = this.request.call(state_machine);
  }
}

// type Event = {
//   original_range: Range,
//   range: Range,
//   call: Call,
// }
history.Event = function Event(range_, call) {
  common.instance_of(range_, range.Range);
  common.instance_of(call, history.Call);

  this.original_range = new range.Range(range_.start, range_.stop);
  this.range = range_;
  this.call = call;
}

// type LocalHistory = {
//   process_name: string,
//   events: [Event],
// }
history.LocalHistory = function(process_name, events) {
  common.typecheck(process_name, "string");
  common.instance_of(events, Array);

  // Check that events are disjoint and sorted.
  for (var i = 0; i < events.length - 1; ++i) {
    var x_range = events[i].range;
    var y_range = events[i + 1].range;
    common.assert(x_range.comes_before(y_range));
  }

  this.process_name = process_name;
  this.events = events;

  this.event = function(index) {
    common.typecheck(index, "number");
    common.assert_ge(index, 0);
    common.assert_lt(index, this.events.length);

    return this.events[i];
  }

  this.move = function(index, start, stop) {
    common.typecheck(index, "number");
    common.typecheck(start, "number");
    common.typecheck(stop, "number");

    // Check that the new start is after the previous event's stop.
    if (index !== 0) {
      var before = this.event(index - 1);
      common.assert_lt(before.range.stop, start);
    }

    if (index !== this.events.length - 1) {
      var after = this.event(index + 1);
      common.assert_lt(stop, before.range.start);
    }

    var e = this.event(index);
    e.range = new range.Range(start, stop);
  }
}

// type IndexedEvent = {
//   local_history: LocalHistory,
//   index: int,
// }
history.IndexedEvent = function(local_history, index) {
  common.instance_of(local_history, history.LocalHistory);
  common.typecheck(index, "number");

  this.local_history = local_history;
  this.index = index;
}

// type History = {
//   state_machine: StateMachine
//   local_histories: [LocalHistory]
//   order: IndexedEvent -> IndexedEvent -> ordering.PartiallyOrdered
//
//   serial_events: unit -> bool
//   serial_processes: unit -> bool
// }
history.History = function(state_machine, local_histories, order) {
  // TODO(mwhittaker): Figure out the right type for order.
  common.instance_of(local_histories, Array);
  common.assert_gt(local_histories.length, 0);
  common.typecheck(order, "function");

  this.state_machine = state_machine;
  this.local_histories = local_histories;
  this.order = order;

  this.local_histories_by_name = {};
  for (var i = 0; i < this.local_histories.length; ++i) {
    var h = local_histories[i];
    local_histories_by_name[h.process_name] = h;
  }

  this.local_history = function(process_name) {
    common.typecheck(process_name, string);
    return this.local_histories_by_name[process_name];
  }

  this.serial_events = function() {
    var events = [];
    for (var i = 0; i < this.local_histories.length; ++i) {
      events = events.concat(local_histories[i].events);
    }

    // Naively check every single pair of events.
    for (var i = 0; i < events.length; ++i) {
      for (var j = i + 1; i < events.length; ++j) {
        if (events[i].range.overlaps(events[j].range)) {
          return false;
        }
      }
    }

    return true;
  }

  // strict_serializable() {}
  // serializable() {}
  // linearizable() {}
  // sequentially_consistent() {}
  // causally_consistent() {}
  // pram_consistent() {}
}

// serializable
//   - function(_, _) { return false; }
//   - serial_processes
// strict serializable:
//   - function(_, _) { hard code return some thing should be before another; }
//   - serial_processes
// linearizable:
//   - function(_, _) { check to see if original is before, after, or overlapping }
//   - serial_events
// sequential: none
//   - function(_, _) { return false; }
// causal(i):
//   - serial_events
//   - function(_, _) { hard coded based on causal ordering }
// pram(i):
//   - serial_events
//   - function() { return false;}
