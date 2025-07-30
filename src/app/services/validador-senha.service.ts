import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {
  private apiUrl = `${environment.apiUrl}/api/validar`;

  constructor(private http: HttpClient) {}

  validar(senha: string) {
    return this.http.post<any>(this.apiUrl, { senha });
  }
}
