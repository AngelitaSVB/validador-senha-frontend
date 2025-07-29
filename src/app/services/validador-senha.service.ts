import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {
  private apiUrl = `${environment.apiUrl}/api/validar`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  validar(senha: string) {
    return from(this.authService.getAccessToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.post<any>(this.apiUrl, { senha }, { headers });
      })
    );
  }
}
