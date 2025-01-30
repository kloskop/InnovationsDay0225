import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { initializeApp } from 'firebase/app';
initializeApp({
  apiKey: 'AIzaSyBBwRvE-nm9nPuBzzZJNaE62kE6dWEJlgo',
  authDomain: 'pushme-innovations-day.firebaseapp.com',
  projectId: 'pushme-innovations-day',
  storageBucket: 'pushme-innovations-day.firebasestorage.app',
  messagingSenderId: '238179121502',
  appId: '1:238179121502:web:408e659500dfd2ce4df7cf',
  measurementId: 'G-4BQ7LXWJD9',
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
