// <reference path="assert.ts" />
// <reference path="pervasives.ts" />
// <reference path="unittest.ts" />

namespace pervasives_test {

unittest.register("pervasives_test.test_min_and_argmin", function() {
  const unittests: [string[], number | null, string | null][] = [
    [[], null, null],
    [["a"], 0, "a"],
    [["a", "b"], 0, "a"],
    [["b", "a"], 1, "a"],
    [["a", "b", "c"], 0, "a"],
    [["b", "a", "c"], 1, "a"],
    [["b", "c", "a"], 2, "a"],
  ];

  const cmp = (x: string, y: string) => x.localeCompare(y);
  for (const [xs, i, s] of unittests) {
    assert.assert_eq(pervasives.argmin(xs, cmp), i);
    assert.assert_eq(pervasives.min(xs, cmp), s);
  }
});

unittest.register("pervasives_test.test_filter_map", function() {
  const f = function(x: number): number | null {
    if (x % 2 == 0) {
      return x * x;
    } else {
      return null;
    }
  }

  const unittests: [number[], number[]][] = [
    [[], []],
    [[0], [0]],
    [[0, 1], [0]],
    [[0, 1, 2], [0, 4]],
    [[0, 1, 1, 2, 2, 2], [0, 4, 4, 4]],
  ];

  for (const [xs, expected] of unittests) {
    assert.assert_array_eq(pervasives.filter_map(xs, f), expected);
  }
});

} // namespace pervasives_test
