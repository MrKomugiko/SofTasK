import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService, ILoginResponse } from './services/auth-service.service';
import { SoftaskAPI } from './services/softask-api.service';

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
  constructor(private authservice:AuthService, private router:Router){ }

  canActivate() : boolean {
    if(this.authservice.isUserLogin)
    {
      this.router.navigate(['dashboard']);
      return false;
    }
    else
    {
      return true;
    }
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
