import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"zeiterfassung-c7a86","appId":"1:229050498264:web:4d67549be3b81a96bdabad","storageBucket":"zeiterfassung-c7a86.firebasestorage.app","apiKey":"AIzaSyDpLIqYbH1uGDLYFFohyyWEs51L3vhBQlk","authDomain":"zeiterfassung-c7a86.firebaseapp.com","messagingSenderId":"229050498264","measurementId":"G-YEKJFXLE27"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
