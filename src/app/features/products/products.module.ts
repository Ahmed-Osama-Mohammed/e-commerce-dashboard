import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from 'src/app/store/products/product.reducer';
import { ProductEffects } from 'src/app/store/products/product.effects';

import { ReactiveFormsModule } from '@angular/forms';

import { ProductService } from './services/product.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductFormComponent,
    ], 
    imports: [CommonModule,
        ProductsRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatSelectModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        SharedModule,
        StoreModule.forFeature('products', productReducer),
        EffectsModule.forFeature([ProductEffects])], providers: [
        ProductService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class ProductsModule { }
