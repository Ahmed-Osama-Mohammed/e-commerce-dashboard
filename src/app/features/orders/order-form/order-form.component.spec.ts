import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderFormComponent } from './order-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';


describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  const mockOrder: Order = {
    customerName: 'John Doe',
    id: 1,
    items: ['Apple iPhone 14', 'Sony WH-1000XM5'],
    status: 'Shipped',
    totalAmount: 1349
  };

  beforeEach(() => {
    const orderService = jasmine.createSpyObj('OrderService', ['getOrderById', 'createOrder', 'updateOrder']);
    const router = jasmine.createSpyObj('Router', ['navigate']);
    
    orderService.getOrderById.and.returnValue(of(mockOrder));
    orderService.createOrder.and.returnValue(of(null));
    orderService.updateOrder.and.returnValue(of(null));
  
    const activatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    } as unknown as ActivatedRoute;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,MatSelectModule,MatFormFieldModule,BrowserAnimationsModule,MatInputModule],
      declarations: [OrderFormComponent],
      providers: [
        FormBuilder,
        { provide: OrderService, useValue: orderService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;

    orderServiceSpy = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRouteSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and populate data when in edit mode', () => {
    fixture.detectChanges();
    expect(component.isEditMode).toBeTrue();
    expect(orderServiceSpy.getOrderById).toHaveBeenCalledWith(1);
    expect(component.orderForm.value.customerName).toBe(mockOrder.customerName);
    
    expect(component.orderForm.value.items).toBe(mockOrder.items.join(', '));
    expect(component.orderForm.value.totalAmount).toBe(mockOrder.totalAmount);
    expect(component.orderForm.value.status).toBe(mockOrder.status);
  });

  it('should call createOrder when form is submitted in add mode', () => {
    fixture.detectChanges();
  
    component.orderForm.setValue({
      customerName: 'John Doe',
      items: 'item1, item2',
      totalAmount: 100,
      status: 'Shipped',
    });
  
    component.isEditMode = false;
    component.onSubmit();
  
    expect(orderServiceSpy.createOrder).toHaveBeenCalledWith(jasmine.objectContaining({
      customerName: 'John Doe',
      items: ['item1', 'item2'],
      totalAmount: 100,
      status: 'Shipped',
    }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/orders']);
  });

  it('should call updateOrder when form is submitted in edit mode', () => {
    fixture.detectChanges();
    component.orderForm.setValue({
      customerName: 'John Doe',
      items: 'item1, item2',
      totalAmount: 100,
      status: 'Shipped',
    });
    component.isEditMode = true;
    component.onSubmit();
    expect(orderServiceSpy.updateOrder).toHaveBeenCalledWith(1, jasmine.objectContaining({
      customerName: 'John Doe',
      items: ['item1', 'item2'],
      totalAmount: 100,
      status: 'Shipped',
    }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/orders']);
  });

  it('should handle error when fetching order data', () => {
    orderServiceSpy.getOrderById.and.returnValue(throwError(() => new Error('Error fetching order')));
    fixture.detectChanges();
    expect(component.isEditMode).toBeTrue();
  });
});
