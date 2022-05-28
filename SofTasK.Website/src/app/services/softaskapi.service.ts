import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SoftaskAPI {

  //private baseUrl:string = 'https://localhost:7054/api/';
  private baseUrl:string = 'https://softask-api.herokuapp.com/api/';



  constructor(private http: HttpClient) {
  }


  getAllProjects(): Observable<IProject[]> {
    const obj = localStorage.getItem("userInfo");
    if(obj != null)
    {
     const userInfo : ILoginResponse = JSON.parse(obj);
     console.log(userInfo.token);

     const headers = new HttpHeaders({
       'Authorization':`Bearer ${ userInfo?.token }`
      });
      return this.http.get<IProject[]>(this.baseUrl+'Projects', {headers:headers})
    }

    return this.http.get<IProject[]>(this.baseUrl+'Projects');
  }

  public login(data:ILoginRequest):Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.baseUrl+'Authenticate/login',data);
  }

  public logout() : void
  {
    localStorage.removeItem("userInfo");
    console.log("user logged off");
  }

  public register(data:IRegisterRequest) {
    return this.http.post(this.baseUrl+'Authenticate/register',data);
  }
}


export interface IRegisterRequest {
  email:string,
  username:string,
  password:string,
  confirmpassword:string
}

export interface ILoginResponse {
  token:string,
  expiration : Date
}
export interface ILoginRequest {
  username:string,
  password:string
}
export interface IProject {
  id: number,
  name: string,
  description: string,
  ownerId: string,
  owner: {
    id: string;
    userName: string;
    email: string;
  },
  collaborators: [{
    id: string;
    userName: string;
    email: string;
  }]
}
