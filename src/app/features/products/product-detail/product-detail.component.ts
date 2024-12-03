import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialoge-component/confirm-dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.getProduct(productId);
  }

  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
    });
  }

  openDeleteDialog(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this product?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.snackBar.open('Product deleted successfully!', 'Close', { duration: 3000, verticalPosition: 'top' });
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.snackBar.open('Failed to delete product. Please try again.', 'Close', { duration: 3000, verticalPosition: 'top' });
      },
    });
  }
}
