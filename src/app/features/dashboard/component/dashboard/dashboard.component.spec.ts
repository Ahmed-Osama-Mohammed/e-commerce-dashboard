import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../services/dashboard.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: jasmine.SpyObj<DashboardService>;

  const mockMetrics = {
    totalSales: 1000,
    totalOrders: 50,
    topSellingProduct: 'Product A'
  };
  beforeEach(() => {
    const dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getDashboardMetrics']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DashboardComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]  
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard metrics on init', () => {
  
    dashboardService.getDashboardMetrics.and.returnValue(of(mockMetrics));
    component.ngOnInit();
    expect(dashboardService.getDashboardMetrics).toHaveBeenCalled();
    expect(component.totalSales).toBe(mockMetrics.totalSales);
    expect(component.totalOrders).toBe(mockMetrics.totalOrders);
    expect(component.topSellingProduct).toBe(mockMetrics.topSellingProduct);
  });
});
