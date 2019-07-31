import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { StorageService } from 'src/app/core/storage.service';
import { NotifyService } from 'src/app/core/notify.service';
import { VariablesService } from 'src/app/core/variables.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/token.service';
import { Location } from '@angular/common';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  isLogin: Boolean = true;
  sentRecovery: Boolean = false;
  email;

  userForm;
  regform:any;
  data: any;
  newUser = true; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered

  message: any;
  style: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public storage: StorageService,
    public notifyService: NotifyService,
    private vs: VariablesService,
    public location: Location,
    private tokenService: TokenService
    ) {
    this.buildForm();
    notifyService.msg.subscribe((message) => {
      if(message) {
        this.message = message.content;
        this.style = message.style;
      }
    })
  }

  ngOnInit() {
  }

  toggleForm() {
    this.newUser = !this.newUser;
  }

  signup() {
    this.auth.CreateUser(this.regform.value).subscribe((res: any) => {
      this.message = res.message;
      this.style = 'success';
      this.regform.reset();
    }, (err) => {
      this.message = err.error.message;
      this.style = 'danger';
    });
    // this.auth.emailSignUp(this.regform.value).then((success:any) => {
    //   if(success) {
    //     this.regform.value['type'] = 'new user';
    //     this.vs.SendEmail(this.regform.value).subscribe((res: any) => {
    //       // console.log(res)
    //     })
    //   }
    // })
  }

  login() {
    this.message = '';
    this.auth.login(this.userForm.value).subscribe((res: any) => {
      this.location.back();
      this.tokenService.setToken(res.token);
    }, (err) => {
      this.message = err.error.message;
      this.style = 'danger';
    })
    // this.message = '';
    // this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
  }

  resetPassword() {
    // this.auth.resetPassword(this.email)
    //   .then((success) => {
    //     this.sentRecovery = true;
    //   });
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]],
    });

    this.regform = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      state: ['', Validators.required],
      contact: [''],
      company: [''],
      city: [''],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
      role: ['user'],
    });

    // this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    // this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  // onValueChanged(data?: any) {
  //   if (!this.userForm) { return; }
  //   const form = this.userForm;
  //   for (const field in this.formErrors) {
  //     if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
  //       // clear previous error message (if any)
  //       this.formErrors[field] = '';
  //       const control = form.get(field);
  //       if (control && control.dirty && !control.valid) {
  //         const messages = this.validationMessages[field];
  //         if (control.errors) {
  //           for (const key in control.errors) {
  //             if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
  //               this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
}
