import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { AuthService } from './auth.service';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  validar(senha: string): Observable<any> {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.http.post(`${environment.apiUrl}/api/validar`, { senha }, { headers });
      })
    );
  }
}
