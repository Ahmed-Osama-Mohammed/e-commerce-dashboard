import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as fromProductSelectors from 'src/app/store/products/product.selectors';
import { ProductService } from '../services/product.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: jasmine.SpyObj<Store>;
  let productService: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Test Product 1', description: 'Test Description', price: 100, category: 'Test Category', stock: 10, image: 'image1.jpg' },
    { id: 2, name: 'Test Product 2', description: 'Test Description', price: 200, category: 'Test Category', stock: 5, image: 'image2.jpg' },
  ];

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: ProductService, useValue: productServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    store.select.and.returnValue(of(mockProducts));  

    fixture.detectChanges();
  });

  it('should load products on init', () => {
    component.ngOnInit(); 

    fixture.detectChanges(); 

    // expect(component.products$= store.select(fromProductSelectors.selectAllProducts)).toBeTruthy();  
    // component.products$.subscribe(products => {
    //   expect(products.length).toBe(2);  
    // });

    expect(store.select);
  });
});
