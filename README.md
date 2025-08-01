
# Validador de Senha – Frontend Angular

Projeto frontend desenvolvido em Angular 17 com Angular Material, que consome uma API de validação de senhas. Inspirado no visual institucional do Itaú, com foco em arquitetura moderna e boas práticas de UI/UX.

---

## Funcionalidades

- Campo para digitar senha
- Botão para exibir/ocultar senha
- Validação de critérios (mínimo 9 caracteres, letras maiúsculas/minúsculas, número, caractere especial, sem repetição)
- Exibição dos critérios atendidos/violados
- Integração com API que retorna se a senha é válida ou não
- Mensagens dinâmicas de sucesso ou erro

---

## Testes

O projeto possui testes unitários com Karma e Jasmine:

```bash
ng test
```

> Resultado atual:
> ✅ 7 testes passaram com sucesso

---

## Tecnologias e ferramentas

- Angular 17 (Standalone Components)
- Angular Material
- TypeScript
- HTML + CSS
- RxJS
- Karma + Jasmine (testes)
- GitHub Actions (CI/CD)
- AWS S3 + CloudFront (deploy frontend)
- Integração com API Java hospedada na AWS

---

## ▶️ Como rodar o projeto localmente

### Pré-requisitos:
- Node.js (18+)
- Angular CLI
  ```bash
  npm install -g @angular/cli
  ```

### Passos:
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/validador-senha-frontend-itau.git
   cd validador-senha-frontend-itau
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode a aplicação:
   ```bash
   ng serve
   ```

4. Acesse no navegador:
   [http://localhost:4200](http://localhost:4200)

---

## 🌐 Deploy na AWS

O frontend está hospedado na AWS S3 com distribuição via CloudFront. O build de produção é feito com:

```bash
ng build --configuration=production
```

Os arquivos gerados na pasta `dist/` são enviados automaticamente via GitHub Actions para o bucket S3 correspondente ao ambiente.

---

## ⚠️ Observação sobre o CORS

> Atualmente, o frontend hospedado na AWS **não está conseguindo se comunicar com a API da AWS** devido a um erro de **CORS**.  
> Isso acontece porque a API Gateway ainda **não está aceitando requisições de origem externa** (como a do domínio do S3).  
>  
> 🔧 Esse problema será resolvido futuramente com ajustes nas configurações de CORS da API.

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/validador-senha/       → componente principal
│   └── services/                         → comunicação com API e autenticação
├── assets/
├── environments/
│   ├── environment.ts                    → ambiente dev
│   └── environment.prod.ts              → ambiente produção
├── styles.css                            → tema visual customizado
└── main.ts                               → bootstrap
```

---

## Autora

**Angelita Vilas Boas**  
Desenvolvedora Front-end | Estudante de Ciência de Dados  
Projeto realizado como desafio técnico
