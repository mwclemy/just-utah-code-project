// utility function to update an object 
export const updatedObject = (oldObject, updatedObjectElements) => {
    return {
        ...oldObject,
        ...updatedObjectElements
    }

}

// checks the validity of a value against a set of rules
export const checkValidity = (value, rules) => {
    let valid = true;
    if (rules.required) {
        valid = value.trim() !== '' && valid
    }
    if (rules.validEmail) {
        valid = /\S+@\S+\.\S+/.test(value) && valid
    }

    if (rules.validDate) {
        valid = !isNaN(Date.parse(value)) && valid
    }

    if (rules.emailConsent) {
        valid = value && valid
    }

    return valid;

}


