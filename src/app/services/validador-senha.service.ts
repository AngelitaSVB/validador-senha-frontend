import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
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
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });

        const body = { senha };
        const url = `${environment.apiUrl}/api/validar`;

        console.log('📤 Enviando para /api/validar:', body);
        console.log('📡 Headers:', headers);

        return this.http.post(url, body, { headers });
      })
    );
  }
}
