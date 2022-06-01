import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginRequest, SoftaskAPI } from '../services/softaskapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formbuilder.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })
  constructor(private formbuilder:FormBuilder,private softaskAPI: SoftaskAPI, private router:Router) {

   }

  ngOnInit(): void {
  }

  onSubmit()
  {
    const payload:ILoginRequest = {
      username: this.loginForm.controls["username"].value.trim(),
      password: this.loginForm.controls["password"].value
    }

    this.softaskAPI.login(payload).subscribe(
      (respond) => {
        if (respond.token != null) {
          localStorage.setItem('userInfo', JSON.stringify(respond));
          console.log("LOGGED IN");
          this.router.navigate(["/projects"]);
        }
      },
      (msg) => {
        // console.log(msg);
        alert("Wrong Username or password.");
      });
  }
}
