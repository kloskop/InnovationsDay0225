import { Injectable } from '@angular/core';
import { FCM } from '@capacitor-community/fcm';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import { StorageService } from './storage.service';

export const FCM_TOKEN = 'push_notification_token';

@Injectable({
  providedIn: 'root',
})
export class FcmMobileService {
  constructor(private _storage: StorageService) {}

  async initPush(): Promise<void> {
    FCM.setAutoInit({ enabled: true }).then(() =>
      console.log(`FCM Auto init enabled`)
    );

    await this.registerPush();
  }

  private async registerPush() {
    try {
      await this.addListeners();
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      FCM.subscribeTo({ topic: 'global' })
        .then((r) => console.info(`Subscribed to topic 'global'`))
        .catch((err) => console.error(err));

      await PushNotifications.register();
    } catch (e) {
      console.log(e);
    }

    FCM.getToken()
      .then((r) => console.log(`Token ${r.token}`))
      .catch((err) => console.log(err));
  }

  addListeners() {
    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('My token: ', token);
      const fcm_token = token?.value;
      let go = 1;
      const saved_token = JSON.parse(
        (await this._storage.getStorageValue(FCM_TOKEN)).value
      );
      if (saved_token) {
        if (fcm_token == saved_token) {
          console.log('same token');
          go = 0;
        } else {
          go = 2;
        }
      }
      if (go == 1) {
        // save token
        this._storage.setStorage(FCM_TOKEN, JSON.stringify(fcm_token));
      } else if (go == 2) {
        // update token
        const data = {
          expired_token: saved_token,
          refreshed_token: fcm_token,
        };
        this._storage.setStorage(FCM_TOKEN, JSON.stringify(fcm_token));
      }
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.warn('FCM received');
        console.warn(notification);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        console.warn('FCM action performed');
        console.warn(notification);
      }
    );
  }
}
