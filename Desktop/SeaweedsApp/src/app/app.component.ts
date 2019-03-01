import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MonitorPage } from '../pages/monitor/monitor';
import { AboutPage } from '../pages/about/about';
import { ControlPage } from '../pages/control/control';
import { MenuController } from 'ionic-angular';
import { ReportPage } from '../pages/report/report';



import firebase from 'firebase';
import { firebaseConfig } from './credentials';
import { Unsubscribe } from '@firebase/util';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    //const unsubscribe: Unsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'Monitor', component: MonitorPage },
         // { title: 'Control', component: ControlPage },
         // { title: 'Report', component: ReportPage },
         // { title: 'About', component: AboutPage }
      ];  
      
      // if (user) {
      //   this.rootPage = 'LoginPage';
      //   unsubscribe();
      //   // this.pages = [
      //   //   { title: 'Home', component: HomePage },
      //   //   { title: 'Monitor', component: MonitorPage },
      //   //   { title: 'Control', component: ControlPage },
      //   //   { title: 'About', component: AboutPage }
      //   // ];  
      // } else {
      //   this.rootPage = 'LoginPage';
      //   unsubscribe();
      // }
    };

    initializeApp() {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
  
    openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }
  }
  

  



 



