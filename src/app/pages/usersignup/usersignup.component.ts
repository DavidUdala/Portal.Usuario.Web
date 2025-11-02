import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { PostUserInput } from '../../interfaces/postUserInput';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usersignup',
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatIconModule, MatDatepickerModule,
    ReactiveFormsModule, CommonModule],
  templateUrl: './usersignup.component.html',
  styleUrl: './usersignup.component.css'
})
export class UsersignupComponent implements OnInit {
  constructor(private userService: UserService, private notficationService: NotificationService, private router: Router) { }

  user: PostUserInput = new PostUserInput();
  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      birthDay: new FormControl('', [Validators.required, Validators.maxLength(10)])
    })
  }
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.userForm.get('birthDay')?.setValue(event.value);
  }

  // Se digitar manualmente no formato DD/MM/YYYY, convertemos para Date
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);

      if (!isNaN(date.getTime())) {
        // Evita loop infinito no valueChanges
        this.userForm.get('birthDay')?.setValue(date, { emitEvent: false });
      }
    }
  }
  register() {
    if (this.userForm.valid) {
      this.user = this.userForm.value as PostUserInput;

      this.userService.create(this.user)
        .subscribe(resp => {
          this.notficationService.send(resp.message);
          if (resp.success) {
            this.router.navigate(["/Login"]);
          }
        })
    }
  }
}
