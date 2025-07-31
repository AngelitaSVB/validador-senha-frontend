import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ValidadorSenhaComponent } from './components/validador-senha/validador-senha.component'; // Certifique-se de importar o componente aqui
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SenhaService } from './services/validador-senha.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, ValidadorSenhaComponent], // Adiciona ValidadorSenhaComponent aqui
      imports: [CommonModule, FormsModule],
      providers: [SenhaService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render the validador-senha component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-validador-senha')).toBeTruthy();
  });

});
