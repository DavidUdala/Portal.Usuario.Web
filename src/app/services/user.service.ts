import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RequestResult } from '../interfaces/requestResult';
import { PagedResult } from '../interfaces/pagedResult';
import { UserOutput } from '../interfaces/userOutput';
import { PostUserInput } from '../interfaces/postUserInput';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7070/api/users/';

  constructor(private http: HttpClient) { }

  getBy(term: string, pageNumber: number = 0, pageSize: number = 5): Observable<RequestResult<PagedResult<UserOutput[]>>> {

    return this.http.get<RequestResult<PagedResult<UserOutput[]>>>(`${this.apiUrl}getBy?term=${term}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .pipe(
        tap(resp => {
          return resp;
        })
      )
  }
  create(input : PostUserInput): Observable<RequestResult<boolean>> {
    return this.http.post<RequestResult<boolean>>(`${this.apiUrl}create`, input)
      .pipe(
        tap(resp => {
          return resp;
        })
      )
  }
}