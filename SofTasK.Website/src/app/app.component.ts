import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ILoginResponse, SoftaskAPI } from './services/softaskapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SofTasK.Website';

  constructor(private authservice:AuthService){

  }

  get isUserLogin():boolean { return this.authservice.isUserLogin; }


}

@Injectable()
export class AlwaysAuthGuard implements CanActivate {
  canActivate() : boolean {
    console.log("AlwaysAuthGuard");
    return true;
    }
  }
@Injectable()
export class OnlyWhenUserNotLogged implements CanActivate {
  constructor(private authservice:AuthService){ }

  canActivate() : boolean {
    return ! this.authservice.isUserLogin;
    }
  }

  @Injectable()
  export class OnlyLogged implements CanActivate {
    constructor(private authservice:AuthService, private router:Router){ }

    canActivate() : boolean {
        const loginStatus:boolean = this.authservice.isUserLogin;
        if( loginStatus ){
          // is logged, can enter page
          return true;
        }
        else{
          // not loggged, redirect to login
          this.router.navigate(['login']);
          return false;
        }
      }
    }

@Injectable()
export class AuthService {
  constructor(private softaskAPI: SoftaskAPI) { }
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

  isExpired(date: Date): boolean {
    const expirationDate: Date = new Date(Date.parse(date.toString()));
    if (expirationDate < new Date()) {
      // console.log("token time expired");
      this.softaskAPI.logout();
      return true;
    }
    return false;
  }
}
