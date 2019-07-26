import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const BASEURL = environment.BASEURL;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  GetAllProductByCategory(slug): Observable<any> {
    return this.httpClient.get(`${BASEURL}/product/category/all`, {
      params: new HttpParams()
        .set('slug', slug)
    });
  }

  GetAllProducts(): Observable<any> {
    return this.httpClient.get(`${BASEURL}/product/all`);
  }

  ImportNewProduct(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/product/new/import`, body);
  }

  NewProduct(body): Observable<any> {
    return this.httpClient.post(`${BASEURL}/product/new`, body);
  }

  UpdateProduct(body): Observable<any> {
    return this.httpClient.put(`${BASEURL}/product/update`, body);
  }

  GetSingleProduct(index): Observable<any> {
    return this.httpClient.get(`${BASEURL}/product/single`, {
      params: new HttpParams()
              .set('index', index)
    }).pipe()
  }

  DeleteSingleProduct(_id): Observable<any> {
    return this.httpClient.delete(`${BASEURL}/product/single/delete`, {
      params: new HttpParams()
              .set('_id', _id)
    }).pipe()
  }

}
