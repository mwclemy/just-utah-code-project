import './App.css';
import { useState, useEffect } from 'react';
import { validate } from './shared/utility'
import Spinner from './components/Spinner/Spinner';
function App() {

  // app states
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sucessMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // called when the form is submitted.
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  // handles the onchange event of the form inputs
  const handleChange = (event) => {
    event.persist();
    if (event.target.name === 'emailConsent') {
      setValues(values => ({ ...values, [event.target.name]: event.target.checked }));
    }
    else {
      setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    }
  };

  // clear values
  const clearValues = () => {
    setValues({});
  }

  // makes an api call once there are no form errors
  const contact = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', {
        crossDomain: true,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{ id: 1, ...values }])
      });
      const data = await response.json();
      setSuccessMessage("Thanks for contacting us! We'll get back to you shortly.")
      setLoading(false)
      // Clear the form
      clearValues();
    } catch (error) {
      console.log(error);

    }
  }

  // This gets called each time the errors object changes
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      contact();
    }
  }, [errors]);

  return (
    <div className="App">
      {loading && <Spinner />}
      {sucessMessage && <p className="successMessage">{sucessMessage}</p>}
      <h2>Contact US</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={handleChange} value={values.name || ''} />
          {errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} value={values.email || ''} />
          {errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="birthDate">BirthDate</label>
          <input type="date" name="birthDate" id="birthDate" onChange={handleChange} value={values.birthDate || ''} />
          {errors.birthDate && (
            <p className="error">{errors.birthDate}</p>
          )}
        </div>
        <div className="formGroup">
          <input type="checkbox" id="emailConsent" name="emailConsent" onChange={handleChange} value={values.emailConsent || false} />
          <label id="checkboxLabel" htmlFor="emailConsent"> I agree to be contacted via email.</label>
          {errors.emailConsent && (
            <p className="error">{errors.emailConsent}</p>
          )}
        </div>
        <div className="formGroup">
          <input className="submitButton" type="submit" />
          <input className="submitButton" type="button" value="Clear" onClick={clearValues} />
        </div>
      </form>
    </div>
  );
}

export default App;
