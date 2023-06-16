import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AllCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryExpenses, setSelectedCategoryExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  // Récupération de l'ensemble des catégories de l'utilisateur
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        // Vérification du token
        if (!token) {
          // Renvoie sur la page de connexion si pas de token
          navigate('/connexion');
        } else {
          // Récupération du token de l'utilisateur
          const token_bearer = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          // Récupération de l'ensemble des catégories, le token est passé en paramètre
          const response = await axios.get('http://localhost:8080/categories', token_bearer);
          setCategories(response.data);
        }
      } catch (error) {
        // Renvoie d'erreur
        console.error(error);
      }
    };

    fetchCategories();
  }, [navigate]);
  // Récupération des dépenses au click sur une catégorie
  // On vient rechercher l'id de la catégorie sur laquelle on a cliqué
  const handleCategoryClick = async (categoryId) => {
    try {
      // Vérification du token
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/connexion');
      } else {
        const token_bearer = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        // Récupération des dépenses
        // ${id} remplace :id dans notre application nodeJS.
        const response = await axios.get(`http://localhost:8080/categories/${categoryId}/depenses`, token_bearer);
        // Envoie la mise pour les dépenses
        setSelectedCategoryExpenses(response.data);
        // J'ai décidé de faire l'ouverture de la dépense sur un principe de modal, donc on active si tout se passe bien
        setIsModalOpen(true);
      }
    } catch (error) {
      // Renvoie d'erreur
      console.error(error);
    }
  };
  // Permet la création d'une dépense au click sur le bouton 'Créer une dépense'
  const handleCreateExpense = async () => {
    try {
      // Récupération du token de l'utilisateur
      const token = localStorage.getItem('token');
      // Vérification du token
      if (!token) {
        //Si pas de token = renvoie sur le slug connexion
        navigate('/connexion');
      } else {
        const token_bearer = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        // On rédcupère l'id de la catégorie choisi
        const categoryId = selectedCategoryExpenses.length > 0 ? selectedCategoryExpenses[0].category : '';
        // Récupérera le nouveau nom et le nouveau montant
        const body = {
          name: newExpenseName,
          amount: newExpenseAmount,
        };
        // Récupération de la méthode permettant de créer une dépense
        const response = await axios.post(`http://localhost:8080/categories/${categoryId}/depenses`, body, token_bearer);
        // Ajout 
        setSelectedCategoryExpenses([...selectedCategoryExpenses, response.data]);
        // Remis des setteur à vide
        setNewExpenseName('');
        setNewExpenseAmount('');
      }
    } catch (error) {
      // Renvoie d'erreur
      console.error(error);
    }
  };

  const handleUpdateExpense = async (expenseId, newName, newAmount) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/connexion');
      } else {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const body = {
          name: newName,
          amount: newAmount,
        };

        const response = await axios.put(`http://localhost:8080/depenses/${expenseId}`, body, config);
        const updatedExpenses = selectedCategoryExpenses.map((expense) =>
          expense._id === response.data._id ? response.data : expense
        );
        setSelectedCategoryExpenses(updatedExpenses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/connexion');
      } else {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`http://localhost:8080/depenses/${expenseId}`, config);
        const updatedExpenses = selectedCategoryExpenses.filter((expense) => expense._id !== expenseId);
        setSelectedCategoryExpenses(updatedExpenses);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Variable permettant 
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Liste des catégories</h1>
      <div>
        <Link to="/categories/creation">
          <button>Créer une catégorie</button>
        </Link>
      </div>

      <ul>
        {categories.map((category) => (
          <li key={category._id} onClick={() => handleCategoryClick(category._id)}>
            {category.name}
          </li>
        ))}
      </ul>

      <div>
        <button onClick={openModal}>Voir les dépenses</button>
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
          <h2>Dépenses de la catégorie sélectionnée</h2>
          <ul>
            {selectedCategoryExpenses.map((expense) => (
              <li key={expense._id}>
                <input
                  type="text"
                  value={expense.name}
                  onChange={(e) => handleUpdateExpense(expense._id, e.target.value, expense.amount)}
                />
                <input
                  type="number"
                  value={expense.amount}
                  onChange={(e) => handleUpdateExpense(expense._id, expense.name, e.target.value)}
                />
                <button onClick={() => handleDeleteExpense(expense._id)}>Supprimer</button>
              </li>
            ))}
          </ul>
          <div>
            <h3>Créer une nouvelle dépense</h3>
            <label>Nom:</label>
            <input type="text" value={newExpenseName} onChange={(e) => setNewExpenseName(e.target.value)} />
            <label>Montant:</label>
            <input type="number" value={newExpenseAmount} onChange={(e) => setNewExpenseAmount(e.target.value)} />
            <button onClick={handleCreateExpense}>Créer</button>
          </div>
          <button onClick={closeModal}>Fermer</button>
        </Modal>
      </div>
    </div>
  );
};

export default AllCategory;
