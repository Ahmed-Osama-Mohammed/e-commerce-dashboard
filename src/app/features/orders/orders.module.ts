import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { OrderService } from './services/order.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { OrderFormComponent } from './order-form/order-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({ declarations: [
        
        OrderFormComponent,
    ], imports: [CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule,
        OrdersRoutingModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        SharedModule], providers: [
        OrderService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class OrdersModule { }
