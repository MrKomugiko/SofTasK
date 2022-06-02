import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, observable, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SoftaskAPI {

 private baseUrl:string = 'https://localhost:7054/api/';
 //private baseUrl: string = 'https://softask-api.herokuapp.com/api/';



  constructor(private http: HttpClient) {
  }


  public getAllProjects(): Observable<IProject[]> {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    if(token != null)
    {
      return this.http.get<IProject[]>(this.baseUrl + 'Projects', { headers: headers })
    }

    return new Observable<IProject[]>();
  }


  public getUserToken(): string | null {
    let token = null;

    const obj = localStorage.getItem("userInfo");
    if (obj != null) {
      const userInfo: ILoginResponse = JSON.parse(obj);
      token = userInfo.token;
    }

    return token;
  }


  public getAllTasksByProject(projectId: number): Observable<ITask[]> {
    const token = this.getUserToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    if(token !=null)
    {
      return this.http.get<ITask[]>(this.baseUrl + 'Tasks/' + projectId, { headers: headers })
    }

    return new Observable<ITask[]>();

  }

  public RemoveTask(id:number)
  {
    const token = this.getUserToken();

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


  public login(data: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.baseUrl + 'Authenticate/login', data);
  }

  public logout(): void {
    localStorage.removeItem("userInfo");
    console.log("user logged off");
  }

  public register(data: IRegisterRequest) {
    return this.http.post(this.baseUrl + 'Authenticate/register', data);
  }
}


export interface IRegisterRequest {
  email: string,
  username: string,
  password: string,
  confirmpassword: string
}
export interface ILoginResponse {
  token: string,
  expiration: Date
}
export interface ILoginRequest {
  username: string,
  password: string
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
  assigned: IUser | null
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
