import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
//import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
//import { DevEnvironment } from '../environments/environment.development';
import { config } from '../environments/environment';
import { _config } from '../environments/environment.CI';

export const appConfig: ApplicationConfig = {
  providers: [
  provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
  provideFirebaseApp(() => {
    return process.env["CI"] ? initializeApp(config.FIREBASE_SERVICE_ACCOUNT_REMTECH_PROJECT) : initializeApp(_config.NO_CONFIG)
  }),
  provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, 
  provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
  /*provideAppCheck(() => {
    TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_  reCAPTCHA Enterprise site key 
    const provider = new ReCaptchaEnterpriseProvider('');
    return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
  }), */
  provideFunctions(() => getFunctions()),
  provideMessaging(() => getMessaging()),
  providePerformance(() => getPerformance()),
  provideStorage(() => getStorage()),
  provideRemoteConfig(() => getRemoteConfig())
]
};