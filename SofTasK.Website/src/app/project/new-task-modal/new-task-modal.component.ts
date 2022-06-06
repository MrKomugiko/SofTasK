import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITask, priorityLevels, SoftaskAPI, taskStatuses } from 'src/app/services/softaskapi.service';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})

export class NewTaskModalComponent implements OnInit {

  @Input() projectId:number|null = null;
  @Output() newTask:EventEmitter<ITask> = new EventEmitter<ITask>();

  proritySelectList:Array<{id:number; name:string; color:string}> = [];
  statusSelectList:Array<{id:number; name:string;}> = [];

  selectedPriority:number = 0;
  selectedStatus:number = 0;

  public priority:{id:number; name:string; color:string} = this.proritySelectList[0];

  constructor(public activeModal: NgbActiveModal, private softaskAPI:SoftaskAPI) {
    Object.values(taskStatuses).forEach((x, index)=> {
      if(Number.isNaN(Number(x)) == false) return; // jezeli to liczba, nie doawaj do listy
      this.statusSelectList.push({id:index,name:x.toString()})
    });
    Object.values(priorityLevels).forEach((x, index)=> {
      if(Number.isNaN(Number(x)) == false) return; // jezeli to liczba, nie doawaj do listy
      this.proritySelectList.push({id:index,name:x.toString(),color:proritycolors[index]})
    });
   }

   defaultValue:number = 0;
  ngOnInit(): void {

  }
  convertToTagArray(obj:string):void
  {
    //clear table if empty string
    if(obj.length == 0) this.tagArray = [];

    if(obj[obj.length-1] == ',')
    {
      this.tagArray = obj.split(',').filter((value,index,array) =>
      {
        // dont process empty arrays ( caused by putting multiple commas )
        if(value == '' || value == undefined || value == null) return false;

        // dont process duplicated words, keep first occurence only
        if(array.indexOf(value) != index) return false;

        return true;
      }).map(x=>x.trim())
      //console.log(this.tagArray);
    }
  }

  tagArray:string[] = ['Free coffe','Backend','Easy','Bonus ticket','Need to be done'];

  onSubmit(formdata:NgForm)
  {
    formdata.value["tags"] = this.tagArray;
    this.softaskAPI.AddTaskPOST(formdata.value).subscribe({
      next:(data) => {
        console.log("emit: "+data);
        this.newTask.emit(data);

      },
      error:(msg:{ ok:boolean, error: { message:string }}) => {
        alert('error: '+ msg.error.message)
      },
      complete:() => {
          console.log('adding request completed');
        // console.log('emit event "delete"');
      }
    })
  }
}

enum proritycolors
{
  "rbga(0,0,0,0)" = 0, // not selected
  "rgb(210, 212, 98)" = 1, // Low
  "rgb(92, 134, 10)" = 2, // standard
  "rgb(255, 194, 70)" = 3, // moderate
  "rgb(199, 52, 8)" = 4, // major
  "rgb(85, 10, 30)" = 5 // criticval
}
