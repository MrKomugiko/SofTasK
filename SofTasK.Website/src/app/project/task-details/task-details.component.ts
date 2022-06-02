import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit} from '@angular/core';
import { IProject, ITask } from 'src/app/services/softaskapi.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  animations: [
    trigger(
         'inOutAnimation',
     [
       state('closed', style({
         width: '0px',
         opacity: 0
       })),
       state('open', style({
        width: 'auto',
        opacity: 1
      })),
      transition('* => open', [
        animate('0.25s')
      ]),
      transition('* => closed', [
        animate('0.25s')
      ])
    ]
    )
  ],
  styleUrls: ['./task-details.component.css']
})

export class TaskDetailsComponent implements OnInit {

  @Input() task:ITask | undefined = undefined;
  @Input() currentproject:IProject | undefined = undefined;
  
  private _hide!:boolean;
  @Input()
  set hide(value: boolean) {
    console.log('hide:'+value);
    this._hide = value;
    this.triggerAnimation();
  }
  get hide():boolean{
    return this._hide;
  }

  taskMainData!:ITask;

  triggerAnimation() {
    console.log(this.hide);
  }

    constructor() {
     this.hide = true;
  }


  ngOnInit(): void {
    // on init - animate show
    // this.triggerAnimation();
    console.log("DETAILS OF TASK ID:"+this.task?.id);
  }
}
