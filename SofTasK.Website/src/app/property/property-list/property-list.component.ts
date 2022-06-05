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
    console.log('init property-list')
    this.softaskAPI.getAllProjects()
      .subscribe(data => {
        if(data.length==0)
        {
          console.log('empty');
        }
        this.projects = data;
      })
  }
}
