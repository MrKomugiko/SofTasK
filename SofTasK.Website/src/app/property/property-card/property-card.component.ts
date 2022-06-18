import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { IProject } from "src/app/services/softask-api.service";

@Component({
  selector: 'app-property-card',
  //template: '<h1> I am a card</h1>'
  templateUrl: 'property-card.component.html',
  styleUrls: ['property-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PropertyCardComponent implements OnInit {
  constructor(){  }

  ngOnInit(): void {

  }

  @Input() project!:IProject;
  @Input() isAMember!:boolean;

  JoinToProject()
  {
    alert('join request sended');
  }
}
