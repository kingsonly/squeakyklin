import { Component } from '@angular/core';
import { NavController, NavParams , IonicPage} from 'ionic-angular';

import { ClasshttpService} from '../../providers/classhttp-service';



@IonicPage()
@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html'
})
export class PlanPage {


  plan = [];
  id:any;

  constructor(public navCtrl: NavController, public api: ClasshttpService,public navParams : NavParams
  ) {
      this.id = navParams.get('id')
  }

  ionViewDidLoad(){

      let that = this;
      this.api.getById('plan/get-plan-details?id=',this.id+'&').subscribe(data => {
          if (data.status == 1) {
              that.plan = data.data

          } else {
              console.log(data)
          }
      },
      error => {
          alert(10101010)
      });

  }

  logo(string){
      return 'https://api.squeakyklin.com/'+string
  }

  paystack(){
      this.navCtrl.push("PaystackPage")
  }
}
