import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { ApiInterceptor } from './app.interceptors';
import { AppRoutingModule } from './app.routing';
import { RocketModule } from './rocket/rocket.module';
import { IsAuthenticated, IsGuest } from './login/login.permissions';
import { LoginService } from './login/login.service';
import { AlertService } from './shared/alert/alert.service';
import { RocketService } from './rocket/rocket.service';
import { WebSocketService } from './app.websocket';

import { AlertComponent } from './shared/alert/alert.component';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardControlsComponent } from './dashboard/controls/controls.component';
import { DashboardEngineComponent } from './dashboard/engine/engine.component';
import { DashboardGyroComponent } from './dashboard/gyro/gyro.component';
import { DashboardPositionComponent } from './dashboard/position/position.component';
import { DashboardTimeComponent } from './dashboard/time/time.component';

import { SecondsToTimePipe } from './app.pipes';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    DashboardComponent,
    DashboardControlsComponent,
    DashboardEngineComponent,
    DashboardGyroComponent,
    DashboardPositionComponent,
    DashboardTimeComponent,
    SecondsToTimePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    /* Material imports */
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,

    /* App Modules */
    RocketModule,
  ],
  providers: [
    IsAuthenticated,
    IsGuest,
    AlertService,
    LoginService,
    RocketService,
    WebSocketService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  entryComponents: [
    AlertComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
