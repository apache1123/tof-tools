// During app v4 rewrite, migrated to using mostly flat data structure repos for each entity
import { DataMigrationError } from "../error/data-migration-error";

export function migrateToRepos() {
  throw new DataMigrationError("test error", { testData: "testData" });
}
