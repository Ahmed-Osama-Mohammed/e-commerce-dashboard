import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Store } from '@ngrx/store';
import * as fromProductSelectors from 'src/app/store/products/product.selectors';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let store: jasmine.SpyObj<Store>;
  let router: jasmine.SpyObj<Router>;
  const mockProduct: Product = { id: 1, name: 'Test Product', description: 'A sample product', price: 100, category: 'Category 1', stock: 10, image: 'image.jpg' };

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProductById', 'createProduct', 'updateProduct']);
    const storeSpy = jasmine.createSpyObj('Store', ['select']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1', // Simulating a route parameter for editing
              },
            },
          },
        },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

 it('should load product data in edit mode', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test description',
    price: 100,
    category: 'Test Category',
    stock: 10,
    image: 'test-image.jpg',
  };

  productService.getProductById.and.returnValue(of(mockProduct));
  component.ngOnInit();

  expect(component.productForm.value).toEqual({
    name: mockProduct.name,
    description: mockProduct.description,
    price: mockProduct.price,
    category: mockProduct.category,
    stock: mockProduct.stock,
    image: mockProduct.image,
  });

  expect(component.productId).toBe(mockProduct.id);
});

it('should update a product when form is submitted in edit mode', () => {
  component.isEditMode = true;
  component.productId = 1;

  const mockFormData = {
    name: 'Updated Product',
    description: 'Updated description',
    price: 300,
    category: 'Updated Category',
    stock: 50,
    image: 'updated-image.jpg',
  };

  const expectedProduct = {
    ...mockFormData,
    id: 1, 
  };

  productService.updateProduct.and.returnValue(of(expectedProduct));
  router.navigate.and.returnValue(Promise.resolve(true));

  component.productForm.setValue(mockFormData);
  component.onSubmit();

  expect(productService.updateProduct).toHaveBeenCalledWith(1, expectedProduct);
  expect(router.navigate).toHaveBeenCalledWith(['/products']);
});

  
  it('should update a product when form is submitted in edit mode', () => {
    component.isEditMode = true;
    component.productId = 1;
  
    const updatedProduct = {
      id: 1,
      name: 'Updated Product',
      description: 'Updated description',
      price: 300,
      category: 'Updated Category',
      stock: 50,
      image: 'updated-image.jpg',
    };
  
    productService.updateProduct.and.returnValue(of(updatedProduct)); 
  
    component.productForm.setValue({
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      category: updatedProduct.category,
      stock: updatedProduct.stock,
      image: updatedProduct.image,
    });
  
    component.onSubmit();
  
    expect(productService.updateProduct).toHaveBeenCalledWith(1, updatedProduct);
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });
  
  

  it('should update a product when form is submitted in edit mode', () => {
    component.isEditMode = true;
    component.productId = 1;
  
    const updatedProduct = {
      id:component.productId,
      name: 'Updated Product',
      description: 'Updated description',
      price: 300,
      category: 'Updated Category',
      stock: 50,
      image: 'updated-image.jpg',
    };
  
    productService.updateProduct.and.returnValue(of(updatedProduct));
  
    component.productForm.setValue({
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      category: updatedProduct.category,
      stock: updatedProduct.stock,
      image: updatedProduct.image,
    });
  
    component.onSubmit();
  
    expect(productService.updateProduct).toHaveBeenCalledWith(1, updatedProduct);
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });
  

  it('should not submit the form if it is invalid', () => {
    component.productForm.controls['name'].setValue('');
    component.onSubmit();

    expect(productService.createProduct).not.toHaveBeenCalled();
    expect(productService.updateProduct).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
