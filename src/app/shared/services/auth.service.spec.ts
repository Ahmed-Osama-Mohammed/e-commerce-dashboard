import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
  });
  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user', () => {
    const mockUsers = [{username: "username", password: "password",id:1}]
    service.getUser().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); 
  });
 
  it('should return true if "logged" in localStorage is true', () => {
    localStorage.setItem('logged', 'true');
    const result = service.isLoggedIn();
    expect(result).toBeTrue();
  });

  it('should return false if "logged" in localStorage is false', () => {
    localStorage.setItem('logged', 'false');
    const result = service.isLoggedIn();
    expect(result).toBeFalse();
  });

  it('should return false if "logged" is not set in localStorage', () => {
    const result = service.isLoggedIn();
    expect(result).toBeFalse();
  });

  it('should throw an error if "logged" contains invalid JSON', () => {
    localStorage.setItem('logged', 'invalid-json');
    expect(() => service.isLoggedIn()).toThrowError(SyntaxError);
  });

  it('should remove "authToken" from localStorage', () => {
    localStorage.setItem('authToken', 'dummy-token');
    service.logout();
    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('should remove "logged" from localStorage', () => {
    localStorage.setItem('logged', 'true');
    service.logout();
    expect(localStorage.getItem('logged')).toBeNull();
  });

  it('should navigate to the login page', () => {
    service.logout();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set loggedIn to false', () => {
    service.logout();
    service.loggedIn.subscribe((value: boolean) => {
        expect(value).toBeFalse();
    });
  });


});
