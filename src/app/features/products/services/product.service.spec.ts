import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Product } from 'src/app/models/product.model';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [ProductService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch products', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', category: 'Category', price: 100, stock: 10, description:'description',image:'image1' },
    ];

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should delete a product', () => {
    const mockProductId = 1;

    service.deleteProduct(mockProductId).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:3000/products/${mockProductId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
