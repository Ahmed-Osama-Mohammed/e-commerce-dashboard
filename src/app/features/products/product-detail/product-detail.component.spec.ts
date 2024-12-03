import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialoge-component/confirm-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;
  const mockProduct = { id: 1, name: 'Test Product', description: 'Test Description', price: 100, category: 'Test Category', stock: 50, image: 'Test Image' };

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProductById', 'deleteProduct']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [MatDialogModule, MatSnackBarModule, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product on init', () => {
    productService.getProductById.and.returnValue(of(mockProduct));

    fixture.detectChanges();

    expect(component.product).toEqual(mockProduct);
    expect(productService.getProductById).toHaveBeenCalledWith(1);
  });

  it('should open delete dialog and handle confirmation', () => {
    const productId = 1;
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of('confirm') });
    dialog.open.and.returnValue(dialogRefSpy);
    productService.deleteProduct.and.returnValue(of());
    snackBar.open.and.stub();

    component.openDeleteDialog(productId);

    expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this product?' },
    });
    expect(productService.deleteProduct).toHaveBeenCalledWith(productId);
 
  });

  it('should open delete dialog and handle cancellation', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialog.open.and.returnValue(dialogRefSpyObj);
    dialogRefSpyObj.afterClosed.and.returnValue(of('cancel'));

    component.openDeleteDialog(1);

    expect(dialog.open).toHaveBeenCalled();
    expect(productService.deleteProduct).not.toHaveBeenCalled();
  });

  it('should handle error when deleting product', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialog.open.and.returnValue(dialogRefSpyObj);
    dialogRefSpyObj.afterClosed.and.returnValue(of('confirm'));

    const errorResponse = new Error('Delete failed');
    productService.deleteProduct.and.returnValue(throwError(() => errorResponse));

    component.openDeleteDialog(1);

    expect(dialog.open).toHaveBeenCalled();
    expect(productService.deleteProduct).toHaveBeenCalledWith(1);
    expect(snackBar.open).toHaveBeenCalledWith('Failed to delete product. Please try again.', 'Close', { duration: 3000, verticalPosition: 'top' });
  });
});
