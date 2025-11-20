/// <reference types="cypress" />
describe('Teste de Deleção de Chave PIX', () => {
  let token
  const accountId = `${Cypress.env('ACCOUNT_ID')}`

  before(() => {
    cy.login().then((accessToken) => {
      token = accessToken
    })
  })

  it('Deleta a chave PIX', () => {
    // Primeiro, busca as chaves PIX para obter o ID
    cy.getPixKeys(token).then((getResponse) => {
      expect(getResponse.body.length).to.be.greaterThan(0, 'Deve existir pelo menos uma chave PIX')
      
      // Pega o ID da primeira (e única) chave
      const pixKeyId = getResponse.body[0].id
      expect(pixKeyId).to.exist
      
      cy.log('Chave PIX encontrada:')
      cy.log(JSON.stringify(getResponse.body[0], null, 2))
      console.log('Chave PIX a ser deletada:', getResponse.body[0])
      
      // Deleta a chave PIX usando o ID obtido
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiBaseUrl')}/whitelabel/pixdict/${accountId}/entries/${pixKeyId}`,
        headers: {
          Authorization: `${token}`,
          Partner: `${Cypress.env('partner')}`,
          accountId: accountId
        },
        failOnStatusCode: false
      }).then((deleteResponse) => {
        expect([200, 202, 204]).to.include(deleteResponse.status)
        cy.log(`Chave PIX ${pixKeyId} deletada com sucesso`)
        console.log('Resposta da deleção:', deleteResponse.body)
      })
    })
  })
})
