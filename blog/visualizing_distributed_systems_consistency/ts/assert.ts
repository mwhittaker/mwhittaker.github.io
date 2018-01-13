// tslint:disable:no-shadowed-variable
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
  msg?: string,
): void {
  const prefix = `${lhs} ${cmp_str} ${rhs}`;
  msg = msg ? `${prefix}: ${msg}` : `${prefix}.`;
  assert(cmp(lhs, rhs), msg);
}

export function assert_eq<A>(lhs: A, rhs: A, msg?: string): void {
  const cmp = (l: A, r: A) => l === r;
  _assert_comparison(lhs, rhs, cmp, "===", msg);
}

export function assert_ne<A>(lhs: A, rhs: A, msg?: string): void {
  const cmp = (l: A, r: A) => l !== r;
  _assert_comparison(lhs, rhs, cmp, "!==", msg);
}

export function assert_lt<A>(lhs: A, rhs: A, msg?: string): void {
  const cmp = (l: A, r: A) => l < r;
  _assert_comparison<A>(lhs, rhs, cmp, "<", msg);
}

export function assert_le<A>(lhs: A, rhs: A, msg?: string): void {
  const cmp = (l: A, r: A) => l <= r;
  _assert_comparison<A>(lhs, rhs, cmp, "<=", msg);
}

export function assert_gt<A>(lhs: A, rhs: A, msg?: string): void {
  const cmp = (l: A, r: A) => l > r;
  _assert_comparison<A>(lhs, rhs, cmp, ">", msg);
}

export function assert_ge<A>(lhs: A, rhs: A, msg?: string): void {
  const cmp = (l: A, r: A) => l >= r;
  _assert_comparison(lhs, rhs, cmp, ">=", msg);
}

export function assert_array_eq<A>(lhs: A[], rhs: A[], msg?: string): void {
  assert_eq(lhs.length, rhs.length, msg);
  for (let i = 0; i < lhs.length; ++i) {
    assert_eq(lhs[i], rhs[i], msg ? `index ${i}: ${msg}` : `index ${i}.`);
  }
}
