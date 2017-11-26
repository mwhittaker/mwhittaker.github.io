// import common.js
// import range.js

history = {}

// type Request = {
//   fun: string,
//   args: [any],
//   call: state_machine -> any,
// }
history.Request = function(fun, args) {
  common.typecheck(fun, "string");
  common.typecheck(args, "object");

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
history.Call = function(request, expected_response) {
  common.typecheck(start, "object");
  common.assert_ne(typeof expected_response, "undefined");

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
history.Event = function(range, call) {
  common.typecheck(range, "object");
  common.typecheck(call, "object");

  this.range = range;
  this.call = call;
}

// type LocalHistory = {
//   process_name: string,
//   events: [Event],
// }

// type History = {
//   local_histories: [LocalHistory]
//   local_histories_by_name: string -> LocalHistory
//   conflicts: Event -> Event -> bool???
// }
