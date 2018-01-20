// import common.js

range = {}

// type Range = {
//   start: number,
//   stop: number,
//   shift: number -> undefined
//
//   comes_before: range -> bool
//   comes_after: range -> bool
//   overlaps: range -> bool
// }
//
// new Range(start, stop) represents the range [start, stop] inclusive on both
// ends.
range.Range = function Range(start, stop) {
  common.typecheck(start, "number");
  common.typecheck(stop, "number");
  common.assert_le(start, stop, undefined, false);

  this.start = start;
  this.stop = stop;

  this.comes_before = function(that) {
    common.typecheck(that, "object");
    return this.stop < that.start;
  }

  this.comes_after = function(that) {
    common.typecheck(that, "object");
    return this.start > that.stop;
  }

  this.overlaps = function(that) {
    common.typecheck(that, "object");
    return !(this.comes_before(that) || this.comes_after(that));
  }
}
