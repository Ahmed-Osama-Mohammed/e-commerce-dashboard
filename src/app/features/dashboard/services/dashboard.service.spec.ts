import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { of } from 'rxjs';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  const mockOrders: any  = [
    { id: 1, customerName: 'joe doe',items: ['phone'],totalAmount: 100,status: 'delivered'},
    { id: 2, customerName: 'Jane Smith', totalAmount: 300 ,items:['electronics'],status:'pending' },
    { id: 3, customerName: 'Jane Smith', totalAmount: 200 ,items:['phone'],status:'pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    });    service = TestBed.inject(DashboardService);
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
      expect(orders.length).toBe(3);
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne('http://localhost:3000/orders');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should return dashboard metrics',() => {
    spyOn(service, 'getOrders').and.returnValue(of(mockOrders));
    service.getDashboardMetrics().subscribe((metrics) => {
      expect(metrics.totalOrders).toBe(3);
      expect(metrics.totalSales).toBe(600);
      expect(metrics.topSellingProduct).toEqual('phone')
    })
  });

  it('should calculate total sales correctly', () => {
   const totalSales=service.calculateTotalSales((mockOrders))
    expect(totalSales).toBe(600);
  });

  it('should calculate top product sales correctly', () => {
    const topSellingProduct=service.calculateTopSellingProduct(mockOrders)
    expect(topSellingProduct).toBe('phone')
  })

});
