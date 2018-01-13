import * as assert from "./assert";
import * as range from "./range";
import * as state_machine from "./state_machine";

// tslint:disable:max-classes-per-file

export class Event<SM extends state_machine.StateMachine> {
  public readonly process_name: string;
  public readonly index: number;
  public readonly f: string;
  public readonly args: any[];
  public readonly original_response: any;
  public readonly original_range: range.Range;
  public response: any;
  public range: range.Range;

  constructor(process_name: string, index: number, f: string, args: any[], response: any, range_: range.Range) {
    this.process_name = process_name;
    this.index = index;
    this.f = f;
    this.args = args;
    this.original_response = response;
    this.original_range = range_;
    this.response = response;
    this.range = range_;
  }

  public call(state_machine_: SM): void {
    this.response = state_machine_.call(this.f)(...this.args);
  }
}

export class LocalSchedule<SM extends state_machine.StateMachine> {
  public readonly process_name: string;
  public readonly events: Event<SM>[];

  constructor(process_name: string) {
    this.process_name = process_name;
    this.events = [];
  }

  public add(f: string, args: any[], response: any, range_: range.Range) {
    // Check that all events are serial.
    if (this.events.length > 0) {
      const last_event = this.events[this.events.length - 1];
      assert.assert(last_event.range.comes_before(range_));
    }

    const index = this.events.length;
    const e = new Event(this.process_name, index, f, args, response, range_);
    this.events.push(e);
  }
}

export class Schedule<SM extends state_machine.StateMachine> {
  public readonly local_schedules: LocalSchedule<SM>[];
  public readonly state_machine_constructor: () => SM;

  constructor(local_schedules: LocalSchedule<SM>[],
              state_machine_constructor: () => SM) {
    // TODO(mwhittaker): Check that all names are unique.
    // TODO(mwhittaker): Construct indexes for local_schedule and
    // local_schedule_index.

    this.local_schedules = local_schedules;
    this.state_machine_constructor = state_machine_constructor;
  }

  // public local_schedule(name: string): LocalSchedule<SM>[] {
  //   throw new Error("TODO");
  // }
  //
  // public local_schedule_index(name: string): number {
  //   throw new Error("TODO");
  // }

  // private merged_events(): Event<SM>[] {
  //   let merged_events: Event<SM>[] = [];
  //   let local_events = this.local_schedules.map((s) => s.events.slice());
  //   function heads(): Event<SM>[] {
  //     const head_or_null = (es: Event<SM>[]) => es.length > 0 ? es[0] : null;
  //     return pervasives.filter_map(local_events, head_or_null);
  //   }
  //
  //   while (heads().length > 0) {
  //
  //   }
  //
  //   merged_events as any;
  //   local_events as any;
  //   throw new Error();
  // }

  public are_events_serial(): boolean {
    return true;
  }

  // TODO(mwhittaker): Implement are_processes_serial(): boolean.
  // TODO(mwhittaker): Implement is_strict_serializable(): boolean.
  // TODO(mwhittaker): Implement is_serializable(): boolean.
  // TODO(mwhittaker): Implement is_linearizable(): boolean.
  // TODO(mwhittaker): Implement is_causally_consistent(?): boolean.
  // TODO(mwhittaker): Implement is_pram_consistent(?): boolean.
  // TODO(mwhittaker): Implement is_sequentially_consistent(): boolean.
}
