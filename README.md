# 🏋️‍♂️ IronLog Web
O **IronLog Web** é a interface de usuário (Front-end) do sistema IronLog, uma aplicação desenvolvida para o gerenciamento de treinos de musculação, com foco no acompanhamento de progressão de carga e volume para hipertrofia.

Este projeto foi desenvolvido com o objetivo de estudo prático sobre o ecossistema Front-end e consumo de APIs RESTful. Como meu foco principal de desenvolvimento é o **Back-end (Java/Spring Boot)**, esta interface foi construída para consolidar o entendimento do ciclo completo de uma aplicação Full-Stack, desde a autenticação com JWT até a renderização dinâmica de dados.

## 🛠️ Tecnologias Utilizadas
O projeto foi inicializado utilizando o **Vite** para um ambiente de desenvolvimento rápido e otimizado.

- **React:** Biblioteca para a construção das interfaces de usuário.
- **TypeScript:** Adição de tipagem estática para maior segurança e previsibilidade do código.
- **Tailwind CSS:** Framework de CSS utilitário para uma estilização rápida e responsiva.
- **Axios:** Cliente HTTP utilizado para realizar as requisições à API, configurado com interceptors para envio automático do Token JWT.
- **Lucide React:** Biblioteca de ícones.

## 🚀 Funcionalidades
A interface consome a [IronLog API](https://github.com/pedroccarv/ironlog-api) e permite as seguintes ações:

- **Autenticação:** Telas de Login e Cadastro integradas com o Spring Security.
- **Gestão de Estado:** Controle de sessão do usuário utilizando `localStorage` para manter o Token JWT.
- **Dashboard de Treinos:** Visualização da lista de treinos específicos do usuário logado.
- **Criação de Conteúdo:** Formulários dinâmicos para a criação de novos Exercícios, Treinos e adição de Séries (Sets) com controle de peso e repetições.

## 📦 Como rodar o projeto localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- NPM ou Yarn
- [IronLog API](https://github.com/pedroccarv/ironlog-api) rodando localmente na porta `8080`.

### Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/pedroccarv/ironlog-web.git
```

2. Acesse a pasta do projeto:
```bash
cd ironlog-web
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse a aplicação no seu navegador, geralmente no endereço: http://localhost:5173
