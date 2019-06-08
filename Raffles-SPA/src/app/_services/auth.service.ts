import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Menus } from '../_model/menu';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  navMenu: Menus[];

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const res = response;
        if (res) {
          localStorage.setItem('token', res.token);
          this.decodedToken = this.jwtHelper.decodeToken(res.token);
          this.navMenu = res.userMenu;
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isAuthorize(programId: number): Observable<boolean> {
    if (this.decodedToken) {
      return this.http.get<boolean>(environment.apiUrl + 'auth/' + this.decodedToken.nameid + '/' + programId);
    }

    return new Observable<boolean>(observer => observer.next(false));
  }

  getUserMenu() {
    return this.http.get<Menus[]>(environment.apiUrl + 'menus/' + this.decodedToken.nameid);
  }

  saveAuth(userId: number, auth: Menus[]) {
    return this.http.post(environment.apiUrl + 'menus/' + userId, auth);
  }

  getAuth(): Observable<Menus[]> {
    return this.http.get<Menus[]>(environment.apiUrl + 'menus');
  }

  delAuth(auth: Menus) {
    return this.http.delete(
      environment.apiUrl + 'menus/' + auth.UserId + '/' + auth.ProgramId
    );
  }
}
