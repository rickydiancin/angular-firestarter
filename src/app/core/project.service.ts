import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASEURL = environment.BASEURL;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private httpClient: HttpClient
  ) { }

  NewProject(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/project/create`, body)
  }

  GetAllProjects(): Observable<any> {
    return this.httpClient.get(`${BASEURL}/project/all`)
  }

  GetSingleProject(slug): Observable<any> {
    return this.httpClient.get(`${BASEURL}/project/single`, {
      params: new HttpParams()
        .set('slug', slug)
    })
  }

  // UpdateMenu(body): Observable<any> {
  //   return this.httpClient.put(`${BASEURL}/menus/update`, body)
  // }

  // Delete(id): Observable<any> {
  //   return this.httpClient.delete(`${BASEURL}/menus/delete`, {
  //     params: new HttpParams()
  //     .set('_id', id)
  //   })
  // }

  // GetAllMenus(): Observable<any> {
  //   return this.httpClient.get(`${BASEURL}/menus/all`)
  // }

  // GetSingleMenu(id): Observable<any> {
  //   return this.httpClient.get(`${BASEURL}/menus/single`, {
  //     params: new HttpParams()
  //       .set('_id', id)
  //   })
  // }

  // GetSingleMenuCategory(id): Observable<any> {
  //   return this.httpClient.get(`${BASEURL}/menus/single/category`, {
  //     params: new HttpParams()
  //       .set('_id', id)
  //   })
  // }

}
