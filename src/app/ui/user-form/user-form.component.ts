import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { StorageService } from 'src/app/core/storage.service';
import { NotifyService } from 'src/app/core/notify.service';
import { VariablesService } from 'src/app/core/variables.service';

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
    private vs: VariablesService
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
    this.auth.emailSignUp(this.regform.value).then((success) => {
      this.vs.SendEmail(this.regform.value).subscribe((res:any) => {
        console.log(res)
      })
    })
  }

  login() {
    this.message = '';
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
  }

  resetPassword() {
    this.auth.resetPassword(this.email)
      .then((success) => {
        this.sentRecovery = true;
      });
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(4),
        Validators.maxLength(25),
      ]],
    });

    this.regform = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      state: ['', Validators.required],
      contact: [''],
      company: [''],
      city: [''],
      email2: ['', [
        Validators.required,
        Validators.email,
      ]],
      password2: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(4),
        Validators.maxLength(25),
      ]],
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
