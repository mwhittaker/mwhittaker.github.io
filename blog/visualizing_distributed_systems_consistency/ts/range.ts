/// <reference path="assert.ts" />

namespace range {

// Range(start, stop) represents the range [start, stop).
export class Range {
  constructor(readonly start: number, readonly stop: number) {
    assert.assert_le(start, stop);
  }

  public comes_before(that: Range): boolean {
    return this.stop <= that.start;
  }

  public comes_after(that: Range) {
    return this.start >= that.stop;
  }

  public overlaps(that: Range) {
    return !(this.comes_before(that) || this.comes_after(that));
  }

  // Lexicographically compare ranges.
  public compare(that: Range) {
    const start_cmp = this.start - that.start;
    const stop_cmp = this.stop - that.stop;
    if (start_cmp < 0) {
      return start_cmp;
    } else if (start_cmp === 0) {
      return stop_cmp;
    } else {
      assert.assert_gt(start_cmp, 0);
      return start_cmp;
    }
  }
}

} // namespace range
