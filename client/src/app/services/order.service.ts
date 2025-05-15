import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


    placeOrder(data:any){
      return this.http.post<any>(`${environment.apiUrl}/order/create-order`,data)
            .pipe(map(user => {
                return user;
            }));
    }

    getMyOrders(id:any){
      return this.http.get<any>(`${environment.apiUrl}/order/get-orders-for-customer/${id}`)
            .pipe(map(user => {
                return user;
            }));
    }

    getOrderDetail(id:any){
      return this.http.get<any>(`${environment.apiUrl}/order/get-orders-details?id=${id}`)
            .pipe(map(user => {
                return user;
            }));
    }

    getAllCountry(){
      return this.http.get<any>(`https://restcountries.com/v3.1/all`)
            .pipe(map(user => {
                return user;
            }));
      
    }

    getAllOrders(){
      return this.http.get<any>(`${environment.apiUrl}/order/get-all-orders`)
            .pipe(map(user => {
                return user;
            }));
    }

    deleteOrder(id:any){
      return this.http.delete<any>(`${environment.apiUrl}/order/delete-order/${id}`)
            .pipe(map(user => {
                return user;
            }));
    }

    downloadFile(data:any, filename='data') {
      let csvData = this.ConvertToCSV(data, ['Invoice Number','Product Name','Product Description', 'Product Price', 'Address', 'Ordered By']);
      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", filename + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
  }
ConvertToCSV(objArray:any, headerList:any) {
       let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
       let str = '';
       let row = 'S.No,';
for (let index in headerList) {
           row += headerList[index] + ',';
       }
       row = row.slice(0, -1);
       str += row + '\r\n';
       for (let i = 0; i < array.length; i++) {
           let line = (i+1)+'';
           for (let index in headerList) {
              let head = headerList[index];
line += ',' + array[i][head];
           }
           str += line + '\r\n';
       }
       return str;
   }
}
