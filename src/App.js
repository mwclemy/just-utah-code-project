import './App.css';
import { useState } from 'react';
import { checkValidity, updatedObject } from './shared/utility'
import Spinner from './components/Spinner/Spinner';

function App() {

  // app states
  const [contactForm, setContactForm] = useState({
    name: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false

    },
    email: {
      value: '',
      validation: {
        required: true,
        validEmail: true
      },
      valid: false,
      touched: false
    },
    birthDate: {
      value: '',
      validation: {
        required: true,
        validDate: true
      },
      valid: false,
      touched: false
    },
    emailConsent: {
      value: false,
      validation: {
        emailConsent: true
      },
      valid: false,
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucessMessage, setSuccessMessage] = useState("");

  // called when the form is submitted.
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    contact();
  };

  // handles the onchange event of the form inputs
  const handleChange = (event) => {
    event.persist();
    const inputIdentifier = event.target.name;

    const updatedFormElement = updatedObject(contactForm[inputIdentifier], {
      value: inputIdentifier === 'emailConsent' ? event.target.checked : event.target.value,
      valid: checkValidity(inputIdentifier === 'emailConsent' ? event.target.checked : event.target.value, contactForm[inputIdentifier].validation),
      touched: true
    })
    const updatedForm = updatedObject(contactForm, {
      [inputIdentifier]: updatedFormElement
    });
    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    setContactForm(updatedForm);
    setFormIsValid(formIsValid);

  };

  // clear values
  const clearForm = () => {
    setContactForm({
      name: {
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false

      },
      email: {
        value: '',
        validation: {
          required: true,
          validEmail: true
        },
        valid: false,
        touched: false
      },
      birthDate: {
        value: '',
        validation: {
          required: true,
          validDate: true
        },
        valid: false,
        touched: false
      },
      emailConsent: {
        value: false,
        validation: {
          emailConsent: true
        },
        valid: false,
      }
    });
  }

  // makes an api call once there are no form errors
  const contact = async () => {
    const userData = {};
    for (let formElementIdentifier in contactForm) {
      userData[formElementIdentifier] = contactForm[formElementIdentifier].value;
    }
    try {
      setLoading(true)
      const response = await fetch('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', {
        crossDomain: true,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{ id: 1, ...userData }])
      });
      const data = await response.json();
      setSuccessMessage("Thanks for contacting us! We'll get back to you shortly.")
      setLoading(false)
      // Clear the form
      clearForm();
    } catch (error) {
      console.log(error);

    }
  }


  return (
    <div className="App">
      {loading && <Spinner />}
      {sucessMessage && <p className="successMessage">{sucessMessage}</p>}
      <h2>Contact US</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input className={!contactForm.name.valid && contactForm.name.touched ? 'invalid' : undefined}
            type="text"
            name="name"
            id="name"
            onChange={handleChange} value={contactForm.name.value} />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input className={!contactForm.email.valid && contactForm.email.touched ? 'invalid' : undefined}
            type="email"
            name="email"
            id="email"
            onChange={handleChange} value={contactForm.email.value} />
        </div>
        <div className="formGroup">
          <label htmlFor="birthDate">BirthDate</label>
          <input className={!contactForm.birthDate.valid && contactForm.birthDate.touched ? 'invalid' : undefined}
            type="date" name="birthDate"
            id="birthDate"
            onChange={handleChange} value={contactForm.birthDate.value} />
        </div>
        <div className="formGroup">
          <input className={!contactForm.emailConsent.valid && contactForm.emailConsent.touched ? 'invalid' : undefined}
            type="checkbox"
            id="emailConsent"
            name="emailConsent"
            onChange={handleChange} value={contactForm.emailConsent.value} />
          <label id="checkboxLabel" htmlFor="emailConsent"> I agree to be contacted via email.</label>
        </div>
        <div className="formGroup">
          <input className={`button ${formIsValid && 'submitButton'}`} type="submit" disabled={!formIsValid} />
          <input className="button submitButton" type="button" value="Clear" onClick={clearForm} />
        </div>
      </form>
    </div>
  );
}

export default App;
