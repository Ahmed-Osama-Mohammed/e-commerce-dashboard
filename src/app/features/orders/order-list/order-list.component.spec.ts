import { TestBed, ComponentFixture } from '@angular/core/testing';
import { OrderListComponent } from './order-list.component';
import { OrderService } from '../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const orderServiceMock = jasmine.createSpyObj('OrderService', ['getOrders', 'updateOrder', 'deleteOrder']);
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        OrderListComponent
      ],
      providers: [
        { provide: OrderService, useValue: orderServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '1' : null)
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    orderServiceSpy = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on initialization', () => {
    const mockOrders = [
      { id: 1, customerName: 'John Doe', items: ['item1'], totalAmount: 100, status: 'Pending' },
      { id: 2, customerName: 'Jane Doe', items: ['item2'], totalAmount: 200, status: 'Completed' }
    ];

    orderServiceSpy.getOrders.and.returnValue(of(mockOrders));
    fixture.detectChanges();

    expect(orderServiceSpy.getOrders).toHaveBeenCalled();
    expect(component.orders).toEqual(mockOrders);
  });



  it('should update order status', () => {
    const mockOrder = { id: 1, customerName: 'John Doe', items: ['item1'], totalAmount: 100, status: 'Pending' };
    orderServiceSpy.updateOrder.and.returnValue(of(mockOrder));

    component.onStatusChange(mockOrder, 'Completed');

    expect(orderServiceSpy.updateOrder).toHaveBeenCalledWith(component.orderId, mockOrder);
    expect(mockOrder.status).toBe('Completed');
  });

  it('should navigate to edit order page', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    const mockOrder = { id: 1, customerName: 'John Doe', items: ['item1'], totalAmount: 100, status: 'Pending' };

    component.onEdit(mockOrder);

    expect(navigateSpy).toHaveBeenCalledWith(['/orders/edit', mockOrder.id]);
  });

  it('should open delete dialog and delete order on confirmation', () => {
    const dialogRefMock = {
      afterClosed: () => of('confirm')
    } as any;

    dialogSpy.open.and.returnValue(dialogRefMock);
    orderServiceSpy.deleteOrder.and.returnValue(of({ id: 1, customerName: 'John Doe', items: ['item1'], totalAmount: 100, status: 'Pending' }));
    const loadOrdersSpy = spyOn(component, 'loadOrders');

    component.openDeleteDialog(1);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(orderServiceSpy.deleteOrder).toHaveBeenCalledWith(1);
    expect(loadOrdersSpy).toHaveBeenCalled();
  });

  it('should not delete order if dialog is canceled', () => {
    const dialogRefMock = {
      afterClosed: () => of(null)
    } as any;

    dialogSpy.open.and.returnValue(dialogRefMock);

    component.openDeleteDialog(1);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(orderServiceSpy.deleteOrder).not.toHaveBeenCalled();
  });
});
