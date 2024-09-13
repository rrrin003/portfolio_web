import { enableProdMode } from '@angular/core';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';

import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';

if (environment.production) {
  const noop = () => {};

  console.assert = noop;
  console.clear = noop;
  console.count = noop;
  console.countReset = noop;
  console.debug = noop;
  console.dir = noop;
  console.dirxml = noop;
  // console.error = noop;
  console.group = noop;
  console.groupCollapsed = noop;
  console.groupEnd = noop;
  console.info = noop;
  console.log = noop;
  // console.profile = noop;
  // console.profileEnd = noop;
  console.table = noop;
  console.time = noop;
  console.timeEnd = noop;
  console.timeLog = noop;
  console.timeStamp = noop;
  console.trace = noop;
  console.warn = noop;

  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
