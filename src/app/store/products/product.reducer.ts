import { createReducer, on } from '@ngrx/store';
import * as fromProductActions from './product.actions';
import { Product } from 'src/app/models/product.model';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: any;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(fromProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(fromProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(fromProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(fromProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter((product) => product.id !== id),
  })),
  on(fromProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
