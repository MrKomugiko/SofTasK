import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, IRegisterRequest } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public registerForm = this.formbuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required]
  })

  constructor(private formbuilder:FormBuilder, private router:Router, private authService:AuthService) {

  }

  ngOnInit(): void {
  }

  onSubmit():void {
    console.log("click");
    const payload:IRegisterRequest = {
      username: this.registerForm.controls["username"].value,
      email: this.registerForm.controls["email"].value,
      password: this.registerForm.controls["password"].value,
      confirmpassword: this.registerForm.controls["confirmpassword"].value
    }

    this.authService.register(payload).subscribe({
      next:(respond) => {
          console.log("Register respond:"+respond);
          this.router.navigate(["/login"]);
      },
      error:(error) => {
        console.log(error);
      }}
    )
  }
}
