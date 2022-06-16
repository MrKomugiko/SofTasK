import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { MemberType, ProjectData, ProjectService } from '../project/project-service.service';

@Component({
  selector: 'app-nav-bar-side',
  templateUrl: './nav-bar-side.component.html',
  styleUrls: ['./nav-bar-side.component.css']
})
export class NavBarSideComponent implements OnInit {

  ownerTabOpened: boolean = false;

  subscription:Subscription;
  curentProjectInfo:ProjectData | null = null;

  constructor(private projectService:ProjectService) {
    this.subscription = projectService.currentProjectInfo$.subscribe (
      data => {
        // console.log('get subscribed data: ');
        // console.log(data);
        this.curentProjectInfo = data;
        if(this.curentProjectInfo != null && this.curentProjectInfo?.memberType === MemberType.Owner)
        {
          // console.log("owner? -> "+JSON.stringify(data?.memberType));
          this.ownerTabOpened=true;
        }
        else
        {
          // console.log("not a owner? -> "+JSON.stringify(data?.memberType));
          this.ownerTabOpened=false;
        }
        }
      )
   }

  ngOnInit(): void {

  }

}
