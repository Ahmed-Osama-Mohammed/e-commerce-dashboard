import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/models/order.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialoge-component/confirm-dialog.component';
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';  
import { MatOptionModule } from '@angular/material/core'; 
import { CommonModule } from '@angular/common'; 
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    RouterModule,        
    MatTableModule,       
    MatButtonModule,     
    MatSelectModule,      
    MatIconModule,        
    MatOptionModule,     
    CommonModule, 
    SharedModule        
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  // Using DI for services
  private orderService = inject(OrderService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  orders: Order[] = [];
  displayedColumns: string[] = ['customerName', 'items', 'totalAmount', 'status', 'actions'];
  orderId!: number;

  constructor() {}

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')! + 1;
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data.map(order => ({
          ...order,
          items: order.items || []  // Ensure items is always an array
        }));
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  onStatusChange(order: Order, status: string): void {
    order.status = status;
    this.orderService.updateOrder(this.orderId, order).subscribe();
  }

  // onEdit method with navigation logic
  onEdit(order: Order): void {
    this.router.navigate(['/orders/edit', order.id]);
  }

  openDeleteDialog(orderId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this order?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.deleteOrder(orderId);
      }
    });
  }

  // onDelete method with API call and reloading orders
  deleteOrder(orderId: number): void {
    console.log('Delete order with ID:', orderId);
    // Call the delete method from OrderService
    this.orderService.deleteOrder(orderId).subscribe(
      () => {
        console.log('Order deleted successfully');
        // Reload orders after deletion
        this.loadOrders();
      },
      (error: any) => {
        console.error('Error deleting order:', error);
      }
    );
  }
}
