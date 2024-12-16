# Family Photo Management

## 📝 Descrição do Projeto

Este é um aplicativo de gerenciamento de fotos familiares, com autenticação, gerenciamento de usuários, álbuns e fotos.

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS**: Framework para construção de aplicações Node.js escaláveis
- **Prisma**: ORM moderno para manipulação de banco de dados
- **PostgreSQL**: Banco de dados relacional
- **JWT**: Autenticação e autorização
- **Bcrypt**: Criptografia de senhas
- **Zod**: Validação de esquemas e tipagem

### Frontend
- **React**: Biblioteca para construção de interfaces
- **NextJS**: Framework React para aplicações web
- **TailwindCSS**: Biblioteca de estilos utilitários

## 📂 Estrutura do Projeto

```
family-photo-management/
│
├── apps/
│   ├── api/           # Backend NestJS
│   │   ├── src/
│   │   ├── prisma/
│   │   ├── docker-compose.yml
│   │   └── test/
│   │
│   └── web/           # Frontend NextJS
│       ├── src/
│       ├── components/
│       └── pages/
│
└── README.md
```

## 🛠️ Configuração do Ambiente

### Pré-requisitos
- Node.js (v18+ recomendado)
- npm ou yarn
- PostgreSQL

### Instalação

1. Configurar Backend
```bash
# Navegue para o diretório da API
cd apps/api

# Instalar dependências
npm install

# Configurar banco de dados
npx prisma generate
npx prisma db push

# Copiar e configurar .env
cp .env.example .env
# Edite o .env com suas configurações
```

2. Configurar Frontend
```bash
# Navegue para o diretório web
cd ../web

# Instalar dependências
npm install
```

## 🖥️ Executando o Projeto

### Desenvolvimento

#### Backend
```bash
# No diretório apps/api
npm run start:dev
```

#### Frontend
```bash
# No diretório apps/web
npm run dev
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` no diretório `apps/api` com as seguintes variáveis:
- `DATABASE_URL`: Conexão com o banco PostgreSQL
- `JWT_SECRET`: Chave secreta para autenticação JWT
- `PORT`: Porta para o servidor backend
- `JSONPLACEHOLDER_API_URL`: URL da API JSONPlaceholder
- `REDIS_HOST`: Host do Redis
- `REDIS_PORT`: Porta do Redis
- `RESEND_API_KEY`: Chave da API Resend
- `RESEND_EMAIL_SENDER`: Email de remetente do Resend
- `FRONT_END_URL`: URL do frontend

Env do frontend
- `NEXT_PUBLIC_API_URL`: URL do backend
- `NEXTAUTH_SECRET`: Chave secreta para autenticação NextAuth

## 🧪 Testes

### Backend
```bash
# No diretório apps/api
npm run test
npm run test:e2e
```
