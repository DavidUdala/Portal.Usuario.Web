import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RequestResult } from '../interfaces/requestResult';
import { PagedResult } from '../interfaces/pagedResult';
import { UserOutput } from '../interfaces/userOutput';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7070/api/users/';

  constructor(private http: HttpClient) { }

  getBy(term: string): Observable<RequestResult<PagedResult<UserOutput[]>>> {

    return this.http.get<RequestResult<PagedResult<UserOutput[]>>>(`${this.apiUrl}getBy?term=${term}`)
      .pipe(
        tap(resp => {
          return resp;
        })
      )
  }
}