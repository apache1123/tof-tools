import type { ReactNode } from 'react';

export interface Changeset {
  semver: string;
  date: Date;
  title: string;
  description?: ReactNode;
  isImportant?: boolean;
}

export type Changelog = Changeset[];
