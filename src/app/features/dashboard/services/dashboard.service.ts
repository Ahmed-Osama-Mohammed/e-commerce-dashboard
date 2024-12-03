import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrl='http://localhost:3000'
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<[]>(`${this.apiUrl}/orders`);
  }


  getDashboardMetrics(): Observable<any> {
    return this.getOrders().pipe(
      map(orders => {
        const totalSales = this.calculateTotalSales(orders);
        const totalOrders = orders.length;
        const topSellingProduct = this.calculateTopSellingProduct(orders);

        return {
          totalSales,
          totalOrders,
          topSellingProduct
        };
      })
    );
  }

   calculateTotalSales(orders: any[]): number {
    return orders.reduce((sum, order) => sum + order.totalAmount, 0);
  }

   calculateTopSellingProduct(orders: any[]): string {
    const productsSold:any = {};

    orders.forEach((order:Order) => {
      order.items.forEach(item => {
        productsSold[item] = (productsSold[item] || 0) + 1;
      });
    });

    const bestSeller = Object.keys(productsSold).reduce((a, b) => productsSold[a] > productsSold[b] ? a : b);
    return bestSeller;
  }
}
