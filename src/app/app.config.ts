import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideState, provideStore} from "@ngrx/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {authFeatureKey, authReducer, selectIsSubmitting} from "./auth/store/reducers";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideEffects} from "@ngrx/effects";
import * as authEffect from './auth/store/effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideEffects(authEffect),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    })
  ]
};
