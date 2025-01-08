export class MemoryStorageString implements Storage {
  private storage: Record<string, string>;

  constructor(initialState:Record<string, string> = {}) {
    this.storage = initialState;
  }

  getItem(key: string): string | null {
    return this.storage[key] ?? null;
  }

  setItem(key: string, value: string): void {
    this.storage[key] = value;
  }

  removeItem(key: string): void {
    delete this.storage[key];
  }

  clear(): void {
    this.storage = {};
  }

  get length(): number {
    return Object.keys(this.storage).length;
  }

  key(index: number): string | null {
    return Object.keys(this.storage)[index] ?? null;
  }
}

export type MemoryStorageValueType = string | number | boolean | Record<string, unknown> | null;

export class MemoryStorage {
  private storage: Record<string, MemoryStorageValueType>;

  constructor(initialState:Record<string, MemoryStorageValueType> = {}) {
    this.storage = initialState;
  }

  getItem(key: string): MemoryStorageValueType {
    return this.storage[key] ?? null;
  }

  setItem(key: string, value: MemoryStorageValueType): void {
    this.storage[key] = value;
  }

  removeItem(key: string): void {
    delete this.storage[key];
  }

  clear(): void {
    this.storage = {};
  }

  get length(): number {
    return Object.keys(this.storage).length;
  }

  get json(): string {
    return JSON.stringify(this.storage);
  }
}