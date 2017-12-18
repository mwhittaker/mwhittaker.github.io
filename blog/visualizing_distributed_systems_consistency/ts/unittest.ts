/// <reference path="assert.ts" />

namespace unittest {

let _unittests: [string, () => void][] = [];

export function register(name: string, test: () => void): void {
  _unittests.push([name, test]);
}

export function run_all(): void {
  for (let [name, test] of _unittests) {
    console.log(name);
    test();
  }
}

export function expect_error(f: () => void): void {
  try {
    f();
    var error_thrown = false;
  } catch (e) {
    var error_thrown = true;
  }
  assert.assert(error_thrown, "Expected an Error.")
}

} // namespace unittest
