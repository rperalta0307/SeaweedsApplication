import { Component,  Injectable, ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chart } from 'chart.js';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';

Chart.defaults.global.defaultFontColor = 'black'

@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})

@Injectable()
export class ReportPage {
  
  result = []
  dates = []
  timeStamp = []
  valueTemp = []
  valueHum = []
  valuePh = []
  valueWtrlvl = []
  valueenvi = []
  Temperatures = []
  humidity = ""
  temperature = ""
  acidity = ""
  Wtrlvl = ""
  envi = ""
  sensor_envi=""
  sensor_humidity = ""
  sensor_temperature = ""
  sensor_acidity = ""
  sensor_Wtrlvl = ""
  cropName1 = ""
  cropName2 = ""
  cropName3 = ""
  fishName = ""
  AgeOfFish = ""
  NumberOfFish = ""
  
  MorningTemp = ""
  MorningPH = ""
  MorningWtrlvl = ""
  MorningHumidity = ""
  MorningEnvi = ""
  MorningTime = ""
  MorningDate = ""
  MorningCompleteDate = ""
  
  AftTemp = ""
  AftPH = ""
  AftWtrlvl = ""
  AftHumidity = ""
  AftEnvi = ""
  AftTime = ""
  AftDate = ""
  AftCompleteDate = ""


  EveCompleteDate = ""
  EveTemp = ""
  EvePH = ""
  EveWtrlvl = ""
  EveHumidity = ""
  EveEnvi = ""
  EveTime = ""
  EveDate = ""

  DawnTemp = ""
  DawnPH = ""
  DawnWtrlvl = ""
  DawnHumidity = ""
  DawnEnvi = ""
  DawnTime = ""
  DawnDate = ""
  DawnCompleteDate = ""

  //Cooler_Status = ""
 // Cooler_Status_2 = ""
  phDown_Status = ""
  phUp_Status = ""

 // ToggleCooler: boolean;
 // ToggleCooler2: boolean;
  TogglePhUp: boolean;
  TogglePhDown: boolean;

  highest_acidity = ""
  lowest_acidity = ""
  highest_humidity = ""
  lowest_humidity = ""
  highest_temperature = ""
  lowest_temperature = ""
  highest_Wtrlvl = ""
  lowest_Wtrlvl = ""



  

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  @ViewChild('lineCanvas3') lineCanvas3;
  @ViewChild('lineCanvas4') lineCanvas4;
  @ViewChild('lineCanvas5') lineCanvas5;

  
  lineChart: any;
  lineChart2: any;
  lineChart3: any;
  lineChart4: any;
  lineChart5: any;

  arrData: any;
  arrName: any;
  arrStatus: any;
  arrFish: any;
  arrFish1: any;
  arrFish2: any;
  arrMorning: any;
  arrAfternoon: any;
  arrEvening: any;
  arrDawn: any;

 
  constructor(public navCtrl: NavController, public firebaseDb: AngularFireDatabase, public alertCtrl: AlertController, public authProvider: AuthProvider){
    // this.temp_Statusbtn = true;
    // this.phUp_Statusbtn = true;
    // this.phDown_Statusbtn = false;
   // this.ToggleCooler = false;
    //this.ToggleCooler2 = false;
    this.TogglePhUp = false;
    this.TogglePhDown = false;

    this.firebaseDb.list('/Sensor_Data').valueChanges().subscribe(snapshots=>{
    this.arrData = snapshots;
  
    this.sensor_envi = this.arrData[0];
    this.sensor_humidity = this.arrData[1];
    this.sensor_acidity = this.arrData[2];
    this.sensor_temperature = this.arrData[3];
    this.sensor_Wtrlvl = this.arrData[4];
    this.humidity = this.arrData[5];
    this.highest_humidity = this.arrData[6];
    this.lowest_humidity = this.arrData[7];
    this.acidity = this.arrData[8];
    this.highest_acidity = this.arrData[9];
    this.lowest_acidity = this.arrData[10];
    this.temperature = this.arrData[11];
    this.highest_temperature = this.arrData[12];
    this.lowest_temperature = this.arrData[13];
    this.Wtrlvl = this.arrData[14];
    this.highest_Wtrlvl = this.arrData[15];
    this.lowest_Wtrlvl = this.arrData[16];
    });
    
    this.firebaseDb.list('/Crop_Data/Crop_Name').valueChanges().subscribe(snapshots=>{
      this.arrName = snapshots;
      this.cropName1 = this.arrName[0];
      this.cropName2 = this.arrName[1];
      this.cropName3 = this.arrName[2];

  
    });
    this.firebaseDb.list('/Fish_Data/Fish_Name').valueChanges().subscribe(snapshots=>{
      this.arrFish = snapshots;
      this.fishName = this.arrFish[0];

      

    });
    this.firebaseDb.list('/Fish_Data/Fish_AgeOfFish').valueChanges().subscribe(snapshots=>{
      this.arrFish1 = snapshots;
      this.AgeOfFish = this.arrFish1[0];
      
      

    });
    this.firebaseDb.list('/Fish_Data/NumberOfFish').valueChanges().subscribe(snapshots=>{
      this.arrFish2 = snapshots;
      this.NumberOfFish = this.arrFish2[0];
      
      

    });

    this.firebaseDb.list('/Afternoon_Data').valueChanges().subscribe(snapshots=>{
      this.arrAfternoon = snapshots;
      this.AftCompleteDate = this.arrAfternoon[0];
      this.AftDate = this.arrAfternoon[1];
      this.AftEnvi = this.arrAfternoon[2];
      this.AftHumidity = this.arrAfternoon[3];
      this.AftPH = this.arrAfternoon[4];
      this.AftTemp = this.arrAfternoon[5];
      this.AftWtrlvl = this.arrAfternoon[6];
      this.AftTime = this.arrAfternoon[7];
      
      

    });

    this.firebaseDb.list('/Morning_Data').valueChanges().subscribe(snapshots=>{
      this.arrMorning = snapshots;
      this.MorningCompleteDate = this.arrMorning[0];
      this.MorningDate = this.arrMorning[1];
      this.MorningEnvi = this.arrMorning[2];
      this.MorningHumidity = this.arrMorning[3];
      this.MorningPH = this.arrMorning[4];
      this.MorningTemp = this.arrMorning[5];
      this.MorningWtrlvl = this.arrMorning[6];
      this.MorningTime = this.arrMorning[7];
      
      

    });

    this.firebaseDb.list('/Evening_Data').valueChanges().subscribe(snapshots=>{
      this.arrEvening = snapshots;
      this.EveCompleteDate = this.arrEvening[0];
      this.EveDate = this.arrEvening[1];
      this.EveEnvi = this.arrEvening[2];
      this.EveHumidity = this.arrEvening[3];
      this.EvePH = this.arrEvening[4];
      this.EveTemp = this.arrEvening[5];
      this.EveWtrlvl = this.arrEvening[6];
      this.EveTime = this.arrEvening[7];
      
      

    });

     this.firebaseDb.list('/Dawn_Data').valueChanges().subscribe(snapshots=>{
      this.arrDawn = snapshots;
      this.AftCompleteDate = this.arrDawn[0];
      this.DawnDate = this.arrDawn[1];
      this.DawnEnvi = this.arrDawn[2];
      this.DawnHumidity = this.arrDawn[3];
      this.DawnPH = this.arrDawn[4];
      this.DawnTemp = this.arrDawn[5];
      this.DawnWtrlvl = this.arrDawn[6];
      this.DawnTime = this.arrDawn[7];
      
      

    });








    this.firebaseDb.list('/Actuator_Status/Monitor').valueChanges().subscribe(snapshots=>{
      this.arrStatus = snapshots;
     // this.ToggleCooler= this.arrStatus[0];
     // this.ToggleCooler2 = this.arrStatus[1];
      this.TogglePhDown = this.arrStatus[4];
      this.TogglePhUp = this.arrStatus[5];

      
    });
    

    
    var datem = "";
    var year = "";
    var month = "";
    var day = "";
    this.firebaseDb.list('Realtime_Data', ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val()}));
    }).subscribe(dates => {
      dates.map(date => {
        year = date.key;
        console.log(year);
        this.firebaseDb.list('Realtime_Data/'+year, ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
          return actions.map(action => ({ key: action.key, ...action.payload.val()}));
        }).subscribe(dates => {
          dates.map(date => {
            month = date.key;
            console.log(month);
            this.firebaseDb.list('Realtime_Data/'+year+'/'+month, ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
              return actions.map(action => ({ key: action.key, ...action.payload.val()}));
            }).subscribe(dates => {
              dates.map(date => {
                day = date.key;
                console.log(day);
                this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day, ref => ref.limitToLast(1)).snapshotChanges().map(actions =>{
                  return actions.map(action => ({ key: action.key, ...action.payload.val()}));
                }).subscribe(dates => {
                  dates.map(date => {
                    datem = date.key;
                    console.log(datem);

                    
                    this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(1)).valueChanges().subscribe(snapshots=>{
                      this.dates = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.dates.push(key.Date_Complete);
                      });
                    });
                    this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valueTemp = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valueTemp.push(key.Measured_Temp_C);
                        this.timeStamp.push(key.Time);
                      });
                    });
                    this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valueHum = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valueHum.push(key.Measured_Humidity);
                        this.timeStamp.push(key.Time);
                      });
                    });
                    this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valuePh = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valuePh.push(key.Measured_PHLevel);
                        this.timeStamp.push(key.Time);
                      });
                    });
                    this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valueWtrlvl = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valueWtrlvl.push(key.Measured_Waterlvl);
                        this.timeStamp.push(key.Time);
                      });
                    });
                    this.firebaseDb.list('Realtime_Data/'+year+'/'+month+'/'+day+'/'+datem, ref => ref.limitToLast(5)).valueChanges().subscribe(snapshots=>{
                      this.valueenvi = [];
                      this.timeStamp = [];
                      this.result = snapshots;
                      this.result.map(key => {
                        this.valueenvi.push(key.Measured_Environment);
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

    /*this.firebaseDb.list('Realtime_Data', ref => ref.limitToLast(12)).valueChanges().subscribe(snapshots=>{
      this.valueTemp = [];
      this.valueHum = [];
      this.valuePh = [];
      this.valueWtrlvl = [];
      this.valueenvi = [];
      this.result = snapshots;
      this.result.map(key => {
        this.valueTemp.push(key.Measured_Temp_C);
        this.valueHum.push(key.Measured_Humidity);
        this.valuePh.push(key.Measured_PHLevel);
        this.valueEnvi.push(key.Measured_Environment);
        this.valueWtrlvl.push(key.Measured_Waterlvl);
      });
    });*/


    

    /*this.firebaseDb.list("/Crop_Data/Crop_Name", { preserveSnapshot: true})
    .subscribe(snapshots=>{
      snapshots.forEach(snapshot => {
        if(snapshot.key=="Optimal_Humidity"){
          this.humidity = snapshot.val();
        }
      });
    });*/
    //console.log(this.timeStamp);
    //console.log(this.result);
    console.log(this.valueTemp);
    console.log(this.valueHum);
    console.log(this.valuePh);
    console.log(this.valueWtrlvl);
    console.log(this.valueenvi)
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


      temp.lineChart2 = new Chart(temp.lineCanvas2.nativeElement, {
        type: 'line',
        data: {
          labels: temp.timeStamp,
          //labels: ['Jan','Feb','Mar','Aprl','May'],
          datasets: [{
            label: "Humidity",
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
            data: temp.valueHum,
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
                max: 100,
                min: 50
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
      temp.lineChart5 = new Chart(temp.lineCanvas5.nativeElement, {
        type: 'line',
        data: {
          labels: temp.timeStamp,
          //labels: ['Jan','Feb','Mar','Aprl','May'],
          datasets: [{
            label: "Greenhouse Temperature",
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
            data: temp.valueenvi,
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
                max: 60,
                min: 10
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

      temp.lineChart4 = new Chart(temp.lineCanvas4.nativeElement, {
        type: 'line',
        data: {
          //labels: ['Jan','Feb','Mar','Aprl','May'],
          labels: temp.timeStamp,
          datasets: [{
            label: "Water Level",
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
            data: temp.valueWtrlvl,
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
                max: 30,
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
      temp.lineChart4.update();
      temp.lineChart5.update();
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