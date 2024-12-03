import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { of, BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    authService.isLoggedIn$ = new BehaviorSubject<boolean>(false);

    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should set isLoggedIn to true when the service emits true', () => {
    authService.loggedIn= new BehaviorSubject<boolean>(true);
    fixture.detectChanges();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should set isLoggedIn to false when the service emits false', () => {
    authService.loggedIn= new BehaviorSubject<boolean>(false);
    fixture.detectChanges();

    expect(component.isLoggedIn).toBeFalse();
  });

  it('should call authService.logout when logout is called', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
