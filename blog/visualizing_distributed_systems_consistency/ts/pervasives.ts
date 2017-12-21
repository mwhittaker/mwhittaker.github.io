// <reference path="assert.ts" />

namespace pervasives {

export function argmin<T>(xs: T[], cmp: (x: T, y: T) => number): number | null {
  if (xs.length === 0) {
    return null;
  }

  let min = xs[0];
  let min_index = 0;
  for (let i = 1; i < xs.length; ++i) {
    let x = xs[i];
    if (cmp(x, min) < 0) {
      min = x;
      min_index = i;
    }
  }

  return min_index;
}

export function min<T>(xs: T[], cmp: (x: T, y: T) => number): T | null {
  const min_index = argmin(xs, cmp);
  if (min_index !== null) {
    return xs[min_index];
  } else {
    return null;
  }
}

export function filter_map<A, B>(xs: A[], f: (x: A) => B | null): B[] {
  return xs.map(f).filter((x) => x !== null).map((x) => x as B);
}

} // namespace pervasives
