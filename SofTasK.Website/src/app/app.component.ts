import { Component } from '@angular/core';
import { ILoginResponse, SoftaskAPI } from './services/softaskapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SofTasK.Website';

  constructor(private softaskAPI:SoftaskAPI){  }

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

  private isExpired(date: Date): boolean {
    const expirationDate: Date = new Date(Date.parse(date.toString()));
    if (expirationDate < new Date()) {
      // console.log("token time expired");
      this.softaskAPI.logout();
      return true;
    }
    return false;
  }
}
