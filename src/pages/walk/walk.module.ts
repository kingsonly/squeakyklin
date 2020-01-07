import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Walk } from './walk';
import { IonWalkthrough } from '../../components/ion-walkthrough';

@NgModule({
  declarations: [
    Walk,
	IonWalkthrough,
  ],
  imports: [
    IonicPageModule.forChild(Walk),
  ],
})
export class WalkPageModule {}
