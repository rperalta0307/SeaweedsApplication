import { Component,  Injectable, ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chart } from 'chart.js';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';

Chart.defaults.global.defaultFontColor = 'black'

@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html'
})

@Injectable()
export class MonitorPage {
  
  result = []
  dates = []
  timeStamp = []
  valueTemp = []
  valueSal = []
  valuePh = []
  Temperatures = []
  salinity = ""
  temperature = ""
  acidity = ""
  sensor_salinity = ""
  sensor_temperature = ""
  sensor_acidity = ""
  cropName1 = ""
  cropName2 = ""
  cropName3 = ""

  Cooler_Status = ""
  Cooler_Status_2 = ""
  phDown_Status = ""
  phUp_Status = ""

  ToggleCooler: boolean;
  ToggleCooler2: boolean;
  TogglePhUp: boolean;
  TogglePhDown: boolean;

  highest_acidity = ""
  lowest_acidity = ""
  highest_salinity = ""
  lowest_salinity = ""
  highest_temperature = ""
  lowest_temperature = ""


  

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  @ViewChild('lineCanvas3') lineCanvas3;
  
  lineChart: any;
  lineChart2: any;
  lineChart3: any;

  arrData: any;
  arrName: any;
  arrStatus: any;

 
  constructor(public navCtrl: NavController, public firebaseDb: AngularFireDatabase, public alertCtrl: AlertController, public authProvider: AuthProvider){
    // this.temp_Statusbtn = true;
    // this.phUp_Statusbtn = true;
    // this.phDown_Statusbtn = false;

    this.ToggleCooler = false;
    this.ToggleCooler2 = false;
    this.TogglePhUp = false;
    this.TogglePhDown = false;

    this.firebaseDb.list('/Sea_Sensor_Data').valueChanges().subscribe(snapshots=>{
    this.arrData = snapshots;
  
    // this.sensor_humidity = this.arrData[0];
    // this.sensor_acidity = this.arrData[1];
    // this.sensor_temperature = this.arrData[2];
    // this.humidity = this.arrData[3];
    // this.acidity = this.arrData[4];
    // this.temperature = this.arrData[5];
   
    this.sensor_acidity = this.arrData[0];
    this.sensor_salinity = this.arrData[1];
    this.sensor_temperature = this.arrData[2];
     
    
    this.acidity = this.arrData[3];
    this.highest_acidity = this.arrData[4];
    this.lowest_acidity = this.arrData[5];

    this.salinity = this.arrData[6];
    this.highest_salinity = this.arrData[7];
    this.lowest_salinity = this.arrData[8];

    this.temperature = this.arrData[9];
    this.highest_temperature = this.arrData[10];
    this.lowest_temperature = this.arrData[11];

    
    });
    
    this.firebaseDb.list('/Sea_Data/Sea_Name').valueChanges().subscribe(snapshots=>{
      this.arrName = snapshots;
      this.cropName1 = this.arrName[0];
      this.cropName2 = this.arrName[1];
      this.cropName3 = this.arrName[2];

  
    });





    this.firebaseDb.list('/Actuator_Status/Monitor').valueChanges().subscribe(snapshots=>{
      this.arrStatus = snapshots;
      this.ToggleCooler= this.arrStatus[0];
      this.ToggleCooler2 = this.arrStatus[1];
      this.TogglePhDown = this.arrStatus[4];
      this.TogglePhUp = this.arrStatus[5];

      
    });
    

    
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
    
    /*this.firebaseDb.list('Realtime_Data', ref => ref.limitToLast(12)).snapshotChanges().map(actions =>{
      this.timeStamp = [];
      return actions.map(action => ({ key: action.key, ...action.payload.val()}));
    }).subscribe(dates => {
      dates.map(date => {
        this.timeStamp.push(date.key);
      });
    });*/

    /*this.firebaseDb.list('Sea_Realtime_Data', ref => ref.limitToLast(12)).valueChanges().subscribe(snapshots=>{
      this.valueTemp = [];
      this.valueSal = [];
      this.valuePh = [];
      this.result = snapshots;
      this.result.map(key => {
        this.valueTemp.push(key.Measured_Temp_C);
        this.valueSal.push(key.Measured_Sal);
        this.valuePh.push(key.Measured_PHLevel);
      });
    });*/


    

    /*this.firebaseDb.list("/Crop_Data/Crop_Name", { preserveSnapshot: true})
    .subscribe(snapshots=>{
      snapshots.forEach(snapshot => {
        if(snapshot.key=="Optimal_Salinity"){
          this.salinityy = snapshot.val();
        }
      });
    });*/
    //console.log(this.timeStamp);
    //console.log(this.result);
    console.log(this.valueTemp);
    console.log(this.valueSal);
    console.log(this.valuePh);
  }
  

  updateValues(){
    this.lineChart.update();
  }


  ionViewDidLoad() {
    var temp = this;
    setInterval(function(){
      temp.lineChart = new Chart(temp.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          //labels: ['Jan','Feb','Mar','Aprl','May'],
          labels: temp.timeStamp,
          datasets: [{
            label: "Temperature",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(255,255,255,0.2)",
            borderColor: "rgb(0,0,0)",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(0,0,0)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valueTemp,
            //data: ['5','10','15','20','25'],  
            spanGaps: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                max: 40,
                min: 0
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


      temp.lineChart2 = new Chart(temp.lineCanvas2.nativeElement, {
        type: 'line',
        data: {
          labels: temp.timeStamp,
          //labels: ['Jan','Feb','Mar','Aprl','May'],
          datasets: [{
            label: "Salinity",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(255,255,255,0.2)",
            //borderColor: "rgba(75,192,192,1)",
            borderColor: "rgb(0,0,0)",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(0,0,0)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valueSal,
            //data: ['55','60','65','70','75'],
            spanGaps: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                max: 50,
                min: 0
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



      temp.lineChart3 = new Chart(temp.lineCanvas3.nativeElement, {
        type: 'line',
        data: {
          labels: temp.timeStamp,
          //labels: ['Jan','Feb','Mar','Aprl','May'],
          datasets: [{
            label: "Acidity",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(255,255,255,0.2)",
            borderColor: "rgb(0,0,0)",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(0,0,0)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: temp.valuePh,
            //data: ['2','4','6','8','10'],
            spanGaps: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                max: 15,
                min: 0
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
    
      temp.lineChart.update();
      temp.lineChart2.update();
      temp.lineChart3.update();
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



