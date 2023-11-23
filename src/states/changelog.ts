import type { Dto } from '../models/dto';
import type { Persistable } from '../models/persistable';

export class ChangelogState implements Persistable<ChangelogStateDto> {
  /** User's last read semver in the changelog.
   * Treat `undefined` as uninitialized state. Initialized default is 1.0.0
   */
  public lastSeenChangelogSemver: string | undefined;

  public copyFromDto(dto: ChangelogStateDto): void {
    this.lastSeenChangelogSemver = dto.lastSeenChangelogSemver;
  }
  public toDto(): ChangelogStateDto {
    return {
      lastSeenChangelogSemver: this.lastSeenChangelogSemver,
      version: 1,
    };
  }
}

export interface ChangelogStateDto extends Dto {
  lastSeenChangelogSemver: string | undefined;
  version: 1;
}
