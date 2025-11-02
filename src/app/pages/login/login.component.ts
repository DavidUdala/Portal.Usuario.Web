import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserLoginInput } from '../../interfaces/userLoginInput';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatIconModule, ReactiveFormsModule,
    CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private router: Router, private auth: AuthService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }
  userLoginInput: UserLoginInput = new UserLoginInput();


  Auth() {
    if (this.userForm.valid) {
      this.userLoginInput = this.userForm.value as UserLoginInput;

      this.auth.login(this.userLoginInput)
        .subscribe(resp => {
          this.notificationService.send(resp.message)
          if (resp.success && this.auth.isLoggedIn()) {
            this.router.navigate(['/home']);
          }
        });
    }
  }
}