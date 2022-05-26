import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SoftaskAPI {

  projects = [];

  constructor(private http: HttpClient) {
  }

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>('https://localhost:7054/api/Projects')
  }
}

export interface IProject {
  id: number,
  name: string,
  description: string,
  ownerId: string,
  owner: {
    id: string;
    userName: string;
    email: string;
  },
  collaborators: [{
    id: string;
    userName: string;
    email: string;
  }]
}
