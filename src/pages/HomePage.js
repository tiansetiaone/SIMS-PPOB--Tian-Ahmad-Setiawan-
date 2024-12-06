import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice';
import logo from "../assets/images/Logo.png";
import { useState, useEffect } from 'react';

import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [balance, setBalance] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil token dari localStorage
        const token = localStorage.getItem("session_token");
        if (!token) {
          console.error("Token tidak ditemukan. Harap login ulang.");
          window.location.href = "/"; // Redirect ke halaman login
          return;
        }

        // Konfigurasi header Authorization
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Lakukan request secara paralel ke API
        const [profileRes, balanceRes, servicesRes, bannersRes] = await Promise.all([
          axios.get("https://take-home-test-api.nutech-integrasi.com/profile", { headers }),
          axios.get("https://take-home-test-api.nutech-integrasi.com/balance", { headers }),
          axios.get("https://take-home-test-api.nutech-integrasi.com/services", { headers }),
          axios.get("https://take-home-test-api.nutech-integrasi.com/banner", { headers }),
        ]);

        // Update state dengan data dari API
        setProfile(profileRes.data);
        setBalance(balanceRes.data.balance);
        setBanners(bannersRes.data.banners);
      } catch (error) {
        // Tangani error, termasuk token kadaluarsa
        if (error.response && error.response.status === 401) {
          console.error("Token kadaluarsa atau tidak valid. Harap login ulang.");
          localStorage.removeItem("session_token"); // Hapus token
          window.location.href = "/"; // Redirect ke halaman login
        } else {
          console.error("Error saat memuat data:", error.response || error.message);
        }
      } finally {
        setLoading(false);
      }
    };

 
  }, []);

    const services = [
      { title:'PBB',image: '/images/PBB.png' },
       { title:'Listrik',image: '/images/Listrik.png' },
       { title:'Pulsa',image: '/images/Pulsa.png' },
       { title:'PDAM',image: '/images/PDAM.png' },
       { title:'PGN',image: '/images/PGN.png' },
       { title:'TV Langganan',image: '/images/Televisi.png' },
       { title:'Musik',image: '/images/Musik.png' },
       { title:'Voucher Game',image: '/images/Game.png' },
       { title:'Voucher Makanan',image: '/images/Voucher Makanan.png' },
       { title:'Kurban',image: '/images/Kurban.png' },
       { title:'Zakat',image: '/images/Zakat.png' },
       { title:'Paket Data',image: '/images/Paket Data.png' },
    ];
  
    const promotions = [
      {
        image: '/images/Banner 1.png', // Ganti dengan URL/image path
      },
      {
        image: '/images/Banner 2.png', // Ganti dengan URL/image path
      },
      {
        image: '/images/Banner 3.png', // Ganti dengan URL/image path
      },
      {
        image: '/images/Banner 4.png', // Ganti dengan URL/image path
      },
      {
        image: '/images/Banner 5.png', // Ganti dengan URL/image path
      },
    ];
    const handleImageClick = (title) => {
      console.log(`Gambar ${title} diklik!`);
      // Tambahkan aksi lainnya, seperti navigasi:
      // navigate(`/service/${title.toLowerCase()}`);
    };
  
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
              <h1>{profile.name}</h1>
            </div>
          </div>
          <div className="balance-cards">
            <h4>Saldo anda</h4>
            <p><strong>Rp *********</strong></p>
            <button>Lihat Saldo</button>
          </div>
        </section>
  
        <section className="services-section">
        {services.map((service, index) => (
    <div className="service-item" key={index}>
      <img src={service.image} alt={service.title} className="service-image" onClick={() => handleImageClick(service.title)}  />
      <span>{service.title}</span>
    </div>
          ))}
        </section>
  
        <section className="promotions-section">
          <h3>Temukan promo menarik</h3>
          <div className="promotions-list">
            {promotions.map((promo, index) => (
              <div className="promo-item" key={index}>
                <img src={promo.image} alt={promo.title} />
                <div>
                  <h4>{promo.title}</h4>
                  <p>{promo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };
  
  export default HomePage;