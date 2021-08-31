import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/env';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { AddRecordComponent } from './dashboard/add-record/add-record.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRecordComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
