import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASEURL = environment.BASEURL;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // post category

  NewPostCategory(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/post/category/create`, body);
  }

  UpdatePostCategory(body): Observable<any> {
    return this.httpClient.put(`${BASEURL}/post/category/update`, body);
  }

  GetAllPostCategory(): Observable<any> {
    return this.httpClient.get(`${BASEURL}/post/category/all`);
  }

  GetSinglePostCategory(index): Observable<any> {
    return this.httpClient.get(`${BASEURL}/post/category/single`, {
      params: new HttpParams()
        .set('index', index)
    });
  }

  DeletePostCategory(index): Observable<any> {
    return this.httpClient.delete(`${BASEURL}/post/category/delete`, {
      params: new HttpParams()
        .set('index', index)
    });
  }

  // post

  NewPost(body, imageFile): Observable<any> {
    return this.httpClient.post(`${BASEURL}/post/create`, imageFile, {
      params: new HttpParams()
        .set('body', JSON.stringify(body))
    });
  }

  UpdatePost(body, imageFile): Observable<any> {
    return this.httpClient.put(`${BASEURL}/post/update`, imageFile, {
      params: new HttpParams()
        .set('body', JSON.stringify(body))
    });
  }

  GetAllPost(): Observable<any> {
    return this.httpClient.get(`${BASEURL}/post/all`);
  }

  GetSinglePost(id): Observable<any> {
    return this.httpClient.get(`${BASEURL}/post/single`, {
      params: new HttpParams()
        .set('id', id)
    });
  }

  GetSinglePage(slug): Observable<any> {
    return this.httpClient.get(`${BASEURL}/post/single/page`, {
      params: new HttpParams()
        .set('slug', slug)
    });
  }

  DeletePost(index): Observable<any> {
    return this.httpClient.delete(`${BASEURL}/post/delete`, {
      params: new HttpParams()
        .set('index', index)
    });
  }

  GetLatestPost() {
    return this.httpClient.get(`${BASEURL}/post/latest`);
  }
  
}
