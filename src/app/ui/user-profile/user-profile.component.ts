import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService ) { }

  user;

  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
    // console.log(this.auth.user.uid)
    this.auth.getCurrentUser(this.auth.user).subscribe((user) => {
      this.user = user;
    })
  }

}
