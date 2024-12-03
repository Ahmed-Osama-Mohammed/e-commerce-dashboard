import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import * as fromProductActions from 'src/app/store/products/product.actions';
import * as fromProductSelectors from 'src/app/store/products/product.selectors';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialoge-component/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>([]); 
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'stock', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const pageIndex = this.paginator ? this.paginator.pageIndex : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 10;
    const sortColumn = this.sort ? this.sort.active : '';
    const sortDirection = this.sort ? this.sort.direction : 'asc';

    this.store.dispatch(fromProductActions.loadProducts({
      pageIndex,
      pageSize,
      sortColumn,
      sortDirection
    }));

    this.store
      .select(fromProductSelectors.selectAllProducts)
      .subscribe((products) => {
        this.dataSource.data = products ?? []; 
        if (this.paginator) {
          this.dataSource.paginator = this.paginator; 
        }
        if (this.sort) {
          this.dataSource.sort = this.sort; 
        }
      });
  }

  openDeleteDialog(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this product?' },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'confirm') {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(id: number): void {
    this.store.dispatch(fromProductActions.deleteProduct({ id }));
  }


}
