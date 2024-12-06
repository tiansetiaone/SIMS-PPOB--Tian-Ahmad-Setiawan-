import React from "react";
import { useNavigate } from 'react-router-dom';
import TransactionHistory from "../components/forms/TransactionHistory";
import logo from "../assets/images/Logo.png";
import "../styles/TransactionHistoryPage.css";


const TransactionHistoryPage = () => {
  const navigate = useNavigate();
  const transactions = [
    { amount: "+ Rp10.000", date: "17 Agustus 2023", time: "13:10 WIB", type: "Top Up Saldo", isPositive: true },
    { amount: "- Rp40.000", date: "17 Agustus 2023", time: "12:10 WIB", type: "Pulsa Prabayar", isPositive: false },
    { amount: "- Rp10.000", date: "17 Agustus 2023", time: "11:10 WIB", type: "Listrik Pascabayar", isPositive: false },
    { amount: "+ Rp50.000", date: "17 Agustus 2023", time: "10:10 WIB", type: "Top Up Saldo", isPositive: true },
    { amount: "+ Rp50.000", date: "17 Agustus 2023", time: "10:10 WIB", type: "Top Up Saldo", isPositive: true },
  ];

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
            <li onClick={() => navigate("/topup")}>Top Up</li>
            <li className="active">Transaction</li>
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

        <div className="transaction-history">
          <h2>Semua Transaksi</h2>
          <ul className="transaction-list">
            {transactions.map((transaction, index) => (
              <li key={index} className={`transaction-item ${transaction.isPositive ? "positive" : "negative"}`}>
                <div className="transaction-details">
                  <span className="transaction-amount">{transaction.amount}</span>
                  <span className="transaction-date">
                    {transaction.date} • {transaction.time}
                  </span>
                </div>
                <div className="transaction-type">{transaction.type}</div>
              </li>
            ))}
          </ul>
          <button className="show-more">Show more</button>
        </div>

    </div>
  );
};

export default TransactionHistoryPage;
