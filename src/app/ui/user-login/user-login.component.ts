import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { StorageService } from 'src/app/core/storage.service';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {

  user: any;

  constructor(
    public auth: AuthService,
    private router: Router,
    public storage: StorageService
    ) { 
      // console.log(auth.user);
    }

  /// Social Login

  ngOnInit() {
    // this.auth.user.subscribe((data) => {
    //   console.log(data)
    //   if(data === null) {
    //     console.log('logout');
    //     this.storage.removeUser();
    //   } else {
    //     this.user = data;
    //   }
    // })
  }

  async signInWithGithub() {
    // await this.auth.githubLogin();
    // return await this.afterSignIn();
  }

  async signInWithGoogle() {
    // await this.auth.googleLogin();
    // return await this.afterSignIn();
  }

  async signInWithFacebook() {
    // await this.auth.facebookLogin();
    // await this.afterSignIn();
  }

  async signInWithTwitter() {
    // await this.auth.twitterLogin();
    // return await this.afterSignIn();
  }

  /// Anonymous Sign In

  async signInAnonymously() {
    // await this.auth.anonymousLogin();
    // return await this.afterSignIn();
  }

  /// Shared

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    return this.router.navigate(['/']);
  }

}
