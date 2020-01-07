import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading , IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AllValidator } from '../../providers/allvalidators';


import { FormGroup, Validators, AbstractControl, FormBuilder} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

    loading: Loading;
    validators:any;
    registerCredentials = { username: '', password: '' };
    public changePasswordForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private klinValidators:AllValidator ) {

    }

    ngOnInit() {
        this.buildForm();
        //this.formControlValueChanged();
    }

    public register() {
        let that = this;
        //this.showLoading()
        //localStorage.setItem('accesstokenkkk', JSON.stringify(this.changePasswordForm));

        this.auth.register(that.changePasswordForm.value).subscribe(data => {
            if (data == true) {
                    // go to login page
                    that.showSuccess('Your account has been created')
                    that.nav.push("SigninPage")
            } else {
                that.showError(data);
                //this.showError(data.errors.password[0]);
            }
        },
        error => {
            this.showError('Poor internet');
        });
    }

    public buildForm(): void {
     this.changePasswordForm = this.formBuilder.group({
        username: [
          "",
          Validators.compose([
            Validators.required
        ]),
        this.klinValidators.checkUsername.bind(this.klinValidators)

        ],

        phonenumber: [
          "",
          Validators.compose([
            Validators.required
        ]),
        this.klinValidators.checkPhonenumber.bind(this.klinValidators)
        ],

        email: [
          "",
          Validators.compose([
            Validators.required
        ]),
        this.klinValidators.checkEmail.bind(this.klinValidators)
        ],

        ref: [
            ""
        ],

        haveref: [
          "no"
        ],

        password: [
          "",
          Validators.compose([
            Validators.minLength(6),
            Validators.required
          ])
        ],
        confirmPassword: [
          "",
          Validators.compose([
            Validators.minLength(6),
            Validators.required
          ])
        ],
      }, {
        validator: this.MatchPassword // Inject the provider method
      });
    }

    private MatchPassword(AC: AbstractControl) {
         const newPassword = AC.get('password').value // to get value in input tag
         const confirmPassword = AC.get('confirmPassword').value // to get value in input tag
          if(newPassword != confirmPassword) {
              console.log('false');
              AC.get('confirmPassword').setErrors( { MatchPassword: true } )
          } else {
              console.log('true')
              AC.get('confirmPassword').setErrors(null);
          }
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
      //alert.present(prompt);
    }

    showSuccess(text) {
      this.loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: text,
        buttons: ['OK']
      });
      //alert.present(prompt);
    }

    formControlValueChanged() {

    const refControl = this.changePasswordForm.get('ref');
    const haveRefControl = this.changePasswordForm.get('haveref');
    let that = this;

    haveRefControl.valueChanges.subscribe(

        (mode: string) => {

            console.log(mode);
            if (mode === 'yes') {

                refControl.setValidators([this.klinValidators.checkRef.bind(this.klinValidators)]);

            }

            if(mode === 'no'){

                refControl.clearValidators();

            }

            refControl.updateValueAndValidity();

        });

}

}
