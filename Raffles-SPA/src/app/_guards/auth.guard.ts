import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.authService.isAuthorize(next.data.programId).pipe(
      map((auth: boolean) => {
        if (auth) {
          return true;
        }

        this.alertify.error('You are not authorize');
        this.router.navigate(['/home']);
        return false;
      }
    ));
  }
}
