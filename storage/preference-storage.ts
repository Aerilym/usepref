import {safeTrySync} from "../util/try.js";
import {MemoryStorage, MemoryStorageString, type MemoryStorageValueType} from "./memory.js";

export type StorageInterface = Storage;

function getDefaultStorage() {
  if (typeof window === 'undefined') {
    return new MemoryStorageString();
  }
  return localStorage;
}

export type PreferenceStorageOptions = {
  storage?: StorageInterface;
  defaultItems?: Record<string, MemoryStorageValueType>;
  key: string;
}

export class PreferenceStorage {
  private storage: StorageInterface;
  private memoryStorage: MemoryStorage;
  private readonly key: string;

  constructor(options: PreferenceStorageOptions) {
    this.storage = options.storage ?? getDefaultStorage();

    if (options.key === '') {
      throw new Error('Key cannot be empty');
    }

    this.key = options.key;

    this.memoryStorage = new MemoryStorage(this.getItemsFromStorage())

    if (options.defaultItems) {
      this.setDefaultItems(options.defaultItems);
    }
  }

  private getItemsFromStorage() {
    const [errGet, value] = safeTrySync(() => this.storage.getItem(this.key));
    if (errGet) {
      console.error('Error getting items from storage:', errGet);
      return null;
    }

    if (value === null) {
      return {};
    }

    const [errParse, parsedValue] = safeTrySync(() => JSON.parse(value));

    if (errParse) {
      console.error('Error getting items from storage:', errGet);
      return {}
    }

    return parsedValue;
  }

  public getItem<T>(key: string): T | null {
    const value = this.memoryStorage.getItem(key);

    if (value !== null) {
      return value as T;
    }

    return null;
  }

  public setItem(key: string, value: MemoryStorageValueType): boolean {
    this.memoryStorage.setItem(key, value);
    const [errSet] = safeTrySync(() => this.storage.setItem(this.key, this.memoryStorage.json));
    if (errSet) {
      console.error('Error setting preference storage value:', errSet);
      return false;
    }
    return true;
  }

  public setItemIfNotExists(key: string, value: MemoryStorageValueType) {
    const item = this.memoryStorage.getItem(key);
    if (item !== null) return item;

    return this.setItem(key, value);
  }

  private setDefaultItems(items: Record<string, MemoryStorageValueType>) {
    for (const [key, value] of Object.entries(items)) {
      this.setItemIfNotExists(key, value);
    }
  }

}