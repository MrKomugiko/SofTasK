import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IProject, ITask, priorityLevels, SoftaskAPI, taskStatuses } from 'src/app/services/softaskapi.service';


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

  constructor(private softaskAPI:SoftaskAPI) {
    this.hide = true;
  }

  @Input() task!:ITask;
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

  proritySelectList:Array<{id:number; name:string; color:string}> = [];
  statusSelectList:Array<{id:number; name:string;}> = [];

  @Output() delete:EventEmitter<ITask> = new EventEmitter<ITask>();
  onDeleteButtonClick() {
    //you need to emit event
    console.log('delete clicked');
    console.log('processing');
    this.softaskAPI.RemoveTask(this.task.id).subscribe({
      next:(data) => {
        console.log(data)
      },
      error:(msg:{ ok:boolean, error: { message:string }}) => {
        alert('error: '+ msg.error.message)
      },
      complete:() => {
        console.log('deleted completed');
        console.log('emit event "delete"');
        this.delete.emit(this.task);
        this.hide = true;
      }
    })
    // this can be done from button click mostly, which i am guessing is your case
  }

  triggerAnimation() {
    console.log(this.hide);
  }

  ngOnInit(): void {
    Object.values(taskStatuses).forEach((x, index)=> {
      if(Number.isNaN(Number(x)) == false) return; // jezeli to liczba, nie doawaj do listy
      this.statusSelectList.push({id:index,name:x.toString()})
    });
    Object.values(priorityLevels).forEach((x, index)=> {
      if(Number.isNaN(Number(x)) == false) return; // jezeli to liczba, nie doawaj do listy
      this.proritySelectList.push({id:index,name:x.toString(),color:proritycolors[index]})
    });
  }

}
  enum proritycolors
  {
    "rbga(0,0,0,0)" = 0, // not selected
    "rgb(3, 252, 144)"= 1, // Low
    "rgb(3, 252, 44)" = 2, // standard
    "rgb(219, 252, 3" = 3,
    "rgb(252, 198, 3)" = 4, // major
    "rgb(252, 3, 3)" = 5 // criticval
  }


