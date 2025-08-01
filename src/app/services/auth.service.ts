import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

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

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    return this.http.post<any>(
      `${environment.apiUrl}/oauth/token`,
      body.toString(),
      { headers }
    ).pipe(
      map(response => {
        console.log('Resposta do /oauth/token:', response);
        return response.access_token;
      })
    );
  }
}
