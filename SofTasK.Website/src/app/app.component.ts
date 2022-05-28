import { Component } from '@angular/core';
import { ILoginResponse } from './services/softaskapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SofTasK.Website';

  get isUserLogin():boolean{
    const userObj = localStorage.getItem("userInfo");
    if( userObj != null)
    {
      const userInfo : ILoginResponse = JSON.parse(userObj);
      if(userInfo.token != null)
      {
        return true;
      }
    }
    return false;
  }
}
