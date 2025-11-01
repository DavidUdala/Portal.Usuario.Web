import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserOutput } from '../../interfaces/userOutput';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, MatMenuModule, MatPaginatorModule, MatButtonModule, MatTableModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  resultsLength: number = 0;
  pageSize: number = 0;
  dataSource: MatTableDataSource<UserOutput> = new MatTableDataSource<UserOutput>();
  displayedColumns: string[] = ['name', 'email', 'birthDay', 'dateCreated'];

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }
  ngOnInit(): void {
    this.getUsers("")
  }

  getUsers(term: string) {
    this.userService.getBy(term)
      .subscribe(resp => {
        if (resp.success) {
          this.dataSource = new MatTableDataSource(resp.data?.data!);
          this.resultsLength = resp.data?.totalRecords!;
          this.pageSize = resp.data?.pageSize!;
        }
      })
  }

  logout() {
    this.authService.logout();
    this.router.navigate([""]);
  }

  redirectToHome() {
    this.router.navigate(["/home"]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.getUsers(filterValue.trim())
  }
}