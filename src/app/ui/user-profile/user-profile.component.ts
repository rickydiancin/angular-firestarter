import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  user;
  form;
  type;
  message;
  showMessage = false;
  passwordForm;
  isChangePassword: Boolean = false;

  constructor(public auth: AuthService, private formBuilder: FormBuilder ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      uid: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      state: [''],
      contact: [''],
      company: [''],
      address: [''],
      city: [''],
      postalCode: [''],
      bio: [''],
    });

    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      retypePassword: ['', Validators.required],
    });
  }

  changePassword() {
    this.auth.changePassword(this.passwordForm.value).then((ret:any) => {
      console.log(ret)
      if(!ret.success) {
        this.type = 'danger';
        this.showMessage = true;
        this.message = ret.message;
      } else {
        this.type = 'success';
        this.showMessage = true;
        this.message = ret.message;
        this.passwordForm.reset();
      }
    })
  }


  logout() {
    this.auth.signOut();
  }

  ngOnInit() {

    // console.log(this.auth.changePassword(123));
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
      this.showMessage = true;
      this.type = 'success';
      this.message = 'Profile successfully updated';
    })
  }

}
