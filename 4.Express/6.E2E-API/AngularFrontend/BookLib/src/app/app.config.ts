// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RegisterComponent } from './components/register/register.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter([
      { path: '', component: AppComponent }, // Book list page
      { path: 'register', component: RegisterComponent } // Register page
    ]), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())  // Enable HTTP requests in Angular
    ]
};
