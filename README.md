# Raijin Copilot

**Raijin Copilot** é um projeto Angular criado para ser uma plataforma de atendimento integrado com API em Django com o WhatsApp, com gerenciamento de chamados, facilidade em obter indicadores e atendimento com alta precisão e performance. Este README fornece uma visão geral do projeto e instruções detalhadas sobre como configurar e rodar o projeto em uma máquina local.

## Requisitos

Antes de iniciar, certifique-se de que você tenha as seguintes ferramentas instaladas:

- **Node.js** (versão 16.x ou superior recomendada)
- **npm** (geralmente instalado junto com o Node.js)
- **Angular CLI** (opcional, mas recomendada) - `npm install -g @angular/cli`

## Instalação

Siga os passos abaixo para configurar o projeto na sua máquina local:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/raijin-copilot.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd raijin-copilot
   ```

3. **Atualize sua branch para a develop para obter a versão atualizada:**

   ```bash
   git checkout develop
   ```

4. **Instale as dependências:**

   ```bash
   npm install
   ```

## Scripts Disponíveis

No diretório do projeto, você pode rodar os seguintes scripts:

- **`ng serve` ou `npm start`:** Roda a aplicação em modo de desenvolvimento.
  
  ```bash
  npm start
  ```
  
  Abra [http://localhost:4200](http://localhost:4200) para visualizar no navegador.

- **`ng build` ou `npm run build`:** Compila a aplicação para produção na pasta (opcional) `dist/`.

  ```bash
  npm run build
  ```

- **`ng build --watch` ou `npm run watch`:** Compila a aplicação e recompila automaticamente ao detectar mudanças (opcional).

  ```bash
  npm run watch
  ```

- **`ng test` ou `npm run test`:** Executa os testes unitários através do [Karma](https://karma-runner.github.io).

  ```bash
  npm run test
  ```

## Estrutura do Projeto

A estrutura básica do projeto Angular é a seguinte:

- **`src/`**: Contém o código-fonte da aplicação.
- **`src/app/`**: Contém os módulos, componentes, serviços, e outros artefatos principais da aplicação.
- **`src/assets/`**: Contém arquivos estáticos, como imagens e fontes.
- **`src/environments/`**: Contém arquivos de configuração de ambiente (ex: desenvolvimento, produção).

## Dependências

O projeto utiliza várias dependências importantes, incluindo:

- **Angular 18.2.0**: Framework principal.
- **RxJS**: Biblioteca reativa para programação assíncrona.
- **@ctrl/ngx-emoji-mart**: Biblioteca para seleção de emojis.
- **FontAwesome**: Biblioteca de ícones.

## Desenvolvendo

Para começar a desenvolver, siga os passos de instalação e rode `npm start` para iniciar o servidor de desenvolvimento. As mudanças feitas no código serão automaticamente refletidas no navegador.