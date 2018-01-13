import "./assert_test";
import "./pervasive_test";
import "./queue_test";
import "./range_test";
import "./register_test";
import "./schedule_test";
import * as unittest from "./unittest";

function main(): void {
  unittest.run_all();
}

main();
