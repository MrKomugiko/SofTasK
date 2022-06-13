import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/project/project-service.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { IProject, SoftaskAPI } from 'src/app/services/softask-api.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  constructor(private softaskAPI: SoftaskAPI,private authService:AuthService,private projectService:ProjectService) {}

  projects:Array<IProject> = [];

  ngOnInit(): void {
    console.log('init property-list')
    /* hide sidebar project related info when list of projects is displaying*/
    this.projectService.clearProjectInfo();

    this.softaskAPI.getAllProjects()
      .subscribe(data => {
        if(data.length==0)
        {
          console.log('empty');
        }
        this.projects = data;
      })
  }

  getBorderColor(projectId:number):string {
    // user is a owner = bright green
    // user is a member = blue
    // user is not a member and project is public - transparent
    // project is private = red

    let userroles = this.authService.GetUserRolesData();
    // member or owner
    let isInProject = userroles.findIndex(x=>x.Id == projectId);
    if(isInProject == -1)
      return 'transparent';

    if(userroles[isInProject].Role.some(x=>x == "Owner") )
      return "yellowgreen";

    return "blue";
  }
}
