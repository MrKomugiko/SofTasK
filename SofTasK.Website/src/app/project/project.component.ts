import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  projectId!:number;
  private sub:any;

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.projectId = +params['id']; // {+} converts string to number

      // dispatch action to load details here.

    });
    }
  }

