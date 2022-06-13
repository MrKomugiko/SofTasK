import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProject } from '../services/softask-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() {

  }

  private currentProjectSource = new Subject<ProjectData | null>();

  currentProjectInfo$ = this.currentProjectSource.asObservable();

  updateProjectInfo(projectId: number, memberType: MemberType, data:IProject) {
    // console.log('next ' + username);
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

    console.log("PRoject data created:"+_id);
  }

  // methods like can get access to.. etc.

}
