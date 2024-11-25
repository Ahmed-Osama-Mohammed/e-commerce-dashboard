import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective  } from 'ng2-charts';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './services/dashboard.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SalesChartComponent } from './component/sales-chart/sales-chart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // For loading indicators
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({ declarations: [
        DashboardComponent,
        SalesChartComponent,
    ],
    exports: [DashboardComponent], imports: [CommonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        BaseChartDirective ,
        DashboardRoutingModule,
        MatGridListModule], providers: [DashboardService, provideHttpClient(withInterceptorsFromDi())] })
export class DashboardModule { }
