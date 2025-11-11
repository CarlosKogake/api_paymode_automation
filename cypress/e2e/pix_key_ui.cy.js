/// <reference types="cypress" />
describe('Teste de UI - Chave PIX', () => {
  it('Cria e deleta chave PIX pela interface', () => {
    cy.visit('https://internet-banking.paymodetech.com.br/')
    cy.get('input[name="taxId"]').type('52332212841')
    cy.get('input[name="password"]').type('Globals2025@')
    cy.get('button[type="submit"]').contains('Logar').click()
    cy.get('div').contains('Pix').click()
    cy.get('a[href="/pix/keys"]').contains('Chaves PIX').click()
    cy.get('button').contains('Adicionar chave').click()
    cy.get('button[role="combobox"]').find('span').contains('CPF').parent().click()
    cy.get('[role="option"]').last().click()
    cy.get('button[type="submit"]').contains('Criar chave').click()
    cy.get('button[aria-haspopup="true"]').first().click()
    cy.get('button[aria-haspopup="dialog"]').contains('Remover').click()
    cy.get('button').contains('Confirmar').click()
  })
})

