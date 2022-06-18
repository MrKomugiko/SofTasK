import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})

export class SoftaskAPI {
 private baseUrl:string;

  constructor(private http: HttpClient, private auth:AuthService) {
     //private baseUrl: string = '';
    if (environment.production) {
      // for production
      this.baseUrl = 'https://softask-api.herokuapp.com/api/';
      // console.log(this.baseUrl);
    } else {
      // for development
      this.baseUrl = 'https://localhost:7054/api/';
      // console.log(this.baseUrl);
    }
  }

  public AddTaskPOST(payload:any) : Observable<ITask>
  {
    const token = this.auth.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    if(token != null)
    {
      return this.http.post<ITask>(this.baseUrl + 'Tasks', payload, { headers: headers })
    }

    return new Observable<ITask>();
  }
  public getAllProjects(): Observable<IProject[]> {
    const token = this.auth.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    if(token != null)
    {
      return this.http.get<IProject[]>(this.baseUrl + 'Projects', { headers: headers })
    }

    return new Observable<IProject[]>();
  }
  public getAllTasksByProject(projectId: number): Observable<ITask[]> {
    const token = this.auth.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    if(token !=null)
    {
      return this.http.get<ITask[]>(this.baseUrl + 'Tasks/All/' + projectId, { headers: headers })
    }

    return new Observable<ITask[]>();

  }
  public RemoveTask(id:number)
  {
    const token = this.auth.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    if(token !=null)
    {
      return this.http.delete(this.baseUrl + `Tasks/${id}`, {headers:headers});
    }
    else
      throw new Observable<Object>();
  }
}

export interface IProject {
  id: number,
  name: string,
  description: string,
  ownerId: string,
  owner: IUser,
  collaborators: IUser[]
}
export interface IUser {
  id: string,
  userName: string,
  email: string
}
export interface ITask {
  id: number,
  projectId: number,
  title: string,
  description: string,
  status: taskStatuses,
  priority: priorityLevels,
  created: Date,
  started: Date | null,
  ended: Date | null,
  createdby: IUser,
  assigned: IUser | null,
  tags: string[]
}
export interface ITaskCreateRequest {
  projectId: number,
  title: string,
  description: string,
  status: taskStatuses,
  priority: priorityLevels,
  ownerId: string,
  tags: string[]
}
export enum priorityLevels {
  notSelected,
  Low,
  Standard,
  Moderate,
  Major,
  Critical
}
export enum taskStatuses {
  notSelected,
  New,
  WaitingForAssigment,
  InProgress,
  Revieving,
  Done,
  Delayed,
  Abaddoned
}

