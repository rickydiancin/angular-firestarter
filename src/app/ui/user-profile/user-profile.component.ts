import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  user;
  form;
  success;
  message;

  constructor(public auth: AuthService, private formBuilder: FormBuilder ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      uid: [''],
      firstname: [''],
      lastname: [''],
      email: [''],
      address: [''],
      phone: [''],
      bio: [''],
    })
  }


  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
    // console.log(this.auth.user.uid)
    this.auth.getCurrentUser(this.auth.user).subscribe((user) => {
      this.user = user;
      this.form.patchValue(user)
      console.log('user: ',this.user);
    })
  }

  updateProfile() {
    console.log(this.form.value)

    this.auth.updateProfile(this.form.value).then(() => {
      this.success = true;
      this.message = 'Profile successfully updated';
    })
  }

}
