import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserOutput } from '../../interfaces/userOutput';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, MatMenuModule, MatPaginatorModule, MatButtonModule, MatTableModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, AfterViewInit {

  resultsLength: number = 0;
  pageSize: number = 5;
  dataSource: MatTableDataSource<UserOutput> = new MatTableDataSource<UserOutput>();
  displayedColumns: string[] = ['name', 'email', 'birthDay', 'dateCreated'];

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }
  ngOnInit(): void {
    this.getUsers("", 0, this.pageSize);
  }
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.getUsers("", this.paginator.pageIndex, this.paginator.pageSize);
    });

  }

  getUsers(term: string, pageIndex: number = 0, pageSize: number = 5) {
    this.userService.getBy(term, pageIndex + 1, pageSize)
      .subscribe(resp => {
        this.dataSource.data = resp.data?.data!;
        this.resultsLength = resp.data?.totalRecords!;
      });
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

    this.paginator.firstPage();
    this.getUsers(filterValue, 0, this.pageSize)
  }
}