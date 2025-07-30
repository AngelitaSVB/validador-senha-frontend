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
        this.senhaValidada = this.senha;
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

  temTamanhoMinimo(): boolean {
    return this.senha.length >= 9;
  }

  temDigito(): boolean {
    return /\d/.test(this.senha);
  }

  temMinuscula(): boolean {
    return /[a-z]/.test(this.senha);
  }

  temMaiuscula(): boolean {
    return /[A-Z]/.test(this.senha);
  }

  temEspecial(): boolean {
    return /[!@#$%^&*()\-+]/.test(this.senha);
  }

  semCaracteresRepetidos(): boolean {
    const chars = this.senha.split('');
    return new Set(chars).size === chars.length;
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
