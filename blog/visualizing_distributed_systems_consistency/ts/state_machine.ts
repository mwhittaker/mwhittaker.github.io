export interface StateMachine {
  call(function_name: string): (...args: any[]) => any;
}
