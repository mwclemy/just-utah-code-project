import './App.css';
import { useState, useEffect } from 'react';
import { validate } from './shared/utility'
function App() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  const handleChange = (event) => {
    event.persist();
    if (event.target.name === 'emailConsent')
      event.target.value = event.target.checked
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  const contact = () => {
    console.log(values);
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      contact();
    }
  }, [errors]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label id="name">Name</label>
          <input type="text" name="name" id="name" onChange={handleChange} value={values.name || ''} />
          {errors.name && (
            <p>{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} value={values.email || ''} />
          {errors.email && (
            <p>{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="birthDate">BirthDate</label>
          <input type="date" name="birthDate" id="birthDate" onChange={handleChange} value={values.birthDate || ''} />
          {errors.birthDate && (
            <p>{errors.birthDate}</p>
          )}
        </div>
        <div>
          <input type="checkbox" id="emailConsent" name="emailConsent" onChange={handleChange} value={values.emailConsent || false} />
          <label for="emailConsent"> I agree to be contacted via email.</label>
          {errors.emailConsent && (
            <p>{errors.emailConsent}</p>
          )}
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default App;
