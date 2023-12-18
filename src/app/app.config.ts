import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideState, provideStore} from "@ngrx/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {authFeatureKey, authReducer} from "./auth/store/reducers";
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http'
import {provideEffects} from "@ngrx/effects";
import * as authEffect from './auth/store/effects'
import {provideRouterStore, routerReducer} from '@ngrx/router-store'
import {authInterceptor} from './shared/services/authInterceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideClientHydration(),
    provideStore({
      router: routerReducer
    }),
    provideRouterStore(),
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
