import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    category: 'Test Category',
    stock: 10,
    image: 'test-image.jpg',
  };

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProductById']);

    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }, // Mock route with ID
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    productService.getProductById.and.returnValue(of(mockProduct));  // Mock service call

    fixture.detectChanges();
  });

  it('should fetch product details on init', () => {
    component.ngOnInit();  // Trigger ngOnInit

    fixture.detectChanges();  // Re-render the component

    expect(component.product).toEqual(mockProduct);
    expect(productService.getProductById).toHaveBeenCalledWith(1);  // Ensure correct productId is passed
  });

  it('should not fetch product if no id is provided', () => {
    spyOn(ActivatedRoute.prototype.snapshot.paramMap, 'get').and.returnValue(null);  // Simulate no ID in route

    component.ngOnInit();  // Trigger ngOnInit

    fixture.detectChanges();  // Re-render the component

    expect(component.product).toBeNull();  // No product should be set
    expect(productService.getProductById).not.toHaveBeenCalled();  // Ensure service is not called
  });
});
