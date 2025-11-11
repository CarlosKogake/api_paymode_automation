/// <reference types="cypress" />
describe('Teste de Criação de Chave PIX', () => {
  let token
  const accountId = 'e800d965-37a1-4da1-b399-d4057a84eafc'

  before(() => {
    cy.login().then((accessToken) => {
      token = accessToken
    })
  })

  it('Cria uma chave PIX do tipo EVP', () => {
    const pixKeyData = {
      key: '',
      type: 'EVP',
      account: accountId
    }

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/whitelabel/pixdict`,
      headers: {
        Authorization: `${token}`,
        Partner: `${Cypress.env('partner')}`,
        'Content-Type': 'application/json',
        accountId: accountId
      },
      body: pixKeyData
    }).then((response) => {
      expect(response.status).to.eq(200)
      console.log('Chave PIX criada:', response.body)
    })

    // Busca as chaves PIX da conta
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/whitelabel/pixdict/${accountId}/entries`,
      headers: {
        Authorization: `${token}`,
        Partner: `${Cypress.env('partner')}`,
        accountId: accountId
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      cy.log('Resposta do GET - Chaves PIX da conta:')
      cy.log(JSON.stringify(response.body, null, 2))
      console.log('Resposta completa do GET:', response.body)
    })
  })
})

