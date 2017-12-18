namespace assert {

// https://stackoverflow.com/a/15313435
export function assert(b: boolean, msg: string = "Assertion failed."): void {
  if (!b) {
    throw new Error(msg);
  }
}

function _assert_comparison<A>(
  lhs: A,
  rhs: A,
  cmp: (lhs: A, rhs: A) => boolean,
  cmp_str: string,
  msg?: string
): void {
  if (!msg) {
    msg = `${lhs} ${cmp_str} ${rhs}.`;
  }
  assert(cmp(lhs, rhs), msg);
}

export function assert_eq<A>(lhs: A, rhs: A, msg?: string): void {
  var cmp = function(l: A, r: A) { return l === r; };
  _assert_comparison(lhs, rhs, cmp, "===", msg);
}

export function assert_ne<A>(lhs: A, rhs: A, msg?: string): void {
  var cmp = function(l: A, r: A) { return l !== r; };
  _assert_comparison(lhs, rhs, cmp, "!==", msg);
}

export function assert_lt<A>(lhs: A, rhs: A, msg?: string): void {
  var cmp = function(l: A, r: A) { return l < r; };
  _assert_comparison<A>(lhs, rhs, cmp, "<", msg);
}

export function assert_le<A>(lhs: A, rhs: A, msg?: string): void {
  var cmp = function(l: A, r: A) { return l <= r; };
  _assert_comparison<A>(lhs, rhs, cmp, "<=", msg);
}

export function assert_gt<A>(lhs: A, rhs: A, msg?: string): void {
  var cmp = function(l: A, r: A) { return l > r; };
  _assert_comparison<A>(lhs, rhs, cmp, ">", msg);
}

export function assert_ge<A>(lhs: A, rhs: A, msg?: string): void {
  var cmp = function(l: A, r: A) { return l >= r; };
  _assert_comparison(lhs, rhs, cmp, ">=", msg);
}

} // namespace assert
