import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthService } from '../providers/auth-service';

@Injectable()
export class AllValidator {

 debouncer: any;

 constructor(public authProvider: AuthService){

 }

 public checkUsername(control: FormControl): any {
   clearTimeout(this.debouncer);
  let username = JSON.stringify({username:control.value.toLowerCase()});

   return new Promise(resolve => {

     this.debouncer = setTimeout(() => {

       this.authProvider.checkUsername(username).subscribe((res) => {
         if(res.status === 1){
             if(res.data[0] == true){
                 resolve({'usernameInUse': true});
             }else{
                 resolve(null);
             }

         }
       }, (err) => {
         resolve({'usernameInUse': true});
       });

     }, 1000);

   });
 }




 public checkRef(control: FormControl): any {
   clearTimeout(this.debouncer);
  let username = JSON.stringify({username:control.value.toLowerCase()});

   return new Promise(resolve => {

     this.debouncer = setTimeout(() => {

       this.authProvider.checkRef(username).subscribe((res) => {

         if(res.status === 1){
             if(res.data[0] == true){
                 resolve(null);

             }else{
                 resolve({'refInUse': true});
             }

         }
       }, (err) => {
         resolve({'refInUse': true});
       });

     }, 1000);

   });
 }
 public checkEmail(control: FormControl): any {
   clearTimeout(this.debouncer);
  let email = JSON.stringify({email:control.value.toLowerCase()});

   return new Promise(resolve => {

     this.debouncer = setTimeout(() => {

       this.authProvider.checkEmail(email).subscribe((res) => {
         if(res.status === 1){
             if(res.data[0] == true){
                 resolve({'emailInUse': true});
             }else{
                 resolve(null);
             }

         }
       }, (err) => {
         resolve({'emailInUse': true});
       });

     }, 1000);

   });
 }
 public checkPhonenumber(control: FormControl): any {
   clearTimeout(this.debouncer);
  let number = JSON.stringify({number:control.value.toLowerCase()});

   return new Promise(resolve => {

     this.debouncer = setTimeout(() => {

       this.authProvider.checkPhonenumber(number).subscribe((res) => {
         if(res.status === 1){
             if(res.data[0] == true){
                 resolve({'numberInUse': true});
             }else{
                 resolve(null);
             }

         }
       }, (err) => {
         resolve({'numberInUse': true});
       });

     }, 1000);

   });
 }

}
