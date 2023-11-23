import type { ChangelogStateDto } from '../../changelog';

export function initializeChangelogState() {
  const changelogState: ChangelogStateDto = {
    lastSeenChangelogSemver: '1.0.0',
    version: 1,
  };

  localStorage.setItem('changelog', JSON.stringify(changelogState));
}
