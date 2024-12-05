import { stateKeyPrefix } from "../../../constants/persistence";
import type { ChangelogState } from "../../changelog/changelog";
import { changelogStateKey } from "../../changelog/changelog";

export function initializeChangelogState() {
  const changelogState: ChangelogState = {
    lastSeenChangelogSemver: "1.0.0",
  };

  localStorage.setItem(
    `${stateKeyPrefix}${changelogStateKey}`,
    JSON.stringify(changelogState),
  );
}
