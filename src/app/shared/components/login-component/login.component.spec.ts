import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { of, BehaviorSubject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authService = jasmine.createSpyObj('AuthService', ['getUser']);
    authService.loggedIn = new BehaviorSubject<boolean>(false);

    TestBed.configureTestingModule({
      imports:[MatCardModule,MatFormFieldModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should set error message and not navigate if login fails', () => {
    component.username = 'testUser';
    component.password = 'wrongPass';
    authService.getUser.and.returnValue(of([{ username: 'testUser', password: 'testPass' }]));

    component.onLogin();

    expect(component.errorMessage).toBe('Invalid username or password.');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to products if login is successful', () => {
    component.username = 'testUser';
    component.password = 'testPass';
    authService.getUser.and.returnValue(of([{ username: 'testUser', password: 'testPass' }]));
    spyOn(window, 'scrollTo');

    component.onLogin();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should set error message if username or password is missing', () => {
    component.username = '';
    component.password = 'testPass';

    component.onLogin();

    expect(component.errorMessage).toBe('Please enter both username and password.');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
