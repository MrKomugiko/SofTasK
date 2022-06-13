import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PropertyListComponent } from "./property/property-list/property-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OnlyLogged, OnlyWhenUserNotLogged } from "./app.component";
import { ProjectComponent } from "./project/project.component";

const routes: Routes = [
  {path:'', component:DashboardComponent, canActivate: [OnlyLogged]},
  {path:'login',component:LoginComponent, canActivate:[OnlyWhenUserNotLogged]},
  {path:'register',component:RegisterComponent},
  {path:'projects',component:PropertyListComponent, canActivate: [OnlyLogged]},
  {path:'project/:id',component:ProjectComponent, canActivate: [OnlyLogged]},
  {path:'dashboard',component:DashboardComponent, canActivate: [OnlyLogged]},

  {path:'**', redirectTo:('/')}

];

@NgModule({
  imports:[
  BrowserModule,
  [RouterModule.forRoot(routes)]],
  exports: [RouterModule]
})

export class AppRoutingModule { }
