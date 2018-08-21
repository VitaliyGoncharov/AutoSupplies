import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  headers = new HttpHeaders({
    'Content-Type':"application/json"
  });

  constructor(private http: HttpClient) { }

  private _url = "/api/manager/order";
  private UPDATE_PRODUCT_AMOUNT = "/api/manager/order/product/amount/edit";
  private DELETE_PRODUCT = "/api/manager/order/product/delete";

  findById(id: number) {
    let params = new HttpParams().set("id", id.toString());
    let options = {
      params: params
    }
    return this.http.get(this._url, options);
  }

  updateProductAmount(amount: number, orderId: number, productId: number) {
    let body = {
      "amount": amount.toString(),
      "orderId": orderId.toString(),
      "productId": productId.toString()
    }
    let options = {
      headers: this.headers
    }
    return this.http.post(this.UPDATE_PRODUCT_AMOUNT, body, options);
  }
  
  deleteProduct(orderId: number, productId: number) {
    let body = {
      "orderId": orderId.toString(),
      "productId": productId.toString()
    }
    let options = {
      headers: this.headers
    }
    return this.http.post(this.DELETE_PRODUCT, body, options);
  }
}
