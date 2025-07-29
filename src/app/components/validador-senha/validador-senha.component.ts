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
  mostrarValidador: boolean = false;
  mensagemErro: string = '';
  senhaValidada: string = '';

  constructor(private senhaService: SenhaService) {}

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  validarSenha() {
  this.senhaService.validar(this.senha).subscribe({
    next: () => {
      this.validou = true;
      this.senhaValidada = this.senha; // armazena a senha validada
      this.mensagemErro = '';
    },
    error: (err) => {
      this.validou = false;
      this.mensagemErro = 'Erro ao validar a senha. Verifique os critérios.';
      console.error(err);
    }
  });
}

  onSenhaChange() {
  if (this.senha !== this.senhaValidada) {
    this.validou = false;
  }
  this.mensagemErro = '';
}

  // Regras visuais (apenas para UI)
  temTamanhoMinimo(): boolean {
  return this.senha.length > 0 && this.senha.length >= 9;
}

temDigito(): boolean {
  return this.senha.length > 0 && /[0-9]/.test(this.senha);
}

temMinuscula(): boolean {
  return this.senha.length > 0 && /[a-z]/.test(this.senha);
}

temMaiuscula(): boolean {
  return this.senha.length > 0 && /[A-Z]/.test(this.senha);
}

temEspecial(): boolean {
  return this.senha.length > 0 && /[!@#$%^&*()\-+]/.test(this.senha);
}

semCaracteresRepetidos(): boolean {
  if (this.senha.length === 0) return false; // adiciona verificação
  const caracteres = this.senha.split('');
  const conjunto = new Set(caracteres);
  return conjunto.size === caracteres.length;
}


  get senhaValida(): boolean {
    return (
      this.temTamanhoMinimo() &&
      this.temDigito() &&
      this.temMinuscula() &&
      this.temMaiuscula() &&
      this.temEspecial() &&
      this.semCaracteresRepetidos()
    );
  }
}