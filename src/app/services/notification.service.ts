import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  send(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Fechar', {
      duration,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ['snackbar-success']
    });
  }
}
