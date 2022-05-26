import { Component, Input, OnInit } from "@angular/core";
import { IProject } from "src/app/services/softaskapi.service";

@Component({
  selector: 'app-property-card',
  //template: '<h1> I am a card</h1>'
  templateUrl: 'property-card.component.html',
  styleUrls: ['property-card.component.css']
})

export class PropertyCardComponent implements OnInit{
  constructor(){}
  @Input() project!:IProject;

  ngOnInit(): void {
      console.log(this.project);
  }
}
