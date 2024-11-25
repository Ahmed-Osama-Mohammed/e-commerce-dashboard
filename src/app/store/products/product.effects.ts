import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromProductActions from './product.actions';
import { ProductService } from 'src/app/features/products/services/product.service';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => fromProductActions.loadProductsSuccess({ products })),
          catchError((error) => of(fromProductActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProductActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map(() => fromProductActions.deleteProductSuccess({ id })),
          catchError((error) => of(fromProductActions.deleteProductFailure({ error })))
        )
      )
    )
  );
}
