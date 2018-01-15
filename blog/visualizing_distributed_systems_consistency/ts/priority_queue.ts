import * as assert from "./assert";

export class PriorityQueue<T, K> {
  private queue: T[] = [];

  constructor(private readonly key: (x: T) => K) {}

  public push(x: T) {
    this.queue.push(x);
    this.queue.sort((lhs: T, rhs: T): number => {
      const lhs_key = this.key(lhs);
      const rhs_key = this.key(rhs);
      if (lhs_key < rhs_key) {
        return -1;
      } else if (lhs_key === rhs_key) {
        return 0;
      } else {
        return 1;
      }
    });
  }

  public pop_min(): T {
    assert.assert_gt(this.queue.length, 0);
    return this.queue.shift() as T;
  }
}
