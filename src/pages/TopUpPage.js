import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopUpForm from '../components/forms/TopUpForm';
import '../styles/TopUpPage.css';
import logo from "../assets/images/Logo.png";
import { useState, useEffect } from 'react';
import { ImSection } from 'react-icons/im';

const TopUpPage = () => {
  const navigate = useNavigate();
    return (
<div className="homepage">
        <header className="homepage-header">
        <div className='homepage-title'>
        <img src={logo} alt="Logo" />
        <h1 className="logotext">SIMS PPOB</h1>
        </div>
          <nav>
            <ul>
              <ul className="nav-menu">
            <li className="active">Top Up</li>
            <li onClick={() => navigate("/history")}>Transaction</li>
            <li onClick={() => navigate("/profile")}>Akun</li>
          </ul>
            </ul>
          </nav>
        </header>
  
        <section className="profile-section">
          <div className="profile-info">
            <img
              src="profile.png" // Ganti dengan image path
              alt="Profile"
              className="profile-picture"
            />
            <div>
              <p>Selamat datang,</p>
              <h1>Kristanto Wibowo</h1>
            </div>
          </div>
          <div className="balance-cards">
            <h4>Saldo anda</h4>
            <p><strong>Rp *********</strong></p>
            <button>Lihat Saldo</button>
          </div>
        </section>
  
          <section className="topup-form">
            <p>Silahkan masukan</p>
            <h1>Nominal Top Up</h1>
            <div className="topup-fill">
              <div className="fill-form" >
            <input
              type="text"
              placeholder="masukan nominal Top Up"
              className="input-field"
            />
            <button className="topup-button">Top Up</button>
            </div>
            <div className="quick-buttons">
              <button>Rp10.000</button>
              <button>Rp20.000</button>
              <button>Rp50.000</button>
              <button>Rp100.000</button>
              <button>Rp250.000</button>
              <button>Rp500.000</button>
            </div>
            </div>
          </section>
      
      </div>
    );
  };
  
  export default TopUpPage;