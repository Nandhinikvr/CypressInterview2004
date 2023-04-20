import test from '../../objects/test.obj'
class HomePage {

    signinOrRegisterButton() {
        return cy.get(test.signinOrRegister)
    }
  
    getUserEmail(){
        return cy.get(test.signInEmail)
    }

    
    acceptAllCookieButton() {
        return cy.get(test.acceptAllCookie)
    }

    continueLoginButton() {
        return cy.get(test.continueLogin)
    }

    getInputErrorMessage() {
        return cy.get(test.inputErrorMessage)
    }
    getPasswordErrorMessage(){
        return cy.get(test.passwordErrorMessage)

    }

    signOutMenu()
    {
        return cy.get(test.signOut)
    }
    getPassword() {
        return cy.get(test.password)
    }

    submitButton() {
        return cy.get(test.continueLogin)
    }

    profileDetailsButton() {
        return cy.get(test.profileDetails)
    }

    profileID() {
        return cy.get(test.profileId)
    }
}

export default HomePage;
