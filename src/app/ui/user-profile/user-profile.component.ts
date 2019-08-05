import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { TokenService } from 'src/app/core/token.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';

const URL = `${environment.BASEURL}/images/upload`;

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  @ViewChild('upload') upload: ElementRef;

  task;
  user;
  form;
  type;
  message = '';
  showMessage = false;
  passwordForm;
  isChangePassword: Boolean = false;
  cookieExists: any;

  ImageURL = environment.ImageURL;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    method: 'post',
    itemAlias: 'upload',
    autoUpload: true,
    removeAfterUpload: true,
    authToken: `bearer ${this.tokenService.getToken()}`,
    disableMultipart: false,
  });
  success: boolean = false;

  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private tokenService: TokenService,
    private router: Router
    ) {

    this.createForm();
    this.cookieExists = tokenService.checkToken();
    if(!this.cookieExists) {
      router.navigate(['/login']);
    }

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        // this.toastService.showToast('success', null, JSON.parse(response).message);
        this.user.imgURL = JSON.parse(response).filename;
        console.log(response)
      };
  }

  createForm() {
    this.form = this.formBuilder.group({
      _id: [''],
      firstname: [''],
      lastname: [''],
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
    this.success = false;
    this.auth.ChangePassword(this.passwordForm.value).subscribe((res: any) => {
      this.success = true;
      this.message = res.message;
      this.passwordForm.reset();
    })
    // this.auth.changePassword(this.passwordForm.value).then((ret:any) => {
    //   console.log(ret)
    //   if(!ret.success) {
    //     this.type = 'danger';
    //     this.showMessage = true;
    //     this.message = ret.message;
    //   } else {
    //     this.type = 'success';
    //     this.showMessage = true;
    //     this.message = ret.message;
    //     this.passwordForm.reset();
    //   }
    // })
  }


  logout() {
    // this.auth.signOut();
  }

  GetLoginUser() {
    this.auth.GetLoginUser().subscribe((res: any) => {
      this.user = res.result;
      this.form.patchValue(res.result);
    })
  }

  ngOnInit() {

    this.GetLoginUser();

    // console.log(this.auth.changePassword(123));
    // console.log(this.auth.user.uid)
    // this.auth.getCurrentUser(this.auth.user).subscribe((user) => {
    //   if(user) {
    //     this.user = user;
    //     this.form.patchValue(user)
    //     console.log('user: ', this.user);
    //   }
    // })
  }

  updateProfile() {
    this.success = false;
    this.auth.UpdateProfile(this.form.value).subscribe((res: any) => {
      // console.elog()
      this.success = true;
      this.message = res.message;
    })
    // console.log(this.form.value)

    // this.auth.updateProfile(this.form.value).then(() => {
    //   this.showMessage = true;
    //   this.type = 'success';
    //   this.message = 'Profile successfully updated';
    // })
  }

  updateProfileImage(url) {
    // this.auth.updateProfile({ uid: this.user.uid, photoURL: url }).then(() => {
    //   console.log('Updated Successfully!');
    // })
  }

  saveChanges() {
    var file = this.upload.nativeElement.files[0];

    const path = `images/${this.user.uid}`;

    this.task = this.storage.upload(path, file);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.storage.ref(path).getDownloadURL().subscribe((url) => {
          this.updateProfileImage(url)
        })
      })
    ).subscribe();
  }

}
