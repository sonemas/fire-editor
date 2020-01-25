import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as process from 'process';
window['process'] = process;

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// Async import is required for wasm to work!!!!
import('./app/app.module')
  .then(x => platformBrowserDynamic().bootstrapModule(x.AppModule))
  .catch(err => console.error(err));
