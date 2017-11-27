common = {}

// The `toString` method is not defined for `undefined` and `null`.
// `common.str` is a wrapper function around `toString` which _is_
// defined for `undefined` and `null`.
//
//   common.str(undefined) === "undefined"
//   common.str(null)      === "null"
//   common.str(x)         === x.toString()
common.str = function(x) {
  if (typeof x === "undefined") {
    return "undefined";
  }

  if (x === null) {
    return "null";
  }

  return x.toString();
}

// https://stackoverflow.com/a/15313435
common.assert = function(b, msg) {
  if (typeof msg === "undefined") {
    msg = "Assertion failed.";
  }

  if (!b) {
    if (typeof Error !== "undefined") {
      throw new Error(msg);
    }
    throw message;
  }
}

common._assert_comparison = function(lhs, rhs, cmp, cmp_str, msg, verbose) {
  if (typeof msg === "undefined") {
    msg = common.str(lhs) + " " + cmp_str + " " + common.str(rhs) + ".";
  }

  if (typeof verbose === "undefined") {
    verbose = true;
  }

  if (verbose && !cmp(lhs, rhs)) {
    console.log(lhs);
    console.log(rhs);
  }
  common.assert(cmp(lhs, rhs), msg);
}

common.assert_eq = function(lhs, rhs, msg, verbose) {
  var cmp = function(l, r) { return l === r; };
  common._assert_comparison(lhs, rhs, cmp, "===", msg, verbose);
}

common.assert_ne = function(lhs, rhs, msg, verbose) {
  var cmp = function(l, r) { return l !== r; };
  common._assert_comparison(lhs, rhs, cmp, "!==", msg, verbose);
}

common.assert_lt = function(lhs, rhs, msg, verbose) {
  var cmp = function(l, r) { return l < r; };
  common._assert_comparison(lhs, rhs, cmp, "<", msg, verbose);
}

common.assert_le = function(lhs, rhs, msg, verbose) {
  var cmp = function(l, r) { return l <= r; };
  common._assert_comparison(lhs, rhs, cmp, "<=", msg, verbose);
}

common.assert_gt = function(lhs, rhs, msg, verbose) {
  var cmp = function(l, r) { return l > r; };
  common._assert_comparison(lhs, rhs, cmp, ">", msg, verbose);
}

common.assert_ge = function(lhs, rhs, msg) {
  var cmp = function(l, r) { return l >= r; };
  common._assert_comparison(lhs, rhs, cmp, ">=", msg, verbose);
}

common.typecheck = function(x, type) {
  common.assert_eq(typeof type, "string");
  var msg = "Expected type " + type +
            " but got type " + typeof x +
            " (" + common.str(x) + ")";
  if (typeof x !== type) {
    console.log(x);
  }
  common.assert_eq(typeof x, type, msg);
}

common.instance_of = function(x, constructor) {
  if (!(x instanceof constructor)) {
    console.log(x);
    console.log(constructor);
  }
  common.assert(x instanceof constructor, "Unexpected instanceof.");
}

// `common.expect_error(f)` runs `f` and throws an `Error` if `f` does not.
common.expect_error = function(f) {
  try {
    f();
    var error_thrown = false;
  } catch (e) {
    var error_thrown = true;
  }
  common.assert(error_thrown, "Expected an Error.")
}
