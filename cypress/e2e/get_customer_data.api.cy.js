/// <reference types="cypress" />
describe('Teste de Obtenção de Dados do Cliente', () => {
  let token

  before(() => {
    // Reutiliza o comando de login antes de executar os testes
    cy.login().then((accessToken) => {
      token = accessToken
    })
  })

  it('Acessa endpoint protegido e valida dados do cliente', () => {
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
      
      // Validações das propriedades do body
      expect(response.body).to.have.property('accountBranch')
      expect(response.body.accountBranch).to.eq('0001')
      
      expect(response.body).to.have.property('accountId')
      expect(response.body.accountId).to.eq('e800d965-37a1-4da1-b399-d4057a84eafc')
      
      expect(response.body).to.have.property('accountNumber')
      expect(response.body.accountNumber).to.eq('8749293')
      
      expect(response.body).to.have.property('accountNumberDigit')
      expect(response.body.accountNumberDigit).to.eq('8')
      
      expect(response.body).to.have.property('addresses')
      expect(response.body.addresses).to.be.null
      
      expect(response.body).to.have.property('bankCode')
      expect(response.body.bankCode).to.eq('407')
      
      expect(response.body).to.have.property('customerId')
      expect(response.body.customerId).to.eq('47976312-ba21-44b6-b27c-24ff64ac2ca2')
      
      expect(response.body).to.have.property('email')
      expect(response.body.email).to.eq('cadukogake@gmail.com')
      
      expect(response.body).to.have.property('name')
      // Normaliza espaços (remove &nbsp; e espaços extras)
      const normalizedName = response.body.name.replace(/\s+/g, ' ').trim()
      const expectedName = 'ITALO BONATO DE ALMEIDA'.replace(/\s+/g, ' ').trim()
      expect(normalizedName).to.eq(expectedName)
      
      expect(response.body).to.have.property('onboardingId')
      expect(response.body.onboardingId).to.be.null
      
      expect(response.body).to.have.property('onboardingUrl')
      expect(response.body.onboardingUrl).to.be.null
      
      expect(response.body).to.have.property('partner')
      expect(response.body.partner).to.eq('def6b7b3-0c6b-41d9-baf0-85d746488ede')
      
      expect(response.body).to.have.property('phone')
      expect(response.body.phone).to.eq('19996427290')
      
      expect(response.body).to.have.property('taxId')
      expect(response.body.taxId).to.eq('52332212841')
    })
  })
})

