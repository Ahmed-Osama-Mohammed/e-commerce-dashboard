import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  public loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient,private router:Router) {
    if( JSON.parse(localStorage.getItem('logged') || 'false')){
      this.loggedIn.next(true)
    }
  else{
    this.loggedIn.next(false);

  }
  }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('logged') || 'false');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('logged');
    this.router.navigate(['/login'])
    this.loggedIn.next(false);
  }
}
