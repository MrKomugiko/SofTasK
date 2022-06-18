import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { MemberType } from './project-service.service';
import { SoftaskAPI } from './softask-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string;
  private currentUserSource = new Subject<string>();

  currentUser$ = this.currentUserSource.asObservable();

  loggedUserdata: ILoginResponse | null = null


  constructor(private http: HttpClient) {
    //private baseUrl: string = '';
    if (environment.production) {
      // for production
      this.baseUrl = 'https://softask-api.herokuapp.com/api/';
      console.log(this.baseUrl);
    } else {
      // for development
      this.baseUrl = 'https://localhost:7054/api/';
      console.log(this.baseUrl);
    }
  }
  get isUserLogin(): boolean {

    const userObj = localStorage.getItem("userInfo");
    if (userObj == null)
      return false;

    const userInfo: ILoginResponse = JSON.parse(userObj);

    if (userInfo.token == null)
      return false;

    if (this.isExpired(userInfo.expiration)) {
      return false;
    }

    return true;
  }
  updateLoggedUser(username: string) {
    // console.log('next ' + username);
    this.currentUserSource.next(username);
  }
  registerUserRoles(token: string) {
    const rolestring = token.split(".")[1];
    const data = atob(rolestring);
    localStorage.setItem("userRoles", JSON.parse(data)["privileges"]);
    console.log("registered privileges: ");
    console.log(JSON.parse(JSON.parse(data)["privileges"]));
  }

  UserRolesArray:IRoles[] = [];

  GetUserRolesData(): IRoles[] {
    if(this.UserRolesArray.length == 0)
    {
      //cache from localstorage
      console.log("GetUserRolesData: ");
      let data = localStorage.getItem("userRoles");
      if (data != null) {
        this.UserRolesArray = JSON.parse(data);
      }
    }

    return this.UserRolesArray;
  }
  getUserToken(): string | null {
    let token = null;

    const obj = localStorage.getItem("userInfo");
    if (obj != null) {
      const userInfo: ILoginResponse = JSON.parse(obj);
      token = userInfo.token;
    }

    return token;
  }
  login(data: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.baseUrl + 'Authenticate/login', data);
  }
  logout(): void {
    localStorage.removeItem("userInfo");
    console.log("user logged off");
    this.UserRolesArray = [];
  }
  register(data: IRegisterRequest) {
    return this.http.post(this.baseUrl + 'Authenticate/register', data);
  }
  private isExpired(date: Date): boolean {
    const expirationDate: Date = new Date(Date.parse(date.toString()));
    if (expirationDate < new Date()) {
      // console.log("token time expired");
      this.logout();
      return true;
    }
    return false;
  }
}




export interface IRegisterRequest {
  email: string,
  username: string,
  password: string,
  confirmpassword: string
}
export interface ILoginResponse {
  user: string,
  token: string,
  expiration: Date
}
export interface ILoginRequest {
  username: string,
  password: string
}
export interface IRoles {
  Id: number,
  ProjectName: string,
  Role: MemberType[]
}


