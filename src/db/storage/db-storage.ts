/** Simple interface for local storage
 * Can be used to stub local storage in nextjs SSR */
export interface DbStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}
