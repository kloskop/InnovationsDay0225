import { Injectable } from '@angular/core';
import { FCM } from '@capacitor-community/fcm';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import { StorageService } from './storage.service';

// Constant for storing FCM token in local storage
export const FCM_TOKEN = 'push_notification_token';

// Service for handling Firebase Cloud Messaging (FCM) on mobile devices
@Injectable({
  providedIn: 'root',
})
export class FcmMobileService {
  // Constructor for injecting StorageService
  constructor(private _storage: StorageService) {}

  /**
   * Initialize push notifications by enabling auto initialization and registering for push notifications
   * @returns Promise<void>
   */
  async initPush(): Promise<void> {
    // Enable auto initialization for FCM
    FCM.setAutoInit({ enabled: true }).then(() =>
      console.log(`FCM Auto init enabled`)
    );

    // Register for push notifications
    await this.registerPush();
  }

  /**
   * Register for push notifications by adding event listeners and requesting permissions
   * @returns Promise<void>
   */
  private async registerPush() {
    try {
      // Add event listeners for push notifications
      await this.addListeners();
      // Check if user has granted permission for receiving push notifications
      let permStatus = await PushNotifications.checkPermissions();

      // If permission is not granted, request permission from user
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      // If permission is still not granted, throw an error
      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      // Subscribe to 'global' topic for receiving push notifications
      FCM.subscribeTo({ topic: 'global' })
        .then((r) => console.info(`Subscribed to topic 'global'`))
        .catch((err) => console.error(err));

      // Register for push notifications
      await PushNotifications.register();
    } catch (e) {
      console.log(e);
    }

    // Get FCM token
    FCM.getToken()
      .then((r) => console.log(`Token ${r.token}`))
      .catch((err) => console.log(err));
  }

  /**
   * Add event listeners for push notifications
   */
  addListeners() {
    // Event listener for registration event
    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('My token: ', token);
      const fcm_token = token?.value;
      let go = 1;
      // Get saved FCM token from local storage
      const saved_token = JSON.parse(
        (await this._storage.getStorageValue(FCM_TOKEN)).value
      );
      if (saved_token) {
        // If saved token is the same as new token, do nothing
        if (fcm_token == saved_token) {
          console.log('same token');
          go = 0;
        } else {
          // If saved token is different from new token, update token
          go = 2;
        }
      }
      // If token is new, save it to local storage
      if (go == 1) {
        this._storage.setStorage(FCM_TOKEN, JSON.stringify(fcm_token));
      } else if (go == 2) {
        // If token is updated, update it in local storage
        const data = {
          expired_token: saved_token,
          refreshed_token: fcm_token,
        };
        this._storage.setStorage(FCM_TOKEN, JSON.stringify(fcm_token));
      }
    });

    // Event listener for registration error event
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    // Event listener for push notification received event
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        console.warn('FCM received');
        console.warn(notification);
      }
    );

    // Event listener for push notification action performed event
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        console.warn('FCM action performed');
        console.warn(notification);
      }
    );
  }
}
