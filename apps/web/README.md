# Gerenciamento de Álbuns de Fotos - Frontend

## 📋 Visão Geral do Projeto

Este é um aplicativo frontend em Next.js para gerenciamento de álbuns de fotos, usuários e autenticação. O projeto é construído usando tecnologias web modernas e segue as melhores práticas de desenvolvimento React e Next.js.

## 🚀 Tecnologias Utilizadas

- **Framework**: Next.js 14
- **Linguagem**: TypeScript
- **Gerenciamento de Estado**: React Query
- **Autenticação**: NextAuth
- **Estilização**: Tailwind CSS
- **Componentes de UI**: Shadcn/UI

## ✨ Funcionalidades

- Gerenciamento de usuários
- Criação e gerenciamento de álbuns
- Upload e organização de fotos
- Funcionalidade de redefinição de senha
- Design de interface responsivo
- Renderização do lado do servidor
- Gerenciamento de estado do lado do cliente

## 📂 Estrutura do Projeto

```
frontend/
├── app/               # Diretório do aplicativo Next.js
│   ├── layout.tsx     # Layout principal do aplicativo
│   ├── page.tsx       # Página inicial
│   └── ...
├── components/        # Componentes React reutilizáveis
│   ├── albums/        # Componentes de álbuns
│   ├── photos/        # Componentes de fotos
│   ├── ui/            # Componentes Shadcn/UI
│   └── users/         # Componentes de usuários
├── hooks/             # Hooks personalizados do React
├── lib/               # Funções utilitárias
├── services/          # Funções de serviço de API
│   ├── albums/
│   ├── photos/
│   └── users/
├── utils/             # Interfaces TypeScript e arquivos utilitários
└── providers/         # Provedores de contexto React
```

## 🔧 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm

## 🛠️ Instalação

1. Clone o repositório
2. Navegue até o diretório frontend
3. Instale as dependências:
   ```bash
   npm install
   ```

4. Crie um arquivo `.env` baseado no `.env.example`

## 🚦 Executando a Aplicação

- Modo de desenvolvimento:
  ```bash
  npm run dev
  ```

- Build de produção:
  ```bash
  npm run build
  npm run start
  ```

## 📡 Integração de API

A aplicação utiliza arquivos de serviço personalizados no diretório `services/` para gerenciar:
- Operações de usuários
- Gerenciamento de álbuns
- Upload e edição de fotos
- Solicitações de autenticação

## 🔐 Autenticação

Utiliza NextAuth para autenticação, com lógica de autenticação personalizada no lado do servidor em `server/auth.ts`.

## 🎨 Estilização

- Tailwind CSS para estilização utility-first
- Componentes de UI personalizados do Shadcn/UI
- Design responsivo
- Fontes personalizadas (Geist e Geist Mono)

## 📊 Gerenciamento de Estado

- React Query para gerenciamento de estado do servidor
- Hooks personalizados para busca e manipulação de dados


## 📦 Configuração de Build

- Configuração do Next.js em `next.config.mjs`
- Configuração do TypeScript em `tsconfig.json`
- Configurações de Tailwind e PostCSS incluídas
