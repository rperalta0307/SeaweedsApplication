import { Component, Injectable, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@Injectable()
export class HomePage {
  dates = []
  result = []
  timeStamp = []
  valueTemp = []
  valueSal = []
 // valueWtrlvl = []
  valuePh = []
  Temperatures = []
  crop1 = ""
  crop2 = ""
  crop3 = ""
  buttonDisabled = true;
  //This is what i add came from the fisrt app
  buttonDisabled2 = true;
  
  fish = ""
  NumberOfFish = ""
  AgeOfFish = ""
  feed = ""
  
  

  @ViewChild('lineCanvasHome') lineCanvasHome;
  lineChartHome: any;

  constructor(public navCtrl: NavController, public firebaseDb: AngularFireDatabase, public alertCtrl: AlertController,
    public authProvider: AuthProvider) {
    this.crop1 = "";
    this.crop2 = "";
    this.crop3 = "";
    this.fish = "";
    this.NumberOfFish = "";
    this.AgeOfFish = "";
    this.feed = "";

    /*this.afd.list('Realtime_Data', ref => ref.limitToLast(12)).snapshotChanges().map(actions =>{
      this.timeStamp = [];
      return actions.map(action => ({ key: action.key, ...action.payload.val()}));
    }).subscribe(dates => {
      dates.map(date => {
        this.timeStamp.push(date.key);
      });
    });

    this.afd.list('Realtime_Data', ref => ref.limitToLast(12)).valueChanges().subscribe(snapshots=>{
      this.valueTemp = [];
      this.valueSal = [];
     // this.valueWtrlvl = [];
      this.valuePh = [];
      this.result = snapshots;
      this.result.map(key => {
        this.valueTemp.push(key.Measured_Temp_C);
        this.valueSal.push(key.Measured_Salinity);
       // this.valueWtrlvl.push(key.Measured_WaterLvl);
        this.valuePh.push(key.Measured_PHLevel);
      });
    });*/

    var datem = "";
    var year = "";
    var month = "";
    var day = "";
    this.firebaseDb.list('Sea_Realtime_Data', ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val()}));
    }).subscribe(dates => {
      dates.map(date => {
        year = date.key;
        console.log(year);
        this.firebaseDb.list('Sea_Realtime_Data/'+year, ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
          return actions.map(action => ({ key: action.key, ...action.payload.val()}));
        }).subscribe(dates => {
          dates.map(date => {
            month = date.key;
            console.log(month);
            this.firebaseDb.list('Sea_Realtime_Data/'+year+'/'+month, ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
              return actions.map(action => ({ key: action.key, ...action.payload.val()}));
            }).subscribe(dates => {
              dates.map(date => {
                day = date.key;
                console.log(day);
                this.firebaseDb.list('Sea_Realtime_Data/'+year+'/'+month+'/'+day, ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
                  return actions.map(action => ({ key: action.key, ...action.payload.val()}));
                }).subscribe(dates => {
                  dates.map(date => {
                    datem = date.key;
                    console.log(datem);

                    
                    this.firebaseDb.list('Sea_Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(1)).valueChanges().subscribe(snapshots=>{
                      this.dates = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.dates.push(key.Date_Complete);
                      });
                    });
                    this.firebaseDb.list('Sea_Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valueTemp = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valueTemp.push(key.Measured_Temp_C);
                        this.timeStamp.push(key.Time);
                      });
                    });
                    
                    this.firebaseDb.list('Sea_Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valueSal = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valueSal.push(key.Measured_Salinity);
                        this.timeStamp.push(key.Time);
                      });
                    });
                    
                    /*this.firebaseDb.list('Sea_Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valueWtrlvl = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valueWtrlvl.push(key.Measured_Waterlvl);
                        this.timeStamp.push(key.Time);
                      });
                    });*/

                    this.firebaseDb.list('Sea_Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valuePh = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valuePh.push(key.Measured_PHLevel);
                        this.timeStamp.push(key.Time);
                      });
                    });

                  }); 
                });
              });
            });
          });
        });
      });
    });

    console.log(this.valueTemp);
    console.log(this.valueSal);
   // console.log(this.valueWtrlvl);
    console.log(this.valuePh);

  }

  doConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Are you sure you want to select these crops?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Agree clicked');
            this.update();
            this.Confirmed();
          }
        }
      ]
    });
    confirm.present()
  }

  Confirmed() {
    let confirmed = this.alertCtrl.create({
      title: '',
      message: 'The crops have been selected!',
      buttons: [
        {
          text: 'Done',
          handler: () => {
            console.log('Done clicked');
            
          }
        }
      ]
    });
    confirmed.present()
  }


  doConfirm2() {
    let confirm2 = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Are you sure you want to select these fishes?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Agree clicked');
            this.update2();
            this.update3();
            this.update4();
            this.update5();

            
            this.Confirmed2();
          }
        }
      ]
    });
    confirm2.present()
  }

  Confirmed2() {
    let confirmed2 = this.alertCtrl.create({
      title: '',
      message: 'The fishes have been selected!',
      buttons: [
        {
          text: 'Done',
          handler: () => {
            console.log('Done clicked');
            
          }
        }
      ]
    });
    confirmed2.present()
  }


  /*check(){
    if(this.crop1 != '' || this.crop2 != '' || this.crop3 != ''){
      this.buttonDisabled=false;
    }else{
      this.buttonDisabled=true;
    }
  }*/

  
  

  change(value){
    console.log(this.crop1);
    this.crop1 = value.toString();
    if(this.crop1 != "" || this.crop2 !=  "" || this.crop3 != ""){
      this.buttonDisabled = null;
    }
  }
  change2(value){
    console.log(this.crop2);
    this.crop2 = value.toString();
    if(this.crop1 != "" || this.crop2 != "" || this.crop3 != ""){
      this.buttonDisabled = null;
    }
  }
  change3(value){
    console.log(this.crop3);
    this.crop3 = value.toString();
    if(this.crop1 != "" || this.crop2 != "" || this.crop3 != ""){
      this.buttonDisabled = null;
    }
  }
  changeFish(value){
    console.log(this.fish);
    this.fish = value.toString();
    if(this.fish != "" && this.NumberOfFish != "" && this.AgeOfFish != ""){
      this.buttonDisabled2 = null;
    }
  }
  changeNumberOfFish(value){
  console.log(this.NumberOfFish);
  this.NumberOfFish = value.toString();
  if(this.fish != "" && this.NumberOfFish != "" && this.AgeOfFish != ""){
       this.buttonDisabled2 = null;
  }
  }
  changeAgeOfFish(value){
  console.log(this.AgeOfFish);
  this.AgeOfFish = value.toString();
  if(this.fish != "" && this.NumberOfFish != "" && this.AgeOfFish != ""){
       this.buttonDisabled2 = null;
  }
  }
   
  
  update(){
    console.log(this.crop1);
    this.firebaseDb.list("/Sea_Data/Sea_Name/").remove();
    this.firebaseDb.list("/Sea_Data/Sea_Name/").push(this.crop1.toString());
    
  }
  update2(){
  
    console.log(this.fish);
   
    this.firebaseDb.list("/Fish_Data/Fish_Name/").remove();
   
    
      
    this.firebaseDb.list("/Fish_Data/Fish_Name/").push(this.fish.toString());
    
  }
   update3(){
    console.log(this.AgeOfFish);
    this.firebaseDb.list("/Fish_Data/Fish_AgeOfFish/").remove();
    this.firebaseDb.list("/Fish_Data/Fish_AgeOfFish/").push(this.AgeOfFish.toString());
   }
   update4(){
    console.log(this.NumberOfFish);
    this.firebaseDb.list("/Fish_Data/NumberOfFish/").remove();
    this.firebaseDb.list("/Fish_Data/NumberOfFish/").push(this.NumberOfFish.toString());

    }
    update5(){

  console.log(this.feed);
 
  if(this.NumberOfFish == "21-30" && this.AgeOfFish == "2 Months Old"){
       this.feed = "A";
  }
  else if(this.NumberOfFish == "1-10" && this.AgeOfFish == "1 Week Old"){
       this.feed = "B";
  }
  else if(this.NumberOfFish == "1-10" && this.AgeOfFish == "2 Weeks Old"){
       this.feed = "C";
  }
  else if(this.NumberOfFish == "1-10" && this.AgeOfFish == "3 Weeks Old"){
       this.feed = "D";
  }
  else if(this.NumberOfFish == "1-10" && this.AgeOfFish == "1 Month Old"){
       this.feed = "E";
  }
  else if(this.NumberOfFish == "1-10" && this.AgeOfFish == "1 and 1/2 Months Old"){
       this.feed = "F";
  }
  else if(this.NumberOfFish == "1-10" && this.AgeOfFish == "2 Months Old"){
       this.feed = "G";
  }
  else if(this.NumberOfFish == "11-20" && this.AgeOfFish == "1 Week Old"){
       this.feed = "H";
  }
  else if(this.NumberOfFish == "11-20" && this.AgeOfFish == "2 Weeks Old"){
       this.feed = "I";
  }
  else if(this.NumberOfFish == "11-20" && this.AgeOfFish == "3 Weeks Old"){
       this.feed = "J";
  }
  else if(this.NumberOfFish == "11-20" && this.AgeOfFish == "1 Month Old"){
       this.feed = "K";
  }
  else if(this.NumberOfFish == "11-20" && this.AgeOfFish == "1 and 1/2 Months Old"){
       this.feed = "L";
  }
  else if(this.NumberOfFish == "11-20" && this.AgeOfFish == "2 Months Old"){
       this.feed = "M";
  }
  else if(this.NumberOfFish == "21-30" && this.AgeOfFish == "1 Week Old"){
       this.feed = "N";
  }
  else if(this.NumberOfFish == "21-30" && this.AgeOfFish == "2 Weeks Old"){
       this.feed = "O";
  }
  else if(this.NumberOfFish == "21-30" && this.AgeOfFish == "3 Weeks Old"){
       this.feed = "P";
  }
  else if(this.NumberOfFish == "21-30" && this.AgeOfFish == "1 Month Old"){
       this.feed = "Q";
  }
  else if(this.NumberOfFish == "21-30" && this.AgeOfFish == "1 and 1/2 Months Old"){
       this.feed = "R";
  }
  
 
    console.log(this.feed);
    this.firebaseDb.list("/Fish_Data/Feed/").remove();
    //this.firebaseDb.list("/Fish_Data/Feed/").push(this.feed);
    //this.firebaseDb.list('/Fish_Data').update("Feed", {"FeedCode" : this.feed});
    this.firebaseDb.list('/Actuator_Status').update("Monitor", {"zFeedCode" : this.feed});
    }
  
  ionViewDidLoad() {
    var temp = this;
    setInterval(function(){
      temp.lineChartHome = new Chart(temp.lineCanvasHome.nativeElement, {
        type: 'line',
        data: {
        labels: temp.timeStamp,
        //labels: ['Jan','Feb','Mar','Aprl','May'],
          datasets: [{
            label: "Water Temperature",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(219,112,147,0.4)",
            borderColor: "rgb(219,112,147)",
            borderCapStyle: 'square',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(219,112,147)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valueTemp,
            //data: ['5','10','15','20','25'],  
            spanGaps: true,
          }, 
          {
            label: "Salinity",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(147,112,219,0.4)",
            //borderColor: "#DC143C", // The main line color
            borderColor: "rgb(147,112,219)",
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(147,112,219)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valueSal,
            //data: ['55','60','65','70','75'],
            spanGaps: true,
          },
/*         {

          label: "Water Level",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(68, 80, 234,0.4)",
            //borderColor: "#DC143C", // The main line color
            borderColor: "rgb(36, 56, 89)",
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(37, 47, 168)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valueWtrlvl,
            //data: ['55','60','65','70','75'],
            spanGaps: true,
          }, */
          {

            label: "Acidity",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(46,139,87,0.4)",
            //borderColor: "rgb(167, 105, 0)",
            borderColor: "rgb(46,139,87)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(46,139,87)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valuePh,
            //data: ['2','4','6','8','10'],
            spanGaps: false,
          }

        ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                  beginAtZero:true
              },
              scaleLabel: {
                  display: true,
                  labelString: temp.dates,
                  fontSize: 20 
              }
            }]
          }
          
        }
      
      });


    }, 5000);

    
  
  }

  async logOut(): Promise<void> {
    this.ConfirmLogOut();
    //await this.authProvider.logoutUser();
    //this.navCtrl.setRoot('LoginPage');
  }

  ConfirmLogOut(){
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Agree clicked');
            this.ConfirmedLogOut;
            this.authProvider.logoutUser();
            this.navCtrl.setRoot('LoginPage');
          }
        }
      ]
    });
    confirm.present()

  }

  ConfirmedLogOut(){
    let confirmed = this.alertCtrl.create({
      title: '',
      message: 'You have logged out!',
      buttons: [
        {
          text: 'Done',
          handler: () => {
            console.log('Done clicked');
            
          }
        }
      ]
    });
    confirmed.present()
  }

}
