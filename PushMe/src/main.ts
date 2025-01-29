import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Workbox } from 'workbox-window';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((_) => loadServiceWorker())
  .catch((err) => console.log(err));

function loadServiceWorker() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');

    wb.register();
  }
}
