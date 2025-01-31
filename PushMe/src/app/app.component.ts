import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { ToastrService } from 'ngx-toastr';
import { FcmTokenService } from './fcm-token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  message: any = null;
  constructor(
    private _toastr: ToastrService,
    private _fcmToken: FcmTokenService
  ) {}
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
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
  listen() {
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
