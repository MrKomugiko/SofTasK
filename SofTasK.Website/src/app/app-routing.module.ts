import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PropertyListComponent } from "./property/property-list/property-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'projects',component:PropertyListComponent}
];

@NgModule({
  imports:[
  BrowserModule,
  [RouterModule.forRoot(routes)]],
  exports: [RouterModule]
})

export class AppRoutingModule { }

