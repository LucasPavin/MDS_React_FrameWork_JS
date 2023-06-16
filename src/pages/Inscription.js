import React, { useState } from 'react';
import axios from 'axios';
import './../scss/partials/Inscription.scss'

const Inscription = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/inscription', formData)
    .then((response) => {
      console.log(response.data);
      setSuccessMessage('Inscription réussie !'); // Définir le message de réussite
      setErrors({}); // Réinitialiser les erreurs
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
      }
    });
  };

  return (
    <section className='inscription'>
      <div className='inscription_content'>
        <div className='inscription_content__title'>
          <h1>Inscription</h1>
        </div>
        <div className='inscription_content__form'>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstname" placeholder="Prénom" value={formData.firstname} onChange={handleChange} />
            {errors && errors.firstname && <p className="error">{errors.firstname}</p>}
            <input type="text" name="lastname" placeholder="Nom" value={formData.lastname} onChange={handleChange} />
            {errors && errors.lastname && <p className="error">{errors.lastname}</p>}
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {errors && errors.email && <p className="error">{errors.email}</p>}
            <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
            <button  className="button-background-move" type="submit">S'inscrire</button>
            {successMessage && <p className="success">{successMessage}</p>}

          </form>
        </div>
      </div>
      
    </section>
  );
};

export default Inscription;
