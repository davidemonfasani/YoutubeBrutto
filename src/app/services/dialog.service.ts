import { Injectable, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  loginDialogRef: MatDialogRef<LoginComponent> | null = null;

  constructor(private dialog: MatDialog) {}

  goLogin() {
    this.clear()
    this.loginDialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
      // Add any other necessary configuration options for the popup
    });
    return this.loginDialogRef.afterClosed();
  }

  goRegister() {
    this.clear()
    const registerDialog = this.dialog.open(RegisterComponent, {
      width: '500px',
      // Add any other necessary configuration options for the popup
    });
    return registerDialog.afterClosed();
  }


  clear() {
    this.dialog.closeAll()
  }


}
