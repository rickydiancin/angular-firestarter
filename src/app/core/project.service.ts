import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASEURL = environment.BASEURL;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  _listener: any = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  AddProductToProject(product, projectID): Observable<any> {
    return this.httpClient.post(`${BASEURL}/project/product/add`, product, {
      params: new HttpParams()
        .set('projectID', projectID)
    });
  }

  RemoveToProject(product, projectID): Observable<any> {
    return this.httpClient.post(`${BASEURL}/project/product/remove`, product, {
      params: new HttpParams()
        .set('projectID', projectID)
    });
  }

  NewProject(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/project/create`, body)
  }

  UpdateProject(body): Observable<any> {
    return this.httpClient.put(`${BASEURL}/project/update`, body)
  }

  Deleteproject(_id): Observable<any> {
    return this.httpClient.delete(`${BASEURL}/project/delete`, {
      params: new HttpParams()
        .set('_id', _id)
    })
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

  listen(): Observable<any> {
    return this._listener.asObservable();
  }

  listener(data) {
    this._listener.next(data);
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
