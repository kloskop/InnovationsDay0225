import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setStorage(key: string, value: any): Promise<void> {
    return Preferences.set({ key: key, value: value });
  }

  getStorageValue(key: string): Promise<any> {
    return Preferences.get({ key: key });
  }

  removeStorage(key: string): Promise<void> {
    return Preferences.remove({ key: key });
  }

  async clearStorage(): Promise<void> {
    Preferences.clear();
  }
}
