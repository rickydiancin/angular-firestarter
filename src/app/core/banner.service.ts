import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASEURL = environment.BASEURL;

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private httpClient: HttpClient
  ) { }
  
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
