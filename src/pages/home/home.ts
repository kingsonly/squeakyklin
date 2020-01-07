import { Component } from '@angular/core';
import { NavController , IonicPage } from 'ionic-angular';
import { ClasshttpService} from '../../providers/classhttp-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  slides = [
    {
      image: "assets/imgs/banner.png",
      title: "Flat 50% off on <br>First Order",
    },
    {
      image: "assets/imgs/banner.png",
      title: "Flat 50% off on <br>First Order",
    },
    {
      image: "assets/imgs/banner.png",
      title: "Flat 50% off on <br>First Order",
    }
  ];

  services = [
    {
      image: "assets/imgs/washing.png",
      title: "Wash & Fold",
      small: "Min 12 Hours",
    },
    {
      image: "assets/imgs/iron.png",
      title: "Wash & Iorn",
      small: "Min 6 Hours",
    },
    {
      image: "assets/imgs/dryclean.png",
      title: "Dry Clean",
      small: "Min 24 Hours",
    }
  ];
  plan = [];

  constructor(public navCtrl: NavController, public api: ClasshttpService) {

  }

  ionViewDidLoad(){
      let that = this;
      this.api.getAll('plan?').subscribe(data => {
          if (data.status == 1) {
              that.plan = data.data
              console.log(that.plan)
          } else {
              console.log(data)
          }
      },
      error => {
	  	//console.log(error)
          alert(error)
      });

  }
  logo(string){
      return 'https://api.squeakyklin.com/'+string
  }
  selectplan(planid){
    this.navCtrl.push("PlanPage",{id:planid})
  }



}
