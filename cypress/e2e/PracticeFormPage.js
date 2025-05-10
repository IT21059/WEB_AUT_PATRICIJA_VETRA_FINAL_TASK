class PracticeFormPage {
  elements = {
    // Form elements
    firstName: () => cy.get('#firstName'),
    lastName: () => cy.get('#lastName'),
    email: () => cy.get('#userEmail'),
    genderRadio: (gender) => cy.contains('label', gender),
    mobile: () => cy.get('#userNumber'),
    dobInput: () => cy.get('#dateOfBirthInput'),
    subjectsInput: () => cy.get('#subjectsInput'),
    hobbiesCheckbox: (hobby) => cy.contains('label', hobby).prev('input'),
    pictureInput: () => cy.get('#uploadPicture'),
    address: () => cy.get('#currentAddress'),
    stateDropdown: () => cy.get('#state'),
    cityDropdown: () => cy.get('#city'),
    submitButton: () => cy.get('#submit'),
    
    // Date Picker elements
    datePickerMonth: () => cy.get('.react-datepicker__month-select'),
    datePickerYear: () => cy.get('.react-datepicker__year-select'),
    datePickerDay: (day) => cy.get(`.react-datepicker__day:not(.react-datepicker__day--outside-month)`).contains(day),
    
    // Modal elements
    modalTable: () => cy.get('.table-responsive'),
    modalHeader: () => cy.get('#example-modal-sizes-title-lg')
  }

  visit() {
    cy.visit('/automation-practice-form')
  }

  setDateOfBirth(day, month, year) {
    this.elements.dobInput().click()
    this.elements.datePickerMonth().select(month)
    this.elements.datePickerYear().select(year)
    this.elements.datePickerDay(day).click()
  }

  selectStateAndCity(state, city) {
    this.elements.stateDropdown().click().type('{enter}')
      .contains(state).click()
    this.elements.cityDropdown().click().type('{enter}')
      .contains(city).click()
  }

  validateSubmittedData(expectedData) {
    this.elements.modalTable().within(() => {
      cy.validateTableRow('Student Name', `${expectedData.firstName} ${expectedData.lastName}`)
      cy.validateTableRow('Student Email', expectedData.email)
      cy.validateTableRow('Gender', expectedData.gender)
      cy.validateTableRow('Mobile', expectedData.mobile)
      cy.validateTableRow('Date of Birth', `${day} ${month},${year}`)
      cy.validateTableRow('Subjects', expectedData.subjects)
      cy.validateTableRow('Hobbies', expectedData.hobbies)
      cy.validateTableRow('Picture', expectedData.picture)
      cy.validateTableRow('Address', expectedData.address)
      cy.validateTableRow('State and City', `${expectedData.state} ${expectedData.city}`)
    })
  }
}

export default new PracticeFormPage()
