import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AuthService } from './../providers/auth-service';
import { ClasshttpService } from './../providers/classhttp-service';
import { AllValidator } from './../providers/allvalidators';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Rave, RavePayment, Misc } from 'rave-ionic3';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
	HttpModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp),
	
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
	AuthService,
    ClasshttpService,
    AllValidator,
	InAppBrowser,
	Rave, RavePayment, Misc,
	
	
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
