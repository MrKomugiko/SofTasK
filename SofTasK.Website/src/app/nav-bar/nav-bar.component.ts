import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ILoginRequest, ILoginResponse, IUser, SoftaskAPI } from '../services/softaskapi.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  subscription:Subscription;
  currentUsername!: string ;

  constructor(private softaskAPI:SoftaskAPI,private router:Router) {
    this.subscription = softaskAPI.currentUser$.subscribe (
      name => {
        this.currentUsername = name;
      }
      )
  }


  ngOnInit(): void {
    let name = this.softaskAPI.loggedUserdata?.user;
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
    this.softaskAPI.logout();
    this.router.navigate(["/login"]);
  }
}
