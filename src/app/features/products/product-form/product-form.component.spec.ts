import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Store, StoreModule } from '@ngrx/store'; // Import StoreModule
import { of } from 'rxjs';
import * as fromProductSelectors from 'src/app/store/products/product.selectors';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: ProductService;
  let mockActivatedRoute: any;
  let store: any;

  beforeEach(async () => {
    // Mock ActivatedRoute with a stub value for `id`
    mockActivatedRoute = {
      snapshot: { paramMap: { get: (key: string) => key === 'id' ? '1' : null } },
    };

    await TestBed.configureTestingModule({
    declarations: [ProductFormComponent],
    imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, StoreModule.forRoot({})],
    providers: [
        FormBuilder,
        ProductService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide the mocked route
        Router,
        provideHttpClient(withInterceptorsFromDi()),
    ]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService); // Inject the real ProductService
    store = TestBed.inject(Store); // Inject the store
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new product when form is submitted in add mode', () => {
    component.productForm.setValue({
      name: 'New Product',
      description: 'Product Description',
      price: 100,
      category: 'Category',
      stock: 10,
      image: 'image.jpg',
    });

    spyOn(productService, 'createProduct').and.returnValue(of({id:1,name: 'Updated Product',
      description: 'Updated Description',
      price: 150,
      category: 'Updated Category',
      stock: 20,
      image: 'updated-image.jpg'})); // Spy on the real createProduct method
    spyOn(store, 'select').and.returnValue(of([])); // Mock store.select to return an empty array

    component.onSubmit();

    expect(productService.createProduct).toHaveBeenCalled();
  });

  it('should show form errors if form is invalid and submitted', () => {
    component.productForm.setValue({
      name: '',
      description: '',
      price: -1, // Invalid price
      category: '',
      stock: -5, // Invalid stock
      image: '',
    });

    spyOn(productService, 'createProduct').and.returnValue(of({id:1,name: 'Updated Product',
      description: 'Updated Description',
      price: 150,
      category: 'Updated Category',
      stock: 20,
      image: 'updated-image.jpg'}));

    component.onSubmit();

    expect(component.productForm.invalid).toBeTrue(); // Ensure form is invalid
    expect(productService.createProduct).not.toHaveBeenCalled();
  });

  it('should update an existing product when form is submitted in edit mode', () => {
    component.productId = 1; // Simulate edit mode
    component.isEditMode = true;
    component.productForm.setValue({
      name: 'Updated Product',
      description: 'Updated Description',
      price: 150,
      category: 'Updated Category',
      stock: 20,
      image: 'updated-image.jpg',
    });

    spyOn(productService, 'updateProduct').and.returnValue(of({id:1,name: 'Updated Product',
      description: 'Updated Description',
      price: 150,
      category: 'Updated Category',
      stock: 20,
      image: 'updated-image.jpg'}));

    component.onSubmit();

    expect(productService.updateProduct).toHaveBeenCalledWith(1, component.productForm.value);
  });
});
