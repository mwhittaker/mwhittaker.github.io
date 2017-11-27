common = {}

// The `toString` method is not defined for `undefined` and `null`.
// `common.to_string` is a wrapper function around `toString` which _is_
// defined for `undefined` and `null`.
//
//   common.to_string(undefined) === "undefined"
//   common.to_string(null)      === "null"
//   common.to_string(x)         === x.toString()
common.to_string = function(x) {
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

common.assert_eq = function(lhs, rhs, msg) {
  if (typeof msg === "undefined") {
    msg = common.to_string(lhs) + " !== " + common.to_string(rhs) + ".";
  }
	common.assert(lhs === rhs, msg);
}

common.assert_ne = function(lhs, rhs, msg) {
  if (typeof msg === "undefined") {
    msg = common.to_string(lhs) + " === " + common.to_string(rhs) + ".";
  }
	common.assert(lhs !== rhs, msg);
}

common.assert_lt = function(lhs, rhs, msg) {
  if (typeof msg === "undefined") {
    msg = common.to_string(lhs) + " >= " + common.to_string(rhs) + ".";
  }
	common.assert(lhs < rhs, msg);
}

common.assert_le = function(lhs, rhs, msg) {
  if (typeof msg === "undefined") {
    msg = common.to_string(lhs) + " > " + common.to_string(rhs) + ".";
  }
	common.assert(lhs <= rhs, msg);
}

common.assert_gt = function(lhs, rhs, msg) {
  if (typeof msg === "undefined") {
    msg = common.to_string(lhs) + " <= " + common.to_string(rhs) + ".";
  }
	common.assert(lhs > rhs, msg);
}

common.assert_ge = function(lhs, rhs, msg) {
  if (typeof msg === "undefined") {
    msg = common.to_string(lhs) + " < " + common.to_string(rhs) + ".";
  }
	common.assert(lhs >= rhs, msg);
}

common.typecheck = function(x, type) {
  common.assert_eq(typeof type, "string");
  var msg = "Expected type " + type + " but got type " + typeof x +
            " (" + common.to_string(x) + ")";
  common.assert_eq(typeof x, type, msg);
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
