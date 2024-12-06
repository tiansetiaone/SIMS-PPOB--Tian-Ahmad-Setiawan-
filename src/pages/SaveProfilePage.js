import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice';
import "../styles/SaveProfilePage.css";
import SaveProfileForm from '../components/forms/SaveProfileForm';

const SaveProfilePage = () => {
  return (
    <div className="profile-container">
      <header className="header">
        <div className="logo">SIMS PPOB</div>
        <nav className="nav-links">
          <a href="/topup">Top Up</a>
          <a href="/transaction">Transaction</a>
          <a href="/profile" className="active">Akun</a>
        </nav>
      </header>

      <main className="profile-content">
        <div className="profile-image-section">
          <div className="profile-image">
            <img src="/path/to/avatar.png" alt="Profile" />
            <button className="edit-icon">✏️</button>
          </div>
          <h2>Kristanto Wibowo</h2>
        </div>

        <form className="profile-form">
          <label>
            Email
            <input type="email" defaultValue="wallet@nutech.com" />
          </label>
          <label>
            Nama Depan
            <input type="text" defaultValue="Kristanto" />
          </label>
          <label>
            Nama Belakang
            <input type="text" defaultValue="Wibowo" />
          </label>
          <button type="submit" className="save-button">
            Simpan
          </button>
        </form>
      </main>
    </div>
  );
};

export default SaveProfilePage;
