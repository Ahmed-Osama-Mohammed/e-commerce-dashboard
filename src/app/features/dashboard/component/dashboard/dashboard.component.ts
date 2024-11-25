import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalSales: number = 0;
  totalOrders: number = 0;
  topSellingProduct: string = '';
  kpis = [
    { title: 'Users', value: '3.9K', trend: 2.5 },
    { title: 'Sessions', value: '6.3K', trend: 4.6 },
    { title: 'Bounce Rate', value: '9.49%', trend: -5.5 },
    { title: 'Session Duration', value: '4m 03s', trend: 3.2 },
  ];
  usersByCountryData = [
    { country: 'USA', users: 120 },
    { country: 'UK', users: 85 },
    { country: 'India', users: 200 },
    { country: 'Canada', users: 45 },
    { country: 'Germany', users: 60 }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardMetrics();
  }

  loadDashboardMetrics(): void {
    this.dashboardService.getDashboardMetrics().subscribe((metrics) => {
      this.totalSales = metrics.totalSales;
      this.totalOrders = metrics.totalOrders;
      this.topSellingProduct = metrics.topSellingProduct;
    });
  }
}
