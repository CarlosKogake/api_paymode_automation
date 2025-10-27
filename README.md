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
```env
# API Configuration
API_BASE_URL=https://api.sandbox.paymodetech.com.br
AUTH_ENDPOINT=/auth/oauth2/userwhitelabelcredentials
CUSTOMER_DATA_ENDPOINT=/whitelabel/customer/data

# Credentials
USERNAME=seu_usuario_aqui
PASSWORD=sua_senha_aqui
PARTNER=seu_partner_id_aqui

# Expected Response Values (for validation)
EXPECTED_ACCOUNT_BRANCH=0001
EXPECTED_ACCOUNT_ID=7cfcf8a2-889d-4d4f-b0b0-203757d0303f
EXPECTED_ACCOUNT_NUMBER=8748427
EXPECTED_ACCOUNT_NUMBER_DIGIT=7
EXPECTED_BANK_CODE=407
EXPECTED_CUSTOMER_ID=52baaf1a-20f8-4648-a9c5-402e270b3a6e
EXPECTED_EMAIL=fernando.petri@weareglobals.com
EXPECTED_NAME=Leonardo Moreira Ribeiro 
EXPECTED_PARTNER=3fe9cbf7-45b2-41b8-8a81-cd3ed23d5f7e
EXPECTED_PHONE=19998451680
EXPECTED_TAX_ID=09204872039
```

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
npx cypress run --spec "cypress/e2e/post_login.api.cy.js"
```

## Estrutura do projeto

```
├── cypress/
│   ├── e2e/                    # Testes end-to-end
│   │   └── post_login.api.cy.js
│   ├── fixtures/               # Dados de teste (não mais usado)
│   └── support/                # Arquivos de suporte
├── cypress.config.js           # Configuração do Cypress
├── .env                        # Variáveis de ambiente (não commitado)
├── env.example                 # Template das variáveis de ambiente
├── .gitignore                  # Arquivos ignorados pelo git
└── package.json               # Dependências do projeto
```

## Segurança

- O arquivo `.env` está no `.gitignore` e não será commitado
- Use o arquivo `env.example` como template
- Nunca commite credenciais reais no repositório
