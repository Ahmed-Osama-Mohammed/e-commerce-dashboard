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
  isEditMode: boolean = false; // Flag to check if we are in edit mode
  orderId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    // Get the orderId from the route params, if available
    this.orderId = +this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = !!this.orderId; // Set isEditMode to true if orderId exists
    this.initializeForm();

    // If in edit mode, fetch the order data
    if (this.isEditMode) {
      this.orderService.getOrderById(this.orderId).subscribe({
        next: (order) => this.populateForm(order),
        error: (err) => console.error('Error fetching order:', err),
      });
    }
  }

  // Initialize the form with default values
  initializeForm(): void {
    this.orderForm = this.fb.group({
      customerName: ['', [Validators.required]],
      items: ['', [Validators.required]],
      totalAmount: [0, [Validators.required, Validators.min(0)]],
      status: ['', [Validators.required]],
    });
  }

  // Populate the form with existing order data (for edit mode)
  populateForm(order: Order): void {
    this.orderForm.patchValue({
      customerName: order.customerName,
      items: order.items.join(', '),
      totalAmount: order.totalAmount,
      status: order.status,
    });
  }

  // Handle form submission (add or update order)
  onSubmit(): void {
    if (this.orderForm.invalid) return;

    const orderData = this.orderForm.value;

    // Create or update the order
    const order: Order = {
      ...orderData,
      items: orderData.items.split(',').map((item: string) => item.trim()), // Convert items back to array
      id: this.isEditMode ? this.orderId : undefined, // Only add id for update
    };

    if (this.isEditMode) {
      // Update the existing order
      this.orderService.updateOrder(this.orderId, order).subscribe({
        next: () => {
          console.log('Order updated successfully');
          this.router.navigate(['/orders']);
        },
        error: (err) => console.error('Error updating order:', err),
      });
    } else {
      // Add a new order
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
