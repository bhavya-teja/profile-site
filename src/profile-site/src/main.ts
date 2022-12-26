import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { startCamera } from './cat-detector/cat-detector';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

window.onload = startCamera;