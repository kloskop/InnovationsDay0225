import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { FcmPWAService } from './fcm-pwa.service';
import { FcmMobileService } from './fcm-mobile.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private _platform: Platform,
    private _fcmPWA: FcmPWAService,
    private _fcmMobile: FcmMobileService
  ) {
    this._platform.ready().then(() => {
      if (Capacitor.getPlatform() === 'web') {
        console.info('WEB platform - FCM init');

        this._fcmPWA.requestPermission();
        this._fcmPWA.listen();
      } else {
        console.info('mobile platform - FCM init');

        this._fcmMobile.initPush().catch((error) => {
          console.error(error);
        });
      }
    });
  }
  ngOnInit(): void {}
}
