/// <reference path="state_machine.ts" />

namespace queue {

export class Queue {
  private xs: any[] = [];

  public push(x: any): void {
    this.xs.push(x);
  }

  public pop(): any {
    return this.xs.shift();
  }

  public call(function_name: string): (...args: any[]) => any {
    switch (function_name) {
      case "push": return (x: any) => this.push(x);
      case "pop": return () => this.pop();
      default: throw new Error(`Unknown function ${function_name}.`);
    }
  }
}

} // namespace queue
