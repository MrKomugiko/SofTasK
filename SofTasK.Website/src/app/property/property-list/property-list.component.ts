import { Component, OnInit } from '@angular/core';
import { IProject, SoftaskAPI } from 'src/app/services/softaskapi.service';



@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  constructor(private softaskAPI: SoftaskAPI) {}

  projects:Array<IProject> = [];

  ngOnInit(): void {
    this.softaskAPI.getAllProjects()
      .subscribe(data => {
        this.projects = data;
        // console.log(data)
      })
  }
}
