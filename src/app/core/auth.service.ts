import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { firebase } from '@firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { NotifyService } from './notify.service';

import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';
import { VariablesService } from './variables.service';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  firstName?:string
  lastName?:string
  state?: string;
  company?: string;
  contact?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  isActive?: boolean;
  role?:string;
}

@Injectable()
export class AuthService {
  user: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService,
    private vs: VariablesService
  ) {

    this.afAuth.authState.subscribe((auth) => {

      if (auth) {
        console.log(auth, 'auth')
        this.user = auth;
        // this.updateUserData(auth);
      } else {
        console.log(auth, 'notAuth')
        this.user = '';
      }
    })
    // this.user = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   }),
    //   tap(user => {
    //     if(user) {
    //       localStorage.setItem('user', JSON.stringify(user))
    //     }
    //   }),
    //   startWith(JSON.parse(localStorage.getItem('user')))
    // );
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    // return this.afAuth.auth
    //   .signInWithPopup(provider)
    //   .then(credential => {
    //     this.notify.update('Welcome to Firestarter!!!', 'success');
    //     return this.updateUserData(credential.user);
    //   })
    //   .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    // return this.afAuth.auth
    //   .signInAnonymously()
    //   .then(credential => {
    //     this.notify.update('Welcome to Firestarter!!!', 'success');
    //     return this.updateUserData(credential.user); // if using firestore
    //   })
    //   .catch(error => {
    //     this.handleError(error);
    //   });
  }

  //// Email/Password Auth ////

  emailSignUp(data:any) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(data.email2, data.password2)
      .then(credential => {
        return this.updateUserData(credential.user, data);
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        console.log(credential);
        //this.notify.update('Welcome back!', 'success');
        //return this.updateUserData(credential.user);
        this.router.navigate(['/']);
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  changePassword(secure) {
    return this.afAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(
      auth.EmailAuthProvider.credential(
        this.afAuth.auth.currentUser.email,
        secure.currentPassword
      )
    ).then(() => {
      if (secure.newPassword !== '' && secure.retypePassword !== '') {
        if (secure.newPassword === secure.retypePassword) {
            return this.afAuth.auth.currentUser.updatePassword(secure.newPassword)
              .then(() => {
                return { success: true, message: 'Password Changed' }
              }, error => {
                return { success: false, message: error }
              })
          } else {
          return { success: false, message: 'New Password did not matched.' }
          }
        } else {
        return { success: false, message: 'New Password cannot be empty' }
        }
    }).catch((error) => {
      return { success: false, message: error.message }
    })

    // var user = auth().currentUser;
    // return user;
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    this.notify.update(error.message, 'danger');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: any, userdata: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: any = {
      uid: user.uid,
      email: userdata.email2 || null,
      firstName: userdata.firstName || 'Gentec User',
      lastName: userdata.lastName || 'Gentec User',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
      state: userdata.state,
      contact: userdata.contact,
      company: userdata.company,
      city: userdata.city,
      isActive: true,
      role: 'user'
    };
    return userRef.set(data);
  }

  getCurrentUser(user) {
    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
  }

  updateProfile(data) {
    return this.afs.doc<any>(`users/${data.uid}`).update(data);
  }
}
