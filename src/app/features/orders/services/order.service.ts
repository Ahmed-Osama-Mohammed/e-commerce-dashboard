import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';  

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; 

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrder(orderId: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, order);
  }
  

  deleteOrder(orderId: number): Observable<Order> {
    return this.http.delete<Order>(`${this.apiUrl}/${orderId}`);
  }
}
