import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit} from '@angular/core';

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
  private _taskId!:number;
  @Input()
  set taskId(value: number) {
    console.log(value);
    this._taskId = value;
  }
  get taskId():number{
    return this._taskId;
  }

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

  triggerAnimation() {
    console.log(this.hide);
  }

    constructor() {
     this.hide = true;
  }


  ngOnInit(): void {
    // on init - animate show
    // this.triggerAnimation();

    console.log('details init');
  }
}
