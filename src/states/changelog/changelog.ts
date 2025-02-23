import { proxy } from "valtio";

export interface ChangelogState {
  /** User's last read semver in the changelog.
   * Treat `undefined` as uninitialized state. Initialized default is 1.0.0
   */
  lastSeenChangelogSemver: string | undefined;
}

export const changelogState = proxy<ChangelogState>({
  lastSeenChangelogSemver: undefined,
});

export const changelogStateKey = "changelog";
