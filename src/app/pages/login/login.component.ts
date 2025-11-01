import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserLoginInput } from '../../interfaces/userLoginInput';


@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private auth: AuthService) { }
  userLoginInput: UserLoginInput = new UserLoginInput();

  Auth() {
    this.auth.login(this.userLoginInput)
      .subscribe(resp => {
        if (resp.success && this.auth.isLoggedIn())
          this.router.navigate(['/home']);
      });
  }
}