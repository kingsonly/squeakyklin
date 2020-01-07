import { Component, ViewChild  } from '@angular/core';
import { NavController, AlertController, ViewController,  Platform,  NavParams,IonicPage  } from 'ionic-angular';
//import { ThankyouPage } from '../thankyou/thankyou';

//import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
//import { InAppBrowser } from 'ionic-native';
import { Rave, RavePayment, Misc } from 'rave-ionic3';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-paystack',
  templateUrl: 'paystack.html'
})







export class PaystackPage {
  @ViewChild("email_add") email_add;
  @ViewChild("card_number") card_number;
	@ViewChild("expiryMonth") expiryMonth;
	@ViewChild("expiryYear") expiryYear;
	@ViewChild("cvc") cvc;

customerEmail:any;
price:any;
chargeAmount:any;
cardNumberValue: any;
expiryMonthValue: any;
expiryYearValue: any;
cvcValue: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,   public loading: LoadingController,  public platform: Platform, public viewCtrl: ViewController , private rave: Rave, 
  private ravePayment: RavePayment, 
  private misc: Misc,
  private iab: InAppBrowser,) {

  }


ngOnInit(){
this.price= this.navParams.get('price');
this.chargeAmount = this.price*100;
}


  ChargeCard(){
  this.rave.init(true, "FLWPUBK_TEST-19173cd60425158150aaeb4d3695c593-X")
      .then(_ => {
        var paymentObject = this.ravePayment.create({
          customer_email: "user@example.com",
          amount: 2000,
          customer_phone: "234099940409",
          currency: "NGN",
          txref: "rave-123456",
          meta: [{
              metaname: "flightID",
              metavalue: "AP1234"
          }]
      })
        this.rave.preRender(paymentObject)
          .then(secure_link => {
            secure_link = secure_link +" ";
            const browser: InAppBrowserObject = this.rave.render(secure_link, this.iab);
            browser.on("loadstop")
                .subscribe((event: InAppBrowserEvent) => {
                  if(event.url.indexOf('https://your-redirect-url') != -1) {
                    if(this.rave.paymentStatus(event.url) == 'failed') {
                      this.alertCtrl.create({
                        title: "Message",
                        message: "Oops! Transaction failed"
                      }).present();
                    }else {
                      this.alertCtrl.create({
                        title: "Message",
                        message: "Transaction successful"
                      }).present();
                    }
                    browser.close()
                  }
                })
          }).catch(error => {
            // Error or invalid paymentObject passed in
          })
      })
 }



whatsPaystack(){

this.platform.ready().then(() => {
      //       let browser = new InAppBrowser("https://paystack.com/what-is-paystack",'_blank');

         });

}

close(){
  this.viewCtrl.dismiss();
}
}
