import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaymentForm from '../components/forms/PaymentForm';
import '../styles/PaymentPage.css';

const PaymentPage = () => {
    return (
      <div className="payment-page">
        <header className="payment-header">
          <div className="logo">SIMS PPOB</div>
          <nav>
            <ul className="payment-nav">
              <li><a href="/topup">Top Up</a></li>
              <li><a href="/transaction">Transaction</a></li>
              <li><a href="/account">Akun</a></li>
            </ul>
          </nav>
        </header>
        <main className="payment-content">
          <div className="welcome-section">
            <div className="user-info">
              <img
                src="user-avatar.png" // Ganti dengan URL/path dari avatar pengguna
                alt="User Avatar"
                className="user-avatar"
              />
              <h2>Selamat datang,</h2>
              <h3>Kristanto Wibowo</h3>
            </div>
            <div className="balance-card">
              <h4>Saldo anda</h4>
              <p className="balance">Rp 0</p>
              <button className="toggle-balance">Tutup Saldo 👁</button>
            </div>
          </div>
          <section className="payment-section">
            <h4>Pembayaran</h4>
            <div className="payment-detail">
              <img
                src="electricity-icon.png" // Ganti dengan ikon terkait
                alt="Electricity Icon"
                className="payment-icon"
              />
              <span>Listrik Prabayar</span>
            </div>
            <form className="payment-form">
              <input
                type="text"
                placeholder="10.000"
                className="payment-input"
              />
              <button className="payment-button">Bayar</button>
            </form>
          </section>
        </main>
      </div>
    );
  };
  
  export default PaymentPage;