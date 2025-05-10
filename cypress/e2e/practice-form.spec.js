import PracticeFormPage from '../support/pages/PracticeFormPage'

describe('DemoQA Practice Form', () => {
  const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test.user@example.com',
    gender: 'Male',
    mobile: '1234567890',
    dob: { day: '28', month: 'February', year: '1930' },
    subjects: 'Economics',
    hobbies: 'Music',
    picture: 'test-image.jpg',
    address: '123 Main Street, Test City',
    state: 'NCR',
    city: 'Delhi'
  }

  beforeEach(() => {
    PracticeFormPage.visit()
  })

  it('Submits form with valid data', () => {
    // Fill basic information
    PracticeFormPage.elements.firstName().type(testUser.firstName)
    PracticeFormPage.elements.lastName().type(testUser.lastName)
    PracticeFormPage.elements.email().type(testUser.email)
    PracticeFormPage.elements.genderRadio(testUser.gender).click()
    PracticeFormPage.elements.mobile().type(testUser.mobile)

    // Set Date of Birth using calendar widget
    PracticeFormPage.setDateOfBirth(
      testUser.dob.day,
      testUser.dob.month,
      testUser.dob.year
    )

    // Set Subjects
    PracticeFormPage.elements.subjectsInput()
      .type(testUser.subjects)
      .type('{enter}')

    // Set Hobbies
    PracticeFormPage.elements.hobbiesCheckbox(testUser.hobbies).check()

    // Upload Picture
    PracticeFormPage.elements.pictureInput()
      .selectFile(`cypress/fixtures/files/${testUser.picture}`)

    // Set Address
    PracticeFormPage.elements.address().type(testUser.address)

    // Set State and City
    PracticeFormPage.selectStateAndCity(testUser.state, testUser.city)

    // Submit form
    PracticeFormPage.elements.submitButton().click()

    // Validate modal appearance
    PracticeFormPage.elements.modalHeader()
      .should('contain', 'Thanks for submitting the form')

    // Validate submitted data
    PracticeFormPage.validateSubmittedData(testUser)
  })
})
