import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FcmTokenService } from '../fcm-token.service';
import { Clipboard } from '@capacitor/clipboard';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  animations: [
    trigger('zoomInFromBottom', [
      state('void', style({
        transform: 'translateY(50%) scale(0)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateY(0) scale(1)',
        opacity: 1
      })),
      transition('void => *', [
        animate('1s ease-out')
      ])
    ])
  ]
})
export class HomePage {
  constructor(
    public fcmToken: FcmTokenService,
    private _toastr: ToastrService
  ) {}

  public version = environment.version;

  async copyToken(): Promise<void> {
    await Clipboard.write({
      string: this.fcmToken.CurrentToken,
    });
    this._toastr.success('Copied token to clipboard');
  }
}
