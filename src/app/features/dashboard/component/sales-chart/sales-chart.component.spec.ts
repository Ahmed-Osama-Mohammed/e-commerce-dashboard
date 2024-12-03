import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesChartComponent } from './sales-chart.component';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';

describe('SalesChartComponent', () => {
  let component: SalesChartComponent;
  let fixture: ComponentFixture<SalesChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule,BaseChartDirective],
      declarations: [SalesChartComponent]
    });
    fixture = TestBed.createComponent(SalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
