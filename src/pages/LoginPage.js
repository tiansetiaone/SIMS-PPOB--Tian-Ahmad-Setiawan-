import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/images/Logo.png";
import "../styles/LoginPage.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const [error, setError] = useState("");
      const navigate = useNavigate();
    
      // Handle form input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      // Handle login form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate fields
        if (!formData.email || !formData.password) {
          setError("Semua field wajib diisi!");
          return;
        }
    
        try {
          // Call the login API
          const response = await fetch("https://take-home-test-api.nutech-integrasi.com/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });
    
          // Parse the response
          const data = await response.json();
    
          if (response.ok) {
            // Save the session token to localStorage
            localStorage.setItem("sessionToken", data.token);
    
            // Redirect to the home page
            navigate("/");
          } else {
            // Show error message from API response
            setError(data.message || "Login gagal. Silakan coba lagi.");
          }
        } catch (error) {
          // Handle network or server errors
          setError("Terjadi kesalahan. Silakan coba lagi.");
        }
      };
    
  return (
<div className="registration-container">
      <div className="form-container">
        <div className="logocontainer">
          <img src={logo} alt="Logo" />
          <h2 className="logotext">SIMS PPOB</h2>
        </div>
        <h2>Lengkapi data untuk membuat akun</h2>
          <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="masukan email anda" name="email"
                className="form-input" value={formData.email} onChange={handleChange}
              />
              <input
                type="password"
                placeholder="masukan password anda"
                name="password"
                className="form-input"
                onChange={handleChange}
              />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">
              Masuk
            </button>
          </form>
          <p className="register-link">
            belum punya akun? registrasi <a href="/register">di sini</a>
          </p>
        </div>
        <div className="illustration-container"></div>
      </div>
  );
};

export default LoginPage;