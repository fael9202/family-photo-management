# Backend Modular Architecture

## 📂 Estrutura de Diretórios

```
src/
│
├── __mocks__/            # Mocks para testes e simulações
│
├── modules/              # Módulos de negócio
│   ├── albums/           # Módulo de Álbuns
│   │   ├── core/         # Lógica de negócio principal
│   │   ├── http/         # Controladores e DTOs
│   │   ├── persistence/  # Camada de persistência
│   │   └── tests/        # Testes específicos do módulo
│   │
│   ├── auth/             # Módulo de Autenticação
│   │   ├── services/     # Serviços de autenticação
│   │   └── strategys/    # Estratégias de autenticação
│   │
│   ├── photos/           # Módulo de Fotos
│   │   ├── core/         # Lógica de negócio principal
│   │   ├── http/         # Controladores e DTOs
│   │   ├── persistence/  # Camada de persistência
│   │   └── tests/        # Testes específicos do módulo
│   │
│   └── users/            # Módulo de Usuários
│       ├── core/         # Lógica de negócio principal
│       ├── http/         # Controladores e DTOs
│       ├── persistence/  # Camada de persistência
│       └── tests/        # Testes específicos do módulo
│
└── shared/               # Recursos compartilhados
    ├── config/           # Configurações globais
    │   ├── database/     # Configurações de banco de dados
    │   ├── queues/       # Configurações de filas
    │   └── redis/        # Configurações do Redis
    │
    ├── database/         # Utilitários de banco de dados
    │   ├── database-seeder.module.ts
    │   └── seeders/      # Seeds para banco de dados
    │
    ├── decorators/       # Decoradores customizados
    ├── dto/              # DTOs compartilhados
    ├── guards/           # Guardas de autenticação
    │
    ├── notification/     # Sistema de notificações
    │   ├── emailNotification/
    │   ├── jobs/
    │   └── notification.module.ts
    │
    └── utils/            # Utilitários globais
        ├── enums/
        ├── exceptions/
        ├── helpers/
        └── interfaces/
```

## 🏗️ Princípios Arquiteturais

### Modularidade
Cada módulo de negócio segue uma estrutura consistente:
- `core/`: Lógica de negócio principal
- `http/`: Controladores e DTOs
- `persistence/`: Camada de persistência
- `tests/`: Testes específicos do módulo

### Shared
Recursos compartilhados que podem ser usados por múltiplos módulos:
- Configurações
- Decoradores
- Guards
- Utilitários
- Sistema de notificação

## 🔍 Detalhamento dos Módulos

### 🔐 Módulo de Autenticação (`auth/`)
- Gerencia estratégias de autenticação
- Serviços de autenticação
- Implementação de estratégias de login

### 👥 Módulo de Usuários (`users/`)
- Gerenciamento de perfis de usuário
- Operações CRUD de usuários
- Regras de negócio relacionadas a usuários

### 📸 Módulo de Fotos (`photos/`)
- Gestão de uploads de fotos
- Metadados de fotos
- Lógica de armazenamento e recuperação

### 📂 Módulo de Álbuns (`albums/`)
- Criação e gerenciamento de álbuns
- Agrupamento de fotos
- Compartilhamento de álbuns

## 🛠️ Recursos Compartilhados

### Configurações (`shared/config/`)
- Configurações de banco de dados
- Configurações de filas
- Configurações do Redis

### Notificações (`shared/notification/`)
- Sistema de notificação por email
- Jobs de notificação
- Emissão de notificações

### Utilitários (`shared/utils/`)
- Enums
- Exceções customizadas
- Helpers
- Interfaces compartilhadas

## 🚀 Boas Práticas

1. Baixo acoplamento entre módulos
2. Alta coesão dentro dos módulos
3. Reutilização de código via shared
4. Princípios SOLID
5. Separação clara de responsabilidades

## 📦 Dependências entre Módulos

- Módulos de negócio independentes
- Recursos compartilhados acessíveis por todos
- Comunicação via injeção de dependência

## 🔒 Segurança

- Guards centralizados
- Decoradores customizados
- Estratégias de autenticação modulares

## 🧪 Testabilidade

- Estrutura que facilita testes unitários
- Mocks disponíveis
- Testes específicos por módulo

## 🔗 Próximos Passos

- Implementar mais testes de integração
- Documentação detalhada de cada módulo
- Monitoramento de performance
- Otimização de queries
```