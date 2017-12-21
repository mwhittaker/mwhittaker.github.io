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

  // Lexicographically compare ranges.
  compare(that: Range) {
    let start_cmp = this.start - that.start;
    let stop_cmp = this.stop - that.stop;
    if (start_cmp < 0) {
      return start_cmp;
    } else if (start_cmp == 0) {
      return stop_cmp;
    } else {
      assert.assert_gt(start_cmp, 0);
      return start_cmp;
    }
  }
}

} // namespace range
