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
        console.log('get subscribed data');
        this.curentProjectInfo = data;
        if(this.curentProjectInfo != null && this.curentProjectInfo?.memberType == MemberType.Owner)
        {
          this.ownerTabOpened=true;
        }
        else
        {
          this.ownerTabOpened=false;
        }
        }
      )
   }

  ngOnInit(): void {

  }

}
