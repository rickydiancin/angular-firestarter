import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASEURL = environment.BASEURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _listener: any = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  UpdateProfile(body) {
    return this.httpClient.put(`${BASEURL}/user/profile/update`, body);
  }

  GetLoginUser() {
    return this.httpClient.get(`${BASEURL}/user/login`);
  }

  CreateUser(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/user/create`, body);
  }

  GetAllUser(): Observable<any> {
    return this.httpClient.get(`${BASEURL}/user/all`);
  }

  GetSingleUser(index): Observable<any> {
    return this.httpClient.get(`${BASEURL}/user/single`, {
      params: new HttpParams()
        .set('index', index)
    });
  }

  DeleteUser(index): Observable<any> {
    return this.httpClient.delete(`${BASEURL}/user/delete`, {
      params: new HttpParams()
        .set('index', index)
    });
  }

  login(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/login`, body);
  }

  listen(): Observable<any> {
    return this._listener.asObservable();
  }

  listener(data) {
    this._listener.next(data);
  }
  
}
