
export const validate = (values) => {
    let errors = {};
    // Name validations
    if (!values.name) {
        errors.name = 'Name can not be blank.'
    }

    //Email validations
    if (!values.email) {
        errors.email = 'Email can not be blank.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email must be a valid email address.';
    }

    // Birthdate validations
    if (!values.birthDate) {
        errors.birthDate = 'BirthDate can not be blank.'
    }
    else if (isNaN(Date.parse(values.birthDate))) {
        errors.birthDate = 'BirthDate must be a valid date'
    }

    console.log(values);
    // email consent validations
    if (!values.emailConsent) {
        errors.emailConsent = 'You must agree to be contacted via email.'
    }
    return errors;
};


