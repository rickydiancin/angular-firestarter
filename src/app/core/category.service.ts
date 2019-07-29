import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASEURL = environment.BASEURL;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  GetAllCategories(): Observable<any> {
    return this.httpClient.get(`${BASEURL}/category/all`)
  }

  ImportNewCategories(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/category/new/import`, body);
  }

  NewCategory(body, imageFile): Observable<any> {
    return this.httpClient.post(`${BASEURL}/category/new`, imageFile, {
      params: new HttpParams()
      .set('body', JSON.stringify(body))
    });
  }

  UpdateCategory(body, imageFile): Observable<any> {
    return this.httpClient.put(`${BASEURL}/category/update`, imageFile, {
      params: new HttpParams()
      .set('body', JSON.stringify(body))
    });
  }

  GetSingleCategory(slug): Observable<any> {
    return this.httpClient.get(`${BASEURL}/category/single`, {
      params: new HttpParams()
              .set('slug', slug)
    })
  }

  DeleteSingleCategory(_id): Observable<any> {
    return this.httpClient.delete(`${BASEURL}/category/single/delete`, {
      params: new HttpParams()
              .set('_id', _id)
    }).pipe()
  }

  // solution

  NewSolution(body, imageFile): Observable<any> {
    return this.httpClient.post(`${BASEURL}/solution/new`, imageFile, {
      params: new HttpParams()
              .set('body', JSON.stringify(body))
    });
  }

  GetAllSolutions(): Observable<any> {
    return this.httpClient.get(`${BASEURL}/solution/all`);
  }

  GetOneSolution(index): Observable<any> {
    return this.httpClient.get(`${BASEURL}/solution/single`, {
      params: new HttpParams()
              .set('index', index)
    }).pipe()
  }

  UpdateSolution(body, imageFile): Observable<any> {
    return this.httpClient.put(`${BASEURL}/solution/update`, imageFile, {
      params: new HttpParams()
        .set('body', JSON.stringify(body))
    });
  }

  DeleteSingleSolution(index): Observable<any> {
    return this.httpClient.delete(`${BASEURL}/solution/single/delete`, {
      params: new HttpParams()
              .set('index', index)
    }).pipe()
  }

  // banner

  NewBanner(body, formData): Observable<any> {
    return this.httpClient.post(`${BASEURL}/banner/new`, formData, {
      params: new HttpParams()
        .set('body', JSON.stringify(body))
    });
  }

  GetAllBanner(): Observable<any> {
    return this.httpClient.get(`${BASEURL}/banner/all`);
  }

  GetOneBanner(index): Observable<any> {
    return this.httpClient.get(`${BASEURL}/banner/single`, {
      params: new HttpParams()
              .set('index', index)
    }).pipe()
  }

  UpdateBanner(body, formData): Observable<any> {
    return this.httpClient.put(`${BASEURL}/banner/update`, formData, {
      params: new HttpParams()
        .set('body', JSON.stringify(body))
    });
  }

  DeleteSingleBanner(index): Observable<any> {
    return this.httpClient.delete(`${BASEURL}/banner/single/delete`, {
      params: new HttpParams()
              .set('index', index)
    }).pipe()
  }

}
