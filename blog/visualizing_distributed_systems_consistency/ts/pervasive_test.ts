import * as assert from "./assert";
import * as pervasives from "./pervasives";
import * as unittest from "./unittest";

unittest.register("pervasives_test.test_min_and_argmin", () => {
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

unittest.register("pervasives_test.test_filter_map", () => {
  const f = (x: number): number | null => {
    if (x % 2 === 0) {
      return x * x;
    } else {
      return null;
    }
  };

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
