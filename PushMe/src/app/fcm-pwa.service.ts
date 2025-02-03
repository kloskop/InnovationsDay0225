import { Injectable } from '@angular/core';
import { FcmTokenService } from './fcm-token.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

@Injectable({
  providedIn: 'root',
})
export class FcmPWAService {
  constructor(
    private _toastr: ToastrService,
    private _fcmToken: FcmTokenService
  ) {}

  message: any = null;

  public requestPermission() {
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Notification Token: ');
          console.log(currentToken);
          this._fcmToken.setCurrentToken(currentToken);
        } else {
          console.log('No token available. Generate Token first!');
        }
      })
      .catch((err) => {
        console.log('An error occurred while generating token. ', err);
      });
  }

  public listen() {
    const messaging = getMessaging();

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);

      this.message = payload;
      this._toastr.info(
        this.message?.notification?.title,
        this.message?.notification?.body
      );
    });
  }
}
