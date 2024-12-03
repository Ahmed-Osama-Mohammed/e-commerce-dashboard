import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { Order } from 'src/app/models/order.model';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  const mockOrders: Order[] = [
    { id: 1, customerName: 'joe doe',items: ['phone'],totalAmount: 100,status: 'delivered'},
    { id: 2, customerName: 'Jane Smith', totalAmount: 200 ,items:['electronics'],status:'pending' },
  ];

  const mockOrder: Order = { id: 1, customerName: 'joe doe',items: ['phone'],totalAmount: 100,status: 'delivered' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all orders', () => {
    service.getOrders().subscribe((orders) => {
      expect(orders.length).toBe(2);
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne('http://localhost:3000/orders');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should fetch order by ID', () => {
    const orderId = 1;

    service.getOrderById(orderId).subscribe((order) => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne(`http://localhost:3000/orders/${orderId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrder);
  });

  it('should create a new order', () => {
    const newOrder: Order = { id: 3, customerName: 'Alice Johnson', totalAmount: 150 ,items:['anything'],status:'pending'};

    service.createOrder(newOrder).subscribe((order) => {
      expect(order).toEqual(newOrder);
    });

    const req = httpMock.expectOne('http://localhost:3000/orders');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newOrder);
    req.flush(newOrder);
  });

  it('should update an order', () => {
    const updatedOrder: Order = { id: 1, customerName: 'John Updated', totalAmount: 120 ,items:['updated'],status:'deliverd'};

    service.updateOrder(updatedOrder.id, updatedOrder).subscribe((order) => {
      expect(order).toEqual(updatedOrder);
    });

    const req = httpMock.expectOne(`http://localhost:3000/orders/${updatedOrder.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedOrder);
    req.flush(updatedOrder);
  });

  it('should delete an order', () => {
    const orderId = 1;
    const deletedOrder: Order = {id: 1, customerName: 'John Updated', totalAmount: 120 ,items:['updated'],status:'deliverd'}
  
    service.deleteOrder(orderId).subscribe((response) => {
      expect(response).toEqual(deletedOrder); 
    });
  
    const req = httpMock.expectOne(`http://localhost:3000/orders/${orderId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(deletedOrder); 
  });
  
});
