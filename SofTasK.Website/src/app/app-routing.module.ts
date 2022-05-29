import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PropertyListComponent } from "./property/property-list/property-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AlwaysAuthGuard,OnlyLogged,OnlyWhenUserNotLogged } from "./app.component";

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate: [OnlyLogged]},
  {path:'register',component:RegisterComponent},
  {path:'projects',component:PropertyListComponent, canActivate: [OnlyLogged]},
  {path:'**', redirectTo:('/')},

];

@NgModule({
  imports:[
  BrowserModule,
  [RouterModule.forRoot(routes)]],
  exports: [RouterModule]
})

export class AppRoutingModule { }
