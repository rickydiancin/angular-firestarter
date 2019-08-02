import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASEURL = environment.BASEURL;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private httpClient: HttpClient
  ) { }

  NewMenu(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/menus/create`, body)
  }

  UpdateMenu(body): Observable<any> {
    return this.httpClient.put(`${BASEURL}/menus/update`, body)
  }

  Delete(id): Observable<any> {
    return this.httpClient.delete(`${BASEURL}/menus/delete`, {
      params: new HttpParams()
      .set('_id', id)
    })
  }

  GetAllMenus(): Observable<any> {
    return this.httpClient.get(`${BASEURL}/menus/all`)
  }

  GetOneMenu(id): Observable<any> {
    return this.httpClient.get(`${BASEURL}/menus/one`, {
      params: new HttpParams()
        .set('_id', id)
    })
  }

  GetSingleMenu(id): Observable<any> {
    return this.httpClient.get(`${BASEURL}/menus/single`, {
      params: new HttpParams()
        .set('_id', id)
    })
  }

  GetSingleMenuCategory(id): Observable<any> {
    return this.httpClient.get(`${BASEURL}/menus/single/category`, {
      params: new HttpParams()
        .set('_id', id)
    })
  }

}
