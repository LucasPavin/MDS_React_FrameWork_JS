import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connexion from './pages/Connexion.js';
import Inscription from './pages/Inscription.js';
import Header from './partials/Header'
import AllCategory from './pages/AllCategory.js';
import './scss/layout/var.scss'
import CreateCategory from './pages/CreateCategory.js';

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        {/* <Route exact path="/" component={} /> */}
        <Route exact path="/connexion" element={<Connexion />} />
        <Route exact path="/inscription" element={<Inscription />} />
        <Route exact path="/categories" element={<AllCategory />} />
        <Route exact path="/categories/creation" element={<CreateCategory />} />
      </Routes>
    </Router>
  );
};

export default App;
