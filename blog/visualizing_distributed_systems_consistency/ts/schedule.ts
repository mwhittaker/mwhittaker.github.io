/// <reference path="range.ts" />
/// <reference path="state_machine.ts" />

namespace schedule {

export class Event<SM extends state_machine.StateMachine> {
  readonly f: string;
  readonly args: any[];
  readonly original_response: any;
  readonly original_range: range.Range;

  response: any;
  range: range.Range;

  constructor(f: string, args: any[], response: any, range: range.Range) {
    this.f = f;
    this.args = args;
    this.original_response = response;
    this.original_range = range;

    this.response = response;
    this.range = range;
  }

  call(sm: SM): void {
    this.response = sm.call(this.f)(...this.args);
  }
}

export class LocalSchedule<SM extends state_machine.StateMachine> {
  constructor (readonly process_name: string, readonly events: Event<SM>[]) {
    // Check that events are disjoint and sorted.
    for (let i = 0; i < events.length - 1; ++i) {
      let x = events[i].range;
      let y = events[i + 1].range;
      assert.assert(x.comes_before(y), `${x} doesn't come before ${y}.`);
    }
  }
}

export class Schedule<SM extends state_machine.StateMachine> {
  local_schedules: LocalSchedule<SM>[];
  local_schedules_by_name: {[name: string]: LocalSchedule<SM>;};
  state_machine_constructor: () => SM;

  // TODO(mwhittaker): Implement are_events_serial(): boolean.
  // TODO(mwhittaker): Implement are_processes_serial(): boolean.
  // TODO(mwhittaker): Implement is_strict_serializable(): boolean.
  // TODO(mwhittaker): Implement is_serializable(): boolean.
  // TODO(mwhittaker): Implement is_linearizable(): boolean.
  // TODO(mwhittaker): Implement is_causally_consistent(?): boolean.
  // TODO(mwhittaker): Implement is_pram_consistent(?): boolean.
  // TODO(mwhittaker): Implement is_sequentially_consistent(): boolean.
}

} // namespace schedule
