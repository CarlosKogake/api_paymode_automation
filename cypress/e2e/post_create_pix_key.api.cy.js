/// <reference types="cypress" />
describe('Teste de Criação de Chave PIX', () => {
  let token
  const accountId = `${Cypress.env('ACCOUNT_ID')}`

  before(() => {
    cy.login().then((accessToken) => {
      token = accessToken
    })
  })

  it('Deve criar uma chave PIX do tipo EVP', () => {
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
    })
  })

  it('Deve buscar todas as chaves PIX da conta', () => {
    cy.getPixKeys(token).then((response) => {
      cy.log('Resposta do GET - Chaves PIX da conta:')
      cy.log(JSON.stringify(response.body, null, 2))
      console.log('Resposta completa do GET:', response.body)
    })
  })
})

