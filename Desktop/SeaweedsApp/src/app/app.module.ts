import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MonitorPage } from '../pages/monitor/monitor';
import { AboutPage } from '../pages/about/about';
import { ControlPage } from '../pages/control/control';
import { ReportPage } from '../pages/report/report';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from '../providers/firebase/firebase';
//import { GlobalVars } from '../providers/globalVars';
import { GlobalVarsProvider } from '../providers/global-vars/global-vars';
import { AuthProvider } from '../providers/auth/auth';


export const firebaseConfig = {
 /* apiKey: "AIzaSyDSMrX2C715GsFpEC06emJ8LT1fGi0mil0",
  authDomain: "hvccareeee.firebaseapp.com",
  databaseURL: "https://hvccareeee.firebaseio.com",
  projectId: "hvccareeee",
  storageBucket: "hvccareeee.appspot.com",
  messagingSenderId: "179047373339"
  */
    apiKey: "AIzaSyCfOVS4fKzugZEv2o26Ir8rjkH2XwayfJo",
    authDomain: "hvccare-5b4bc.firebaseapp.com",
    databaseURL: "https://hvccare-5b4bc.firebaseio.com",
    projectId: "hvccare-5b4bc",
    storageBucket: "hvccare-5b4bc.appspot.com",
    messagingSenderId: "706149028538"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MonitorPage,
    ControlPage,
    ReportPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MonitorPage,
    ControlPage,
    ReportPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    GlobalVarsProvider,
    //GlobalVars,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {
  
}
