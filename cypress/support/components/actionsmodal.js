/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
export function selectTypeText() {
  cy.get('[data-testid="dropdown-action-type"]')
    .should("be.visible")
    .click()
    .click()
}

export function typeOnResponseBox(textToType) {
  cy.get('.cl-modal_body').within(() => {
    cy.get('div[data-slate-editor="true"]')
      .should("be.visible")
      .click()
      .type(textToType)
      .trigger('keyup')
      .wait(1000)
  })
}

export function typeLetterOnResponseBox(letter) {
  //if (letter ==="$") letter = '{shift}4';  //TODO: cypress is not resolving shift^4 to trigger entity finder event.
  cy.get('.cl-modal_body').within(() => {
    cy.get('div[data-slate-editor="true"]')
      //.type(letter, { release: false })   //enable if the key combination works.
      .type(letter)
      .trigger('onChange')
      .wait(2000)
  })
}

export function typeExpectedEntityInResponse(entityName) {
  cy.get('.cl-modal_body').within(() => {
    cy.get('.cl-action-creator--expected-entities').within(() => {
      cy.get('.ms-BasePicker-input')
        .type(`${entityName}{enter}`)
        .wait(1000)
    })
  })
}

export function typeRequiredEntities(entityName) {
  cy.get('.cl-modal_body').within(() => {
    cy.get('.cl-action-creator--required-entities').within(() => {
      cy.get('.ms-BasePicker-input')
        .type(`${entityName}{enter}`)
        .wait(1000)
    })
  })
}

export function typeDisqualifyingEntities(entityName) {
  cy.get('.cl-modal_body').within(() => {
    cy.get('.cl-action-creator--disqualifying-entities').within(() => {
      cy.get('.ms-BasePicker-input')
        .type(entityName)
        .type('{enter}')
        .wait(1000)
    })
  })
}

export function clickWaitForResponse() {
  cy.get('.cl-modal_body').within(() => {
    cy.get('.ms-Checkbox-text')
      .should("be.visible")
      .click()
      .wait(1000)
  })
}

export function clickCreateButton() {
  cy.server()
  cy.route('POST', '/sdk/app/*/action').as('postAction')
  cy.route('GET', '/sdk/app/*/trainingstatus').as('getTrainingstatus')

  cy.get('[data-testid="actioncreator-button-create"]')
    .should("be.visible")
    .click()

  cy.wait('@postAction')
  cy.wait('@getTrainingstatus')
}
