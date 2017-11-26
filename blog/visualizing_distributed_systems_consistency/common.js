common = {}

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
    msg = lhs.toString() + " !== " + rhs.toString() + ".";
  }
	common.assert(lhs === rhs, msg);
}

common.assert_ne = function(lhs, rhs, msg) {
  if (typeof msg === "undefined") {
    msg = lhs.toString() + " === " + rhs.toString() + ".";
  }
	common.assert(lhs !== rhs, msg);
}

common.assert_lt = function(lhs, rhs, msg) {
  if (typeof msg === "undefined") {
    msg = lhs.toString() + " >= " + rhs.toString() + ".";
  }
	common.assert(lhs < rhs, msg);
}

common.assert_le = function(lhs, rhs, msg) {
  if (typeof msg === "undefined") {
    msg = lhs.toString() + " > " + rhs.toString() + ".";
  }
	common.assert(lhs <= rhs, msg);
}

common.assert_gt = function(lhs, rhs, msg) {
  if (typeof msg === "undefined") {
    msg = lhs.toString() + " <= " + rhs.toString() + ".";
  }
	common.assert(lhs > rhs, msg);
}

common.assert_ge = function(lhs, rhs, msg) {
  if (typeof msg === "undefined") {
    msg = lhs.toString() + " < " + rhs.toString() + ".";
  }
	common.assert(lhs >= rhs, msg);
}

common.typecheck = function(x, type) {
  common.assert_eq(typeof type, "string");
  var msg = "Expected type " + type + " but got type " + typeof x +
            " (" + x.toString() + ")";
  common.assert_eq(typeof x, type, msg);
}
