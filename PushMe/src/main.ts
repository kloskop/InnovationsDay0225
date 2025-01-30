import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

//backend deployed: https://pushme-backend.onrender.com
//https://pushme-backend.onrender.com/token
//POST /message

// "message": {
//     "token": "f9z1K4O_n06BzJ7XIipXEK:APA91bEUGEY8amhtksQoczyCCc88erm7V0eeaElhZAwOr7gadDoir-50D_Rfeat-SNYi-HHlQ2R8xB2p8Lym0t4P9T6eHsHnZnt83eap3Ui7oJtaicxvx18",
//     "notification": {
//         "title": "Angular FCM",
//         "body": "Test"
//     }
//     }
// }
