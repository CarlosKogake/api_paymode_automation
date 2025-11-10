/// <reference types="cypress" />
describe('Teste de Login', () => {
  it('Login com sucesso', () => {
    cy.login().then((token) => {
      expect(token).to.exist
      expect(token).to.be.a('string')
      expect(token.length).to.be.greaterThan(0)
      cy.log(`Login realizado com sucesso. Token: ${token}`)
    })
  })
})