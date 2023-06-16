import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../scss/pages/connexion.scss';
import '../scss/layout/button.scss';


const Connexion = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });  
  
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/connexion', formData)
      .then((response) => {
        const { token } = response.data;
  
        // Stocker le token 
        localStorage.setItem('token', token);
  
        // Rediriger vers la page des catégories
        navigate('/categories');

      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.msg) {
          setError(error.response.data.msg);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <section className='connexion'>
      <div className='connexion__content'>
        <div className='connexion__content__title'>
          <h1>Connexion</h1>
        </div>
        <div className='connexion__content__form'>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
            {error && <p className="error">{error}</p>} 
            <div className='connexion__content__form_btn'>
              <button type="submit" className='btn primary'>Se connecter</button>
            </div>
          </form>
        </div>
      </div>
      
    </section>
  );
};

export default Connexion;
