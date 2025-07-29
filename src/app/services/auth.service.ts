import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenUrl = `${environment.apiUrl}/oauth/token`;
  private clientId = 'frontend-itau';
  private clientSecret = 'segredo123';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  getAccessToken() {
    if (this.accessToken) {
      return of(this.accessToken); // reutiliza o token já obtido
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    return this.http.post<any>(this.tokenUrl, body.toString(), { headers })
      .pipe(
        map(response => {
          this.accessToken = response.access_token;
          return this.accessToken;
        })
      );
  }
}
