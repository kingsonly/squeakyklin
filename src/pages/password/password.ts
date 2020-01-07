import { Component } from '@angular/core';
import { NavController , IonicPage } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
export class PasswordPage {

  constructor(public navCtrl: NavController) {

  }
  
   otp(){
        this.navCtrl.push("OtpPage")
  }

}
