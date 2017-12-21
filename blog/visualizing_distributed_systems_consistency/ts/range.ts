/// <reference path="assert.ts" />

namespace range {

// Range(start, stop) represents the range [start, stop).
export class Range {
  constructor(readonly start: number, readonly stop: number) {
    assert.assert_le(start, stop);
  }

  comes_before(that: Range): boolean {
    return this.stop <= that.start;
  }

  comes_after(that: Range) {
    return this.start >= that.stop;
  }

  overlaps(that: Range) {
    return !(this.comes_before(that) || this.comes_after(that));
  }
}

} // namespace range
