import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/models/order.model';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  isEditMode: boolean = false;
  orderId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = !!this.orderId; 
    this.initializeForm();

    if (this.isEditMode) {
      this.orderService.getOrderById(this.orderId).subscribe({
        next: (order) => this.populateForm(order),
        error: (err) => console.error('Error fetching order:', err),
      });
    }
  }

  initializeForm(): void {
    this.orderForm = this.fb.group({
      customerName: ['', [Validators.required]],
      items: ['', [Validators.required]],
      totalAmount: [0, [Validators.required, Validators.min(0)]],
      status: ['', [Validators.required]],
    });
  }

  populateForm(order: Order): void {
    this.orderForm.patchValue({
      customerName: order.customerName,
      items: order.items.join(', '),
      totalAmount: order.totalAmount,
      status: order.status,
    });
  }

  onSubmit(): void {
    if (this.orderForm.invalid) return;
    const orderData = this.orderForm.value;
    const order: Order = {
      ...orderData,
      items: orderData.items.split(',').map((item: string) => item.trim()),
      id: this.isEditMode ? this.orderId : undefined, 
    };

    if (this.isEditMode) {
      this.orderService.updateOrder(this.orderId, order).subscribe({
        next: () => {
          console.log('Order updated successfully');
          this.router.navigate(['/orders']);
        },
        error: (err) => console.error('Error updating order:', err),
      });
    } else {
      this.orderService.createOrder(order).subscribe({
        next: () => {
          console.log('Order created successfully');
          this.router.navigate(['/orders']);
        },
        error: (err) => console.error('Error creating order:', err),
      });
    }
  }
}
