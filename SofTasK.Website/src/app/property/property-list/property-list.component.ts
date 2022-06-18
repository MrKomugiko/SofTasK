import { Component, OnInit } from '@angular/core';
import { MemberType, ProjectService } from 'src/app/services/project-service.service';
import { AuthService, IRoles } from 'src/app/services/auth-service.service';
import { IProject, SoftaskAPI } from 'src/app/services/softask-api.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  constructor(private softaskAPI: SoftaskAPI,private authService:AuthService,private projectService:ProjectService) {
    this.roles = this.authService.GetUserRolesData();
  }

  projects:Array<IProject> = [];
  roles:IRoles[];
  isAMember:boolean = false;

  ngOnInit(): void {

    console.log('init property-list')
    /* hide sidebar project related info when list of projects is displaying*/


    this.softaskAPI.getAllProjects()
      .subscribe(data => {
        if(data.length==0)
        {
          console.log('empty');
        }
        this.projects = data;
      })

      this.roles = this.authService.UserRolesArray;
    }

    checkMembership(project:IProject)
    {
      // console.log(project);
      // console.log(this.roles);
      if(this.roles.some(x=>x.Id == project.id))
        return true;

      return false;
    }

  getBorderColor(projectId:number):string {
    // user is a owner = bright green
    // user is a member = blue
    // user is not a member and project is public - transparent
    // project is private = red
    // member or owner
    let isInProject = this.roles.findIndex(x=>x.Id == projectId);
    if(isInProject == -1)
      return 'transparent';

    if(this.roles[isInProject].Role.some(x=>x == MemberType.Owner) )
      return "yellowgreen";

    if(this.roles[isInProject].Role.some(x=>x == MemberType.Member) )
      return "blue";

    return "black";
  }
}
