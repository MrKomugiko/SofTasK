import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AlwaysAuthGuard, AppComponent, AuthService, OnlyIfExist, OnlyLogged, OnlyWhenUserNotLogged } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SoftaskAPI } from './services/softaskapi.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { NavBarSideComponent } from './nav-bar-side/nav-bar-side.component';
import { TaskDetailsComponent } from './project/task-details/task-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProjectComponent,
    NavBarSideComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    SoftaskAPI,
    AlwaysAuthGuard,
    OnlyWhenUserNotLogged,
    OnlyLogged,
    AuthService,
    OnlyIfExist
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// Guards
