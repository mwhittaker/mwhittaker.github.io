/// <reference path="state_machine.ts" />

namespace register {

export class Register implements state_machine.StateMachine {
  private x: any;

  constructor(x: any) {
    this.x = x;
  }

  public read(): any {
    return this.x;
  }

  public write(x: any): void {
    this.x = x;
  }

  public call(function_name: string): (...args: any[]) => any {
    switch (function_name) {
      case "read": return () => this.read();
      case "write": return (x: any) => this.write(x);
      default: throw new Error(`Unknown function ${function_name}.`);
    }
  }
}

} // namespace register