import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';



@Injectable()
export class ClasshttpService {
  link:string = 'https://api.squeakyklin.com/';
  //link:string = 'http://localhost/squickyklin/api/web/';
  constructor(private http: Http) { }

  getAll(url:string) {
    return this.http.get(this.link+url+this.jwt()).map((response: Response) => response.json());
  }

  getById(url:string,id:any) {
    return this.http.get(this.link+url+id+this.jwt()).map((response: Response) => response.json());
  }

  create(url:string,data:any) {
    return this.http.post(this.link+url+this.jwt(), data).map((response: Response) => response.json());
  }

  update(url:string,data:any) {
    return this.http.put(this.link+url+this.jwt(), data).map((response: Response) => response.json());
  }

  delete(url:string) {
    return this.http.delete(this.link+url+this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    var currentUser = JSON.parse(localStorage.getItem('accesstoken'));
    //var headers = new Headers();
    //headers.append("x-access-token", currentUser);
	//headers.append('Access-Control-Allow-Origin','*');
	//headers.append('Content-Type', 'application/x-www-form-urlencoded');
	//headers.append('Cache-Control', 'no-cache');
    return "access_token="+currentUser;

  }
}
