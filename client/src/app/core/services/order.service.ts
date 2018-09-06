import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { AuthService } from './auth.service';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  headers = new HttpHeaders({
    "Content-Type":"application/json"
  });

  constructor(private http: HttpClient, private authS: AuthService) { }

  private FIND_BY_ID = "/api/manager/order";
  private FIND_ALL_ORDERS = "api/manager/orders";
  private ADD_ORDER = "/api/manager/order/add";
  private SAVE_ORDER = "/api/manager/order/products/update";
  private UPDATE_PRODUCT_AMOUNT = "/api/manager/order/product/amount/edit";
  private ADD_PRODUCT = "/api/manager/order/product/add";
  private DELETE_PRODUCT = "/api/manager/order/product/delete";

  addAuthHeader(headers: HttpHeaders) {
    return headers.append("Authorization", localStorage.getItem('access_token'));
  }

  findAll() {
    let options = { headers: this.addAuthHeader(this.headers) }
    return this.http.get(this.FIND_ALL_ORDERS, options);
  }

  findById(id: number) {
    let params = new HttpParams().set("id", id.toString());
    let options = {
      params: params,
      headers: this.addAuthHeader(this.headers)
    }
    return this.http.get(this.FIND_BY_ID, options);
  }

  add(body) {
    let options = { headers: this.addAuthHeader(this.headers) };
    return this.http.post(this.ADD_ORDER, body, options);
  }

  updateProductAmount(amount: number, orderId: number, productId: number) {
    let body = {
      "amount": amount.toString(),
      "orderId": orderId.toString(),
      "productId": productId.toString()
    }
    let options = { headers: this.addAuthHeader(this.headers) }
    return this.http.post(this.UPDATE_PRODUCT_AMOUNT, body, options);
  }
  
  deleteProduct(orderId: number, productId: number) {
    let body = {
      "orderId": orderId.toString(),
      "productId": productId.toString()
    }
    let options = { headers: this.addAuthHeader(this.headers) }
    return this.http.post(this.DELETE_PRODUCT, body, options);
  }

  addProduct(orderId: number, productId: number, amount: number) {
    let body = {
      "orderId": orderId.toString(),
      "productId": productId.toString(),
      "amount": amount.toString()
    }
    let options = { headers: this.addAuthHeader(this.headers) };
    return this.http.post(this.ADD_PRODUCT, body, options);
  }

  save(products: Array<{product: Item, amount: number}>) {
    let body = products;
    let options = { headers: this.addAuthHeader(this.headers) };
    console.log(products);
    return this.http.post(this.SAVE_ORDER, body, options);
  }
}
