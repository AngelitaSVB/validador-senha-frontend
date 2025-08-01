import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

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

    return this.http.post<any>(`${environment.apiUrl}/oauth/token`, body.toString(), { headers })
      .pipe(
        map(response => {
          console.log('🔐 Token gerado:', response.access_token);
          return response.access_token;
        })
      );
  }
}
