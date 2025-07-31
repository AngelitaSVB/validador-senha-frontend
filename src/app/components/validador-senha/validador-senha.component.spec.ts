import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidadorSenhaComponent } from './validador-senha.component';
import { FormsModule } from '@angular/forms';
import { SenhaService } from '../../services/validador-senha.service';
import { of, throwError } from 'rxjs';

describe('ValidadorSenhaComponent', () => {
  let component: ValidadorSenhaComponent;
  let fixture: ComponentFixture<ValidadorSenhaComponent>;
  let senhaServiceSpy: jasmine.SpyObj<SenhaService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SenhaService', ['validar']);

    await TestBed.configureTestingModule({
      imports: [ValidadorSenhaComponent, FormsModule],
      providers: [{ provide: SenhaService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidadorSenhaComponent);
    component = fixture.componentInstance;
    senhaServiceSpy = TestBed.inject(SenhaService) as jasmine.SpyObj<SenhaService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve alternar a visibilidade da senha', () => {
    expect(component.mostrarSenha).toBeFalse();
    component.toggleMostrarSenha();
    expect(component.mostrarSenha).toBeTrue();
  });

  it('deve validar senha com sucesso', () => {
    const respostaMock = { valido: true, motivos: [] };
    senhaServiceSpy.validar.and.returnValue(of(respostaMock));
    component.senha = 'Senha@123';

    component.validarSenha();

    expect(senhaServiceSpy.validar).toHaveBeenCalledWith('Senha@123');
    expect(component.validou).toBeTrue();
    expect(component.mensagens).toEqual(['Senha válida com sucesso!']);
    expect(component.senhaValidada).toBe('Senha@123');
  });

  it('deve lidar com erro ao validar senha', () => {
    senhaServiceSpy.validar.and.returnValue(throwError(() => new Error('Erro')));
    component.senha = 'Senha@123';

    component.validarSenha();

    expect(component.validou).toBeFalse();
    expect(component.mensagens).toEqual(['Erro ao validar a senha.']);
  });

  it('deve resetar a validação se a senha mudar', () => {
    component.senha = 'Senha@123';
    component.senhaValidada = 'Senha@123';
    component.validou = true;
    component.mensagens = ['Mensagem'];
    component.senha = 'NovaSenha@123';

    component.onSenhaChange();

    expect(component.validou).toBeFalse();
    expect(component.mensagens).toEqual([]);
  });

  it('deve validar regras visuais corretamente', () => {
    component.senha = 'Senha@123';
    expect(component.tamanhoMinimo()).toBeTrue();
    expect(component.temMaiuscula()).toBeTrue();
    expect(component.temMinuscula()).toBeTrue();
    expect(component.temNumero()).toBeTrue();
    expect(component.temEspecial()).toBeTrue();
    expect(component.semRepetidos()).toBeTrue();
  });

  it('semRepetidos deve retornar false para senha vazia ou repetida', () => {
    component.senha = '';
    expect(component.semRepetidos()).toBeFalse();

    component.senha = 'aaaaaa';
    expect(component.semRepetidos()).toBeFalse();
  });
});
