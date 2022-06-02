import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { IProject, ITask, SoftaskAPI, taskStatuses } from '../services/softaskapi.service';
import { TaskDetailsComponent } from './task-details/task-details.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private router:Router,private activatedRoute: ActivatedRoute, private softaskAPI:SoftaskAPI) {

  }

   private storeProjectInfo()
   {
    const data:IProject=history.state;
    if(data.id!=undefined)
    {
      console.log("SAVE PROJECT IN localStorage:"+data.name);
      localStorage.setItem('project'+data.id, JSON.stringify(data));
      this.currentProject = data;
    }
    else
    {
      console.log("LOAD FROM localStorage by key: \"project"+this.projectId+"\"");
      let obj = localStorage.getItem('project'+this.projectId);
      if(obj !=null)
      {
        const restoredData:IProject = JSON.parse(obj);
        this.currentProject = restoredData;
        return;
      }
      console.log("NOT FOUND DATA IN localStorage BY: \"project"+this.projectId+"\"");
    }
   }

  currentProject:IProject | undefined;
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

    this.softaskAPI.getAllTasksByProject(this.projectId).subscribe(data => {
        this.tasks = data;
        console.log(data)
    })

    this.storeProjectInfo();
  }

    selectedTask!:ITask;

    removeTaskElement(tasktodelete:ITask)
    {
      console.log("remove task element trriggered");

      let indexToRemove = this.tasks.map(task=>task.id).indexOf(tasktodelete.id);
      console.log("task with index: "+indexToRemove+' for delete');

      this.tasks = this.tasks.filter((value,index) => {
        if(index == indexToRemove) return false;

        return true;
      })

      console.log(this.tasks);
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

      let t = this.tasks.find(x=>x.id == this.selectedTaskId);
      if(t != undefined)
      {
        this.selectedTask = t;;
      }
      else {
        this.selectedTaskId = -1;
        return;
      }
      console.log(this.child.hide );
      this.child.hide = false;

    }

  }


