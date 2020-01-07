import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading , IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

//import { TabsPage } from '../tabs/tabs';
//import { PasswordPage } from '../password/password';
//import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

    loading: Loading;
    registerCredentials = { username: '', password: '' };

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
        let currentUser = JSON.parse(localStorage.getItem('accesstoken'));
        if(currentUser !== null){
            nav.setRoot("TabsPage");
        }

    }

    public login() {
        let that = this;
        this.showLoading()
        this.auth.login(this.registerCredentials).subscribe(data => {
            if (data.status == 1) {
                that.auth.accesstoken().subscribe(token => {
                    if (token.status == 1) {
                        that.nav.setRoot("TabsPage");
                    }
                })

            } else {
			this.showError(data.errors.password[0]);
            }
        },
        error => {
            this.showError('Poor internet');
        });
    }

    showLoading() {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      this.loading.present();
    }

    showError(text) {
      this.loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Fail',
        subTitle: text,
        buttons: ['OK']
      });
     // alert.present(prompt);
    }

  password(){
        this.nav.push("PasswordPage");
    }
  signup(){
      this.nav.push("SignupPage");
    }
}
