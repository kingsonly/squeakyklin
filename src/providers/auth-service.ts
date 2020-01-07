import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
//import {cors} from 'flask_restful.utils ';
//import {Api} from 'flask_restful';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';





export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser : User;
  data:any;
  newData:any;
  regData:any;
  http;
  constructor(http: Http ) {

    this.data = {};
    this.regData = {};
    this.newData = {};
    this.http = http;
  }

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {



      //var link = 'https://localhost/squickyklin/api/web/site/authorize';
      var link = 'http://api.squeakyklin.com/site/authorize';
      var userData = JSON.stringify({username: credentials.username, password:credentials.password});
      return this.http.post(link,userData)
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          this.data = response.json();
          if (this.data.status == 1) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('authorize', JSON.stringify(this.data));
            let currentUser = JSON.parse(localStorage.getItem('authorize'));
            //this.currentUser = new User(currentUser.data.username, currentUser.data.token);
            this.currentUser = currentUser;
            return this.data;
        }else{
            return this.data;
        }
        });

    }
  }



  public accesstoken() {
     // var link = 'https://localhost/squickyklin/api/web/site/accesstoken';
      var link = 'http://api.squeakyklin.com/site/accesstoken';
      let currentUser = JSON.parse(localStorage.getItem('authorize'));
      var userData = JSON.stringify({authorization_code: currentUser.data.authorization_code});
      return this.http.post(link,userData)
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          this.newData = response.json();
          if (this.newData.status == 1) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('accesstoken', JSON.stringify(this.newData.data.access_token));
            return this.newData;
        }else{
            return this.newData;
        }
        });
  }

  public register(credentials) {
      let that = this;
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      var link = 'http://api.squeakyklin.com/site/register';
      //var link = 'https://localhost/squickyklin/api/web/site/register';
      var userData = JSON.stringify({username: credentials.username,number: credentials.phonenumber,email: credentials.email,password: credentials.password,ref: credentials.ref});
      return this.http.post(link,userData)
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          that.regData = response.json();
          if (that.regData.status === 1) {
              return true;
            }else{
                return that.regData.status;
            }
        });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
      var link = 'http://api.squeakyklin.com/site/logout';
     // var link = 'https://localhost/squickyklin/api/web/site/logout';
      var currentUser = JSON.parse(localStorage.getItem('accesstoken'));
      var headers = new Headers();
      headers.append("x-access-token", currentUser);
      const requestOptions = new RequestOptions({ headers: headers });
      return this.http.get(link,requestOptions)
        .map((response: Response) => {
          // logout successfully if status is == 1
          this.newData = response.json();
          if (this.newData.status == 1) {
            // delete accesstoken from localStorage
            localStorage.removeItem('accesstoken');
            localStorage.removeItem('authorize');
            return this.newData;
        }else{
            return this.newData;
        }
        });
  }

  public checkUsername(username){
    let link = 'http://api.squeakyklin.com/site/username-validator';
    //let link = 'https://localhost/squickyklin/api/web/site/username-validator';
    return this.http.post(link,username)
      .map(res => res.json());
  }

  public checkPhonenumber(number){
    let link = 'http://api.squeakyklin.com/site/number-validator';
    //let link = 'https://localhost/squickyklin/api/web/site/number-validator';
    return this.http.post(link,number)
      .map(res => res.json());
  }

  public checkEmail(email){
    let link = 'http://api.squeakyklin.com/site/email-validator';
    //let link = 'https://localhost/squickyklin/api/web/site/email-validator';
    return this.http.post(link,email)
      .map(res => res.json());
  }

  public checkRef(ref){
    let link = 'http://api.squeakyklin.com/site/ref-username-validator';
    //let link = 'https://localhost/squickyklin/api/web/site/ref-username-validator';
    return this.http.post(link,ref)
      .map(res => res.json());
  }

}
