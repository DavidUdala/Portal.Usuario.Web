import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { PostUserInput } from '../../interfaces/postUserInput';
import { CommonModule } from '@angular/common';

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
  constructor(private userService: UserService) { }

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

  register() {
    if (this.userForm.valid) {
      this.user = this.userForm.value as PostUserInput;

      this.userService.create(this.user)
        .subscribe(resp => {
          if (resp.success)
            console.log(resp.message);
        })
    }
  }
}
