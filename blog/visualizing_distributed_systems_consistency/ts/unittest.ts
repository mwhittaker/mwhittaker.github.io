import * as assert from "./assert";

const unittests: [string, () => void][] = [];

export function register(name: string, test: () => void): void {
  unittests.push([name, test]);
}

export function run_all(): void {
  for (const [name, test] of unittests) {
    console.log(name);
    test();
  }
}

export function expect_error(f: () => void): void {
  try {
    f();
    assert.assert(false, "Expected an Error.");
  } catch (e) {
    // Do nothing. An error is expected.
  }
}
