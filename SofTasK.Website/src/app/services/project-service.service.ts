import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProject } from './softask-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() {

  }

  private currentProjectSource = new Subject<ProjectData | null>();

  currentProjectInfo$ = this.currentProjectSource.asObservable();

  updateProjectInfo(projectId: number, memberType: MemberType, data:IProject) {
    console.log('updateProjectInfo membertype' + memberType);
    console.log(data);
    this.currentProjectSource.next(new ProjectData(projectId,memberType,data));
  }
  clearProjectInfo() {
    // console.log('next ' + username);
    console.log("clear/hide sidebar projects related controlls");
    this.currentProjectSource.next(null);
  }

}

export enum MemberType {
  Anonymous,
  Member,
  Owner
}

export class ProjectData
{
  id:number;
  memberType:MemberType;
  data:IProject;

  constructor(_id:number,_memberType:MemberType,_data:IProject) {
    this.id = _id;
    this.memberType = _memberType;
    this.data = _data;

    console.log("PRoject data created id:"+_id);
    console.log("PRoject data created mambertype:"+_memberType);

  }

  // methods like can get access to.. etc.

}
