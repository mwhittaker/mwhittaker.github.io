namespace state_machine {

export interface StateMachine {
  call(function_name: string): (...args: any[]) => any;
}

} // namespace state_machine
