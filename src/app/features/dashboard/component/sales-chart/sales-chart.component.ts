import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); 
@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent {
  lineChartData = [
    { data: [0, 1000 , 3700, 8500 , 14250, 19820 , 25100], label: 'Sales' }
  ];
  lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors = [
    {
      backgroundColor: 'rgba(63, 81, 181, 0.2)',
      borderColor: 'rgba(63, 81, 181, 1)',
      pointBackgroundColor: 'rgba(63, 81, 181, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(63, 81, 181, 1)'
    }
  ];
}
