import { Component, ViewChild } from '@angular/core';
import { NavController, Slides ,IonicPage } from 'ionic-angular';
import { IonWalkthroughOptions } from '../../components/ion-walkthrough';
//import { SignupPage } from '../signup/signup';
//import { SigninPage } from '../signin/signin';
//import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-walk',
  templateUrl: 'walk.html'
})
export class Walk {
  @ViewChild('mySlider') slider: Slides;
  slides: Array<IonWalkthroughOptions>;
  mySlideOptions: any;

  constructor(public navCtrl: NavController) {
      let currentUser = localStorage.getItem('accesstoken');

      if(currentUser !== null){
          navCtrl.setRoot("TabsPage");
      }

    // customize your ionic slider if needed
    // https://ionicframework.com/docs/v2/api/components/slides/Slides/
    this.mySlideOptions = {};

    // let's use the same buttons on each slide.
    // you can define your different button per slide if you want to
    let _this = this; // keeping a reference so we can access `this.slider` from our onClick function
    let buttons = {
      left: {
        text: 'Login',
        textColor: '#fff',
        onClick: function() {
            navCtrl.push("SigninPage");
        }
      },
      center: {
        text: 'Free Registeration',
        textColor: '#fff',
        onClick: function() {
          navCtrl.push("SignupPage");
        }
      },
      right: {
        text: 'Next',
        textColor: '#fff',
        onClick: function() {
          _this.slider.slideNext(); //using the ionic slider to go to the next slide
        }
    },

    }

    this.slides = [
      {
        title: 'Welcome to Ionic Walkthrough!',
        description: '<b>Ionic Walkthrough</b> is an Ionic component to quickly onboard new users. Simply specify a title, a text and an image for each slide.',
        image: './assets/screenshots/ios_1.png',
        styles: {
          background: 'linear-gradient(to right, #347eff 0%, #1ea3ff 100%)',
          titleColor: '#fff',
          descriptionColor: '#fff'
        },
        layout: {
          position: 'bottom', //top, bottom
          deviceType: 'iphone', //iphone, android
          deviceColor: 'silver' //iphone: silver, spacegrey, gold   android: white, black
        },
        buttons: buttons
      },
      {
        title: 'Top Layout?',
        description: ' <button ion-button block class="auth-action-button login-button" type="submit" (click)="alert(123)">Log in</button>',
        image: './assets/screenshots/ios_2.png',
        styles: {
          background: 'linear-gradient(to right, #FF9800 0%, rgb(236, 156, 37) 100%)',
          titleColor: '#fff',
          descriptionColor: '#fff'
        },
        layout: {
          position: 'top',
          deviceType: 'iphone',
          deviceColor: 'spacegrey'
        },
        buttons: buttons
      },
      {
        title: 'Android Users?',
        description: 'The <b>Ionic Walkthrough</b> component comes with an Android device as well as an iPhone device.',
        image: './assets/screenshots/android_1.png',
        styles: {
          background: 'linear-gradient(to right, #4CAF50 0%, #4cc351 100%)',
          titleColor: '#fff',
          descriptionColor: '#fff'
        },
        layout: {
          position: 'bottom'
        },
        buttons: buttons
      },
      {
        title: 'Colors!',
        description: 'You can choose between several phone colors. Space grey, silver or gold for iPhone. Black or white for Android.',
        image: './assets/screenshots/android_2.png',
        styles: {
          background: 'linear-gradient(to right, #9C27B0 0%, #bc22d6 100%)',
          titleColor: '#fff',
          descriptionColor: '#fff'
        },
        layout: {
          position: 'top',
          deviceColor: 'white',
          deviceType: 'android'
        },
        buttons: buttons
      },
      {
        title: 'Custom Buttons!',
        description: 'Customize the content and style of the buttons. You are in charge of implementing the onClick function. You can also hide the buttons.',
        image: './assets/screenshots/ios_2.png',
        styles: {
          background: 'linear-gradient(to right, #FF9800 0%, rgb(236, 156, 37) 100%)',
          titleColor: '#fff',
          descriptionColor: '#fff'
        },
        layout: {
          deviceType: 'iphone',
          deviceColor: 'spacegrey'
        },
        buttons: { //hiding the left button by not specifying it. That simple.
          right: {
            text: 'CONTINUE',
            textColor: '#673ab7',
            onClick: function() {
              _this.slider.slideNext(); //using the ionic slider to go to the next slide
            }
          }
        }
      },
      {
        title: 'Customization',
        description: 'You can also customize the background color as well as the text color to match your app.',
        image: './assets/screenshots/ios_1.png',
        styles: {
          background: 'linear-gradient(to right, #347eff 0%, #1ea3ff 100%)',
          titleColor: 'rgba(0, 0, 0, 0.5)',
          descriptionColor: '#e0e0e0'
        },
        layout: {
          deviceColor: 'gold',
          deviceType: 'iphone'
        } //no button on last slide
      }
    ];
  }

}
