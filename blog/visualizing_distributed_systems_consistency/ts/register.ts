/// <reference path="state_machine.ts" />

namespace register {

export class Register implements state_machine.StateMachine {
  private x: any;

  constructor(x: any) {
    this.x = x;
  }

  read(): any {
    return this.x;
  }

  write(x: any): void {
    this.x = x;
  }

  call(function_name: string): (...args: any[]) => any {
    let that = this;
    switch (function_name) {
      case "read": return function() { return that.read(); };
      case "write": return function(x: any) { return that.write(x); };
      default: throw new Error(`Unknown function ${function_name}.`);
    }
  }
}

} // namespace register
