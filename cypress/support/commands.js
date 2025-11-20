// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command para realizar login e retornar o token de autenticação
 * @returns {string} Token de acesso
 */
Cypress.Commands.add('login', () => {
  const loginBody = {
    username: Cypress.env('username'),
    secret: Cypress.env('password'),
    partner: Cypress.env('partner')
  }

  return cy.request({
    method: 'POST',
    url: 'https://api.paymodetech.com.br/auth/oauth2/userwhitelabelcredentials',
    body: loginBody,
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(`Erro 401 - Credenciais inválidas. Verifique se as credenciais no arquivo .env estão corretas:
      - Username: ${Cypress.env('username')}
      - Password: ${Cypress.env('password')}
      - Partner: ${Cypress.env('partner')}
      
      Se as credenciais estão corretas, verifique se a API não mudou ou se há algum problema de conectividade.`)
    }
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('access_token')
    
    // Usa cy.wrap() para manter o encadeamento assíncrono correto
    const token = response.body.access_token
    return cy.log(`Token obtido: ${token}`).then(() => token)
  })
})
/**
 * Custom command para buscar todas as chaves PIX de uma conta
 * Utiliza automaticamente o ACCOUNT_ID configurado no .env
 * @param {string} token - Token de autenticação
 * @returns {Object} Response com a lista de chaves PIX
 */
Cypress.Commands.add('getPixKeys', (token) => {
  const accountId = `${Cypress.env('ACCOUNT_ID')}`
  
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}/whitelabel/pixdict/${accountId}/entries`,
    headers: {
      Authorization: `${token}`,
      Partner: `${Cypress.env('partner')}`,
      accountId: accountId
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    console.log(`Encontradas ${response.body.length} chave(s) PIX`)
    return response
  })
})
