/// <reference types="cypress" />
describe('Testes com autenticação', () => {
  let token

  it('Login com sucesso', () => {
    const loginBody = {
      username: Cypress.env('username'),
      secret: Cypress.env('password'),
      partner: Cypress.env('partner')
    }

    cy.request({
      method: 'POST',
      url: 'https://api.sandbox.paymodetech.com.br/auth/oauth2/userwhitelabelcredentials',
      // url: `${Cypress.env('apiBaseUrl')}${Cypress.env('authEndpoint')}`,
      body: loginBody,
      failOnStatusCode: false,
      
    }).then((response) => {
      if (response.status === 401) {
        throw new Error(`Erro 401 - Credenciais inválidas. Verifique se as credenciais no arquivo .env estão corretas:
        - Username: ${Cypress.env('username')}
        - Password: ${Cypress.env('password')}
        - Partner: ${Cypress.env('partner')}
        
        Se as credenciais estão corretas, verifique se a API não mudou ou se há algum problema de conectividade.`)
      }
      expect(response.status).to.eq(200)
      token = response.body.access_token
      cy.log(`Token obtido: ${token}`)
    })
  })

  it('Acessa endpoint protegido', () => {
    // Usa o token no header e as variáveis de ambiente para construir a URL
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}${Cypress.env('customerDataEndpoint')}/${Cypress.env('partner')}/${Cypress.env('username')}`,
      headers: {
        Authorization: `${token}`,
        Partner: `${Cypress.env('partner')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log('Resposta do endpoint protegido:', response.body)
      
      // Validações das propriedades do body usando variáveis de ambiente
      expect(response.body).to.have.property('accountBranch')
      expect(response.body.accountBranch).to.eq(Cypress.env('expectedAccountBranch'))
      
      expect(response.body).to.have.property('accountId')
      expect(response.body.accountId).to.eq(Cypress.env('expectedAccountId'))
      
      expect(response.body).to.have.property('accountNumber')
      expect(response.body.accountNumber).to.eq(Cypress.env('expectedAccountNumber'))
      
      expect(response.body).to.have.property('accountNumberDigit')
      expect(response.body.accountNumberDigit).to.eq(Cypress.env('expectedAccountNumberDigit'))
      
      expect(response.body).to.have.property('addresses')
      expect(response.body.addresses).to.be.null
      
      expect(response.body).to.have.property('bankCode')
      expect(response.body.bankCode).to.eq(Cypress.env('expectedBankCode'))
      
      expect(response.body).to.have.property('customerId')
      expect(response.body.customerId).to.eq(Cypress.env('expectedCustomerId'))
      
      expect(response.body).to.have.property('email')
      expect(response.body.email).to.eq(Cypress.env('expectedEmail'))
      
      expect(response.body).to.have.property('name')
      // Normaliza espaços (remove &nbsp; e espaços extras)
      const normalizedName = response.body.name.replace(/\s+/g, ' ').trim()
      const expectedName = Cypress.env('expectedName').replace(/\s+/g, ' ').trim()
      expect(normalizedName).to.eq(expectedName)
      
      expect(response.body).to.have.property('onboardingId')
      expect(response.body.onboardingId).to.be.null
      
      expect(response.body).to.have.property('onboardingUrl')
      expect(response.body.onboardingUrl).to.be.null
      
      expect(response.body).to.have.property('partner')
      expect(response.body.partner).to.eq(Cypress.env('expectedPartner'))
      
      expect(response.body).to.have.property('phone')
      expect(response.body.phone).to.eq(Cypress.env('expectedPhone'))
      
      expect(response.body).to.have.property('taxId')
      expect(response.body.taxId).to.eq(Cypress.env('expectedTaxId'))
    })
  })
})