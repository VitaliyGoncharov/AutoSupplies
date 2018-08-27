import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '../../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  headers = new HttpHeaders({
    'Content-Type':"application/json"
  });

  constructor(private http: HttpClient) { }

  private FIND_BY_ID = "/api/manager/order";
  private FIND_ALL_ORDERS = "api/manager/orders";
  private UPDATE_PRODUCT_AMOUNT = "/api/manager/order/product/amount/edit";
  private ADD_PRODUCT = "/api/manager/order/product/add";
  private DELETE_PRODUCT = "/api/manager/order/product/delete";

  findAll() {
    return this.http.get(this.FIND_ALL_ORDERS);
  }

  findById(id: number) {
    let params = new HttpParams().set("id", id.toString());
    let options = {
      params: params
    }
    return this.http.get(this.FIND_BY_ID, options);
  }

  updateProductAmount(amount: number, orderId: number, productId: number) {
    let body = {
      "amount": amount.toString(),
      "orderId": orderId.toString(),
      "productId": productId.toString()
    }
    let options = { headers: this.headers }
    return this.http.post(this.UPDATE_PRODUCT_AMOUNT, body, options);
  }
  
  deleteProduct(orderId: number, productId: number) {
    let body = {
      "orderId": orderId.toString(),
      "productId": productId.toString()
    }
    let options = { headers: this.headers }
    return this.http.post(this.DELETE_PRODUCT, body, options);
  }

  addProduct(orderId: number, productId: number, amount: number) {
    let body = {
      "orderId": orderId.toString(),
      "productId": productId.toString(),
      "amount": amount.toString()
    }
    let options = { headers: this.headers };
    return this.http.post(this.ADD_PRODUCT, body, options);
  }
}
