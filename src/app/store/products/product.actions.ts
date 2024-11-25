import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const loadProducts = createAction(
  '[Product] Load Products',
  props<{
    pageIndex: number;
    pageSize: number;
    sortColumn: string;
    sortDirection: string;
  }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);

// Delete Product
export const deleteProduct = createAction('[Products] Delete Product', props<{ id: number }>());
export const deleteProductSuccess = createAction('[Products] Delete Product Success', props<{ id: number }>());
export const deleteProductFailure = createAction('[Products] Delete Product Failure', props<{ error: any }>());
