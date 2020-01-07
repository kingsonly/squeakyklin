import { Component } from '@angular/core';

import { NavController , IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = "HomePage";
  tab2Root = "NotificationPage";
  tab3Root = "OffersPage";
  tab4Root = "AccountPage";

  constructor() {

  }
}
