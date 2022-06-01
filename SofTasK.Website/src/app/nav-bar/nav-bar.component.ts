import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoftaskAPI } from '../services/softaskapi.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private softaskAPI:SoftaskAPI,private router:Router) { }

  ngOnInit(): void {
  }

  logout()
  {
    this.softaskAPI.logout();
    this.router.navigate(["/login"]);
  }
}
