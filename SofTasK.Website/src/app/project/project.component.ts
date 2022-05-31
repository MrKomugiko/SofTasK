import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { TaskDetailsComponent } from './task-details/task-details.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  randomDate1 = new Date().toLocaleDateString();

  projectId!:number;
  selectedTaskId:number = -1;

  projectTasks= [
    { id:100 },
    { id:200 },
    { id:300 },
    { id:400 },
    { id:500 },
    { id:600 },
    { id:700 },
    { id:800 },
    { id:900 },
    { id:1000 },
    { id:1100 },
    { id:1200 },
    { id:1300 },
    { id:1400 },
    { id:1500 },
    { id:1600 },
    { id:1700 }
  ]
  private sub:any;

  @ViewChild(TaskDetailsComponent) child!: TaskDetailsComponent;

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.projectId = +params['id']; // {+} converts string to number
      // dispatch action to load details here.
    });
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


