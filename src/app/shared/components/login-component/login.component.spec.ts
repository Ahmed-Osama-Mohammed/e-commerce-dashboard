import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getUser']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule, // For [(ngModel)]
        MatCardModule, // Material card
        MatInputModule, // Material input
        MatButtonModule, // Material button
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error if username or password is missing', () => {
    component.username = '';
    component.password = '';
    component.onLogin();
    expect(component.errorMessage).toBe('Please enter both username and password.');
  });

  it('should display an error if credentials are incorrect', () => {
    authServiceSpy.getUser.and.returnValue(of([{ username: 'TestUser', password: 'TestPass' }]));
    component.username = 'WrongUser';
    component.password = 'WrongPass';
    component.onLogin();
    expect(component.errorMessage).toBe('Invalid username or password.');
  });

  it('should navigate to dashboard if credentials are correct', () => {
    const mockUsers = [{ username: 'TestUser', password: 'TestPass' }];
    authServiceSpy.getUser.and.returnValue(of(mockUsers));
    component.username = 'TestUser';
    component.password = 'TestPass';
    component.onLogin();
    expect(localStorage.getItem('authToken')).toBe('TestUser');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not make an API call if fields are empty', () => {
    component.username = '';
    component.password = '';
    component.onLogin();
    expect(authServiceSpy.getUser.calls.count()).toBe(0);
  });
});
