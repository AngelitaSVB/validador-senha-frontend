import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(): Observable<string> {
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', 'frontend-itau')
      .set('client_secret', 'segredo123');

    return this.http.post<any>(`${environment.apiUrl}/oauth/token`, body).pipe(
      map(response => response.access_token)
    );
  }
}
