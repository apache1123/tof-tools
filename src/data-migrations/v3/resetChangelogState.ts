import { stateKeyPrefix } from "../../constants/persistence";
import type { ChangelogState } from "../../states/changelog/changelog";
import { changelogStateKey } from "../../states/changelog/changelog";

export function resetChangelogState() {
  const changelogState: ChangelogState = {
    lastSeenChangelogSemver: "1.0.0",
  };

  localStorage.setItem(
    `${stateKeyPrefix}${changelogStateKey}`,
    JSON.stringify(changelogState),
  );
}
