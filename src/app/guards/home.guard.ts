import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { DialogService } from '../services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../pages/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class homeGuard implements CanActivate {
  loginDialogRef: MatDialogRef<LoginComponent> | null = null;

  constructor(
    private auth: UserAuthService,
    private router: Router,
    private dialogS: DialogService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isValidToken = this.auth.verifyToken(localStorage.getItem('token'));
    console.log(isValidToken);

    if (isValidToken) {
      // Validate token here
      return true;
    } else {
      this.dialogS.clear()
      this.dialogS.goLogin()
      return false;
    }
  }
}
