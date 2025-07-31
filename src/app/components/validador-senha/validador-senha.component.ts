import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SenhaService } from '../../services/validador-senha.service';

@Component({
  selector: 'app-validador-senha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './validador-senha.component.html',
  styleUrls: ['./validador-senha.component.css']
})
export class ValidadorSenhaComponent {
  senha: string = '';
  mostrarSenha: boolean = false;
  validou: boolean = false;
  mensagens: string[] = [];
  senhaValidada: string = '';
  mostrarValidador: boolean = false;

  constructor(private senhaService: SenhaService) {}

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  validarSenha() {
    this.senhaService.validar(this.senha).subscribe({
      next: (res) => {
        this.validou = res.valido;
        this.mensagens = res.motivos;
        this.senhaValidada = this.senha;


        if (this.validou) {
          this.mensagens = ['Senha válida com sucesso!'];
        }
      },
      error: (err) => {
        this.validou = false;
        this.mensagens = ['Erro ao validar a senha.'];
        console.error(err);
      }
    });
  }

  onSenhaChange() {
    if (this.senha !== this.senhaValidada) {
      this.validou = false;
      this.mensagens = [];
    }
  }

  // Validações visuais auxiliares:
  tamanhoMinimo() {
    return this.senha.length >= 9;
  }

  temMaiuscula() {
    return /[A-Z]/.test(this.senha);
  }

  temMinuscula() {
    return /[a-z]/.test(this.senha);
  }

  temNumero() {
    return /\d/.test(this.senha);
  }

  temEspecial() {
    return /[!@#$%^&*()\-+]/.test(this.senha);
  }

  semRepetidos(): boolean {
    if (!this.senha || this.senha.trim().length === 0) return false;

    const caracteres = this.senha.split('');
    const unicos = new Set(caracteres);
    return unicos.size === caracteres.length;
  }
}
