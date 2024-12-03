import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  errorMessage: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  onLogin():void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    this.authService.getUser()
      .subscribe(users => {
        const user = users.find(
          u => u.username === this.username && u.password === this.password
        );

        if (user) {
          localStorage.setItem('authToken', this.username);
          localStorage.setItem('logged', JSON.stringify(true))
          this.router.navigate(['/products']);
          this.authService.loggedIn.next(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          this.errorMessage = 'Invalid username or password.';
          this.authService.loggedIn.next(false);

        }
      });

   

  }
}
