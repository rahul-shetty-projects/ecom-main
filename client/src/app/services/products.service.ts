import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


    getProducts(data:any){
      return this.http.post<any>(`${environment.apiUrl}/product/get-all-products`,data)
            .pipe(map(user => {
                return user;
            }));
    }

    getProductDetails(id:any){
      return this.http.get<any>(`${environment.apiUrl}/product/get-product-detail/${id}`)
            .pipe(map(user => {
                return user;
            }));
      
    }
}
