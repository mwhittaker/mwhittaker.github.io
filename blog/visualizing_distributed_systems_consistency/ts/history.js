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
//   range: Range,
//   call: Call,
// }
history.Event = function Event(range_, call) {
  common.instance_of(range_, range.Range);
  common.instance_of(call, history.Call);

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
}

// type History = {
//   local_histories: [LocalHistory]
//   local_histories_by_name: string -> LocalHistory
//   conflicts: Event -> Event -> bool???
//
//   serial_events: unit -> bool
//   serial_processes: unit -> bool
// }
