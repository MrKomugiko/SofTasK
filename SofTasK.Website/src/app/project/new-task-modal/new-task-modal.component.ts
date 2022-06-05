import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { priorityLevels, taskStatuses } from 'src/app/services/softaskapi.service';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})
export class NewTaskModalComponent implements OnInit {
  proritySelectList:Array<{id:number; name:string; color:string}> = [];
  statusSelectList:Array<{id:number; name:string;}> = [];

  selectedPriority:number = 0;
  selectedStatus:number = 0;


  @Input() name:string = '';
  public priority:{id:number; name:string; color:string} = this.proritySelectList[0];

  constructor(public activeModal: NgbActiveModal) {
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
    printdata(obj:string):void
    {
      if(obj[obj.length-1] == ',')
      {
        this.tagArray = obj.split(',').filter((value) =>
        {
          if(value == '' || value == undefined || value == null)
            return false;
          else
            return true;
        }).map(x=>x.trim())
      }
      console.log(this.tagArray);
    }

    tagArray:string[] = ['Free coffe','Backend','Easy','Bonus ticket','Need to be done'];


  onSubmit(formdata:NgForm)
  {
    formdata.value["tags"] = this.tagArray;
    console.log(formdata.value);
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
