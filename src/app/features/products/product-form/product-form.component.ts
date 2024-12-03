// src/app/components/product-form/product-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Store } from '@ngrx/store';
import * as fromProductSelectors from 'src/app/store/products/product.selectors';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: UntypedFormGroup; 
  productId: number | null = null; 
  isEditMode: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.productForm = this.fb.group({
      name: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', [Validators.required]),
      price: new UntypedFormControl(0, [Validators.required, Validators.min(0)]),
      category: new UntypedFormControl('', [Validators.required]),
      stock: new UntypedFormControl(0, [Validators.required, Validators.min(0)]),
      image: new UntypedFormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')); 
    if (this.productId) {
      this.isEditMode = true;
      this.productService.getProductById(this.productId).subscribe((product) => {
        this.productForm.patchValue(product); 
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.isEditMode) {
        const updatedProduct = {
          ...this.productForm.value,
          id: this.productId!,
        };
  
        this.productService.updateProduct(this.productId!, updatedProduct).subscribe(() => {
          this.router.navigate(['/products']);
        });
      } else {
        const createdProduct: Product = this.productForm.value;
        let products: Observable<Product[]> = this.store.select(fromProductSelectors.selectAllProducts);
  
        products.subscribe((products) => {
          const length = products.length;
          createdProduct.id = length + 1; 
          this.productService.createProduct(createdProduct).subscribe(() => {
            this.router.navigate(['/products']);
          });
        });
      }
    }
  }
  
  
}
