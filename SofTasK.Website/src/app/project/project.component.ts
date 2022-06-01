import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ITask, SoftaskAPI } from '../services/softaskapi.service';
import { TaskDetailsComponent } from './task-details/task-details.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private softaskAPI:SoftaskAPI) { }

  randomDate1 = new Date().toLocaleDateString();

  projectId!:number;
  selectedTaskId:number = -1;

  tasks:Array<ITask> = [];

  private sub:any;

  @ViewChild(TaskDetailsComponent) child!: TaskDetailsComponent;

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.projectId = +params['id']; // {+} converts string to number
      // dispatch action to load details here.
    });

    this.softaskAPI.getAllTasksByProject(this.projectId)
      .subscribe(data => {
        this.tasks = data;
        console.log(data)
    })
  }

    toggleDetails(taskId:number):void
    {
      // already opened and attempt to open it again = close window
      if(this.child.hide == false &&  this.selectedTaskId == taskId)
      {
        this.child.hide = true;
        this.selectedTaskId = -1;
        return;
      }
      // assing current task to open, open it
      this.selectedTaskId = taskId;
      this.child.taskId = taskId;
      console.log(this.child.hide );
      this.child.hide = false;

    }

  }


