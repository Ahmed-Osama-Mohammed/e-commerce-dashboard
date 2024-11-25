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
  apiUrl="/.netlify/functions/json-server"
  constructor(private http: HttpClient) {}

  // Assuming there is an endpoint for orders and products
  getOrders(): Observable<any[]> {
    return this.http.get<[]>(`${this.apiUrl}/orders`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<Product[]>(this.apiUrl);
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

  private calculateTotalSales(orders: any[]): number {
    return orders.reduce((sum, order) => sum + order.totalAmount, 0);
  }

  private calculateTopSellingProduct(orders: any[]): string {
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
