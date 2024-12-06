import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TopUpPage from './pages/TopUpPage';
import PaymentPage from './pages/PaymentPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import ProfilePage from './pages/ProfilePage';
import SaveProfilePage from './pages/SaveProfilePage';
import ServiceListPage from './pages/ServiceListPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/topup" element={<TopUpPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/history" element={<TransactionHistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/Update" element={<SaveProfilePage />} />
        <Route path="/services" element={<ServiceListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
