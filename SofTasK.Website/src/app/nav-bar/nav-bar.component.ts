import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { AuthService, ILoginResponse } from '../services/auth-service.service';
import { SoftaskAPI } from '../services/softask-api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  currentUsername!: string ;
  subscription:Subscription;

  constructor(private softaskAPI:SoftaskAPI, private authService:AuthService,private router:Router) {
    this.subscription = authService.currentUser$.subscribe (
      name => {
        this.currentUsername = name;
      }
      )
  }


  ngOnInit(): void {
    let name = this.authService.loggedUserdata?.user;
    if(name != null)
      this.currentUsername = name;
    else // get name from localstore
    {
      const obj = localStorage.getItem("userInfo");
      if (obj != null) {
        const userInfo: ILoginResponse = JSON.parse(obj);
        this.currentUsername = userInfo.user;
      }
    }
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
