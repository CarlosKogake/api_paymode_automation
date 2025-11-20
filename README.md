# API Paymode Automated Tests

Este projeto contém testes automatizados para a API Paymode usando Cypress.

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente

1. Copie o arquivo `env.example` para `.env`:
```bash
cp env.example .env
```

2. Edite o arquivo `.env` com suas credenciais reais:

**⚠️ IMPORTANTE:** O arquivo `.env` deve conter suas credenciais REAIS. Os valores de `EXPECTED_*` devem corresponder aos dados que a API retorna para sua conta, pois os testes validam essas informações.

Consulte o arquivo `env.example` para ver todas as variáveis disponíveis.

## Executando os testes

### Abrir Cypress (modo interativo)
```bash
npm run cypress:open
```

### Executar testes (modo headless)
```bash
npm run cypress:run
```

### Executar testes específicos
```bash
# Teste de autenticação
npx cypress run --spec "cypress/e2e/01_auth/login.api.cy.js"

# Teste de dados do cliente
npx cypress run --spec "cypress/e2e/02_customer/get_data.api.cy.js"

# Testes de PIX
npx cypress run --spec "cypress/e2e/03_pix/*.cy.js"

# Testes de UI (se disponível localmente)
npx cypress run --spec "cypress/e2e/04_ui/pix_key.cy.js"
```

## Estrutura do projeto

```
├── cypress/
│   ├── e2e/                         # Testes end-to-end
│   │   ├── 01_auth/                 # Testes de autenticação
│   │   │   └── login.api.cy.js
│   │   ├── 02_customer/             # Testes de dados do cliente
│   │   │   └── get_data.api.cy.js
│   │   ├── 03_pix/                  # Testes de chaves PIX (API)
│   │   │   ├── create_key.api.cy.js
│   │   │   └── delete_key.api.cy.js
│   │   └── 04_ui/                   # Testes de UI (não versionado)
│   │       └── pix_key.cy.js        # Contém credenciais específicas
│   ├── fixtures/                    # Dados de teste estáticos
│   ├── support/                     # Comandos customizados e configurações
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── videos/                      # Vídeos dos testes (não versionado)
│   ├── screenshots/                 # Screenshots dos testes (não versionado)
│   └── downloads/                   # Arquivos baixados (não versionado)
├── cypress.config.js                # Configuração do Cypress
├── .env                             # Variáveis de ambiente (não versionado)
├── env.example                      # Template das variáveis de ambiente
├── .gitignore                       # Arquivos ignorados pelo git
├── package.json                     # Dependências do projeto
└── README.md                        # Documentação do projeto
```

## Segurança

⚠️ **IMPORTANTE: Este projeto contém testes para APIs sensíveis**

### Arquivos Protegidos
- ✅ `.env` - Variáveis de ambiente (não versionado)
- ✅ `cypress/e2e/04_ui/pix_key.cy.js` - Testes de UI com credenciais (não versionado)
- ✅ `cypress/videos/` - Vídeos de execução (não versionado)
- ✅ `cypress/screenshots/` - Screenshots de testes (não versionado)

### Boas Práticas
- 🔒 Use o arquivo `env.example` como template
- 🔒 Nunca commite credenciais reais no repositório
- 🔒 Mantenha o repositório como **privado**
- 🔒 Rotacione credenciais regularmente
- 🔒 Use variáveis de ambiente para TODOS os dados sensíveis
- 🔒 Revise o código antes de fazer push para evitar exposição de dados

### Dados que NUNCA devem ser commitados
- Senhas e tokens de acesso
- CPFs, emails e telefones reais
- IDs de contas, clientes e parceiros
- URLs de APIs de produção (use variáveis de ambiente)
