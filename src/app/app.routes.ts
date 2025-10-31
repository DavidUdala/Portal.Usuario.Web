import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersignupComponent } from './pages/usersignup/usersignup.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "usersignup", component: UsersignupComponent },
    { path: "home", component: HomeComponent }
];
