import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCreateCategory = async () => {
    try {
      // Récupérer du token d'authentification afin de protégé la création
      const token = localStorage.getItem('token');
      // Condition qui va vérifier le token est disponible ou non
      // Si ce n'est pas le cas il sera renvoyé vers la page de connexion
      if (!token) {
        navigate('/connexion');
      } else {
        // Ajouter du token dans une variable afin de l'envoyer dans la requête POST
        const bearer_token = {
        // Récupération du token
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Effectuer la requête POST pour créer une nouvelle catégorie
        await axios.post(
          'http://localhost:8080/categorie',
          { name },
          bearer_token
        );

        // Rediriger vers la liste des catégories
        navigate('/categories');
      }
    } catch (error) {
        // Si tout ne s'est pas bien passé renvoye des erreurs
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Créer une catégorie</h1>

      <label htmlFor="name">Nom de la catégorie:</label>
      <input type="text" id="name" value={name} onChange={handleNameChange} />

      <button onClick={handleCreateCategory}>Créer</button>
    </div>
  );
};

export default CreateCategory;
