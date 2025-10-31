import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsersignupComponent } from './pages/usersignup/usersignup.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "usersignup", component: UsersignupComponent },
    { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "**", redirectTo: "", pathMatch: "full" }
];
