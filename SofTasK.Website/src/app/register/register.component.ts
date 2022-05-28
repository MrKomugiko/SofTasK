import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public registerForm = this.formbuilder.group({
    userName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required]
  })

  constructor(private formbuilder:FormBuilder) {

  }

  ngOnInit(): void {
  }

  onSubmit():void {
    console.log("on submit clicked");
  }
}
