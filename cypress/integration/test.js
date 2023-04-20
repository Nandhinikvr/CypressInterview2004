import HomePage from '../support/Pageobjects/Homepage'
describe('efinancialCareer Login validation', () => {
  it('Login valiation', function () {
    const homePage = new HomePage()
    //Visit the efinancial Career Page 
    cy.visit(Cypress.env('url'))
    //clicking Signin/Register Button
    homePage.signinOrRegisterButton().should('be.visible').click()
    //To wait for the Sign in Form to open
    cy.intercept('https://gum.criteo.com/sid/json?origin=onetag&domain=efinancialcareers.com&sn=ChromeSyncframe&so=0&topUrl=www.efinancialcareers.com&cw=1&lsw=1&topicsavail=0&fledgeavail=0').as('filterWait')
    cy.wait('@filterWait')
    homePage.getUserEmail().should('be.visible', { timeout: 10000 })
    var userId = 'testuser123@mailinator.com', password = 'testing123'
    homePage.getUserEmail().eq(2).clear().type(userId)
    homePage.continueLoginButton().should('be.visible').click()
    homePage.getPassword().should('be.visible')
      .clear().type(password)
    homePage.submitButton().should('be.visible').click()
    cy.intercept('https://events-publisher.efinancialcareers.com/pusher/auth').as('filterWait1')
    cy.wait('@filterWait1')
    homePage.profileDetailsButton().should('be.visible', { timeout: 10000 }).click()
    homePage.profileID().should('have.text', ('testuser123@mailinator.com'))
  })

  it('userId valiation', function () {
    const homePage = new HomePage()
    //Visit the efinancial Career Page 
    cy.visit(Cypress.env('url'))
    //clicking Signin/Register Button
    homePage.signinOrRegisterButton().should('be.visible').click()
    //To wait for the Sign in Form to open
    cy.intercept('https://gum.criteo.com/sid/json?origin=onetag&domain=efinancialcareers.com&sn=ChromeSyncframe&so=0&topUrl=www.efinancialcareers.com&cw=1&lsw=1&topicsavail=0&fledgeavail=0').as('filterWait')
    cy.wait('@filterWait')
    homePage.getUserEmail().should('be.visible', { timeout: 10000 })
    var password='testing123'
    var userIdArray = ['testuser123@mailinator@.com', 'testuser@mailinator', 'testuser@com', 'testuser123@mailinator.com'];
    userIdArray.forEach(function (userId) {
      if (userId !== "") {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!re.test(userId)) {
          homePage.getUserEmail().eq(2).clear().type(userId)
          homePage.continueLoginButton().should('be.visible').click()
          homePage.getInputErrorMessage().should('be.visible').should('have.text', ('Please enter a valid email address'))
        }
        else {
          homePage.getUserEmail().eq(2).clear().type(userId)
          homePage.continueLoginButton().should('be.visible').click()
          homePage.getPassword().should('be.visible')
            .clear().type(password)
          homePage.submitButton().should('be.visible').click()
          cy.intercept('https://events-publisher.efinancialcareers.com/pusher/auth').as('filterWait1')
          cy.wait('@filterWait1')
          homePage.profileDetailsButton().should('be.visible', { timeout: 10000 }).click()
          //Comparing data from the fixture file(User id) and Loggedin Profile Id
          homePage.profileID().should('have.text', ('testuser123@mailinator.com'))
        }
      }
    });


  })

  it('password valiation', function () {
    const homePage = new HomePage()
    //Visit the efinancial Career Page 
    cy.visit(Cypress.env('url'))
    //clicking Signin/Register Button
    homePage.signinOrRegisterButton().should('be.visible').click()
    //To wait for the Sign in Form to open
    cy.intercept('https://gum.criteo.com/sid/json?origin=onetag&domain=efinancialcareers.com&sn=ChromeSyncframe&so=0&topUrl=www.efinancialcareers.com&cw=1&lsw=1&topicsavail=0&fledgeavail=0').as('filterWait')
    cy.wait('@filterWait')
    homePage.getUserEmail().should('be.visible', { timeout: 10000 })
    var userId = 'testuser123@mailinator.com'
    //I have given testing123 as password alternatively, in order for the account to not get locked
    var passwordArray = ['testing12', 'testing123', 'testingabc', 'testing123', 'testing1234', 'testing123', '1234567890', 'testing123'];
    homePage.getUserEmail().eq(2).clear().type(userId)
    homePage.continueLoginButton().should('be.visible').click()
    passwordArray.forEach(function (password) {
      if (password !== "") {
        homePage.getPassword().should('be.visible')
          .clear().type(password)
        homePage.submitButton().should('be.visible').click()
        if (password !== 'testing123') {
          homePage.getPasswordErrorMessage().should('be.visible').should('include.text', ('Invalid credentials'))
        }
        else {
          cy.intercept('https://events-publisher.efinancialcareers.com/pusher/auth').as('filterWait1')
          cy.wait('@filterWait1')
          homePage.profileDetailsButton().should('be.visible', { timeout: 10000 }).click()
          homePage.profileID().should('have.text', ('testuser123@mailinator.com'))
          homePage.signOutMenu().should('be.visible', { timeout: 10000 }).click()
          homePage.signinOrRegisterButton().should('be.visible').click()
          homePage.getUserEmail().should('be.visible', { timeout: 10000 })
          var userId = 'testuser123@mailinator.com'
          var passwordArray = ['testing12', 'testing123', 'testingabc', 'testing123', 'testing1234', 'testing123', '1234567890', 'testing123'];
          homePage.getUserEmail().eq(2).clear().type(userId)
          homePage.continueLoginButton().should('be.visible').click()
        }
      }
     })
  })
})
