import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/forms/RegistrationForm";
import logo from "../assets/images/Logo.png";
import "../styles/RegistrationPage.css";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate password match in real-time
    if (name === "password" || name === "confirmPassword") {
      if (formData.password !== "" && formData.confirmPassword !== "" && formData.password !== value) {
        setPasswordMatchMessage("Password tidak sesuai");
      } else if (formData.password !== "" && formData.confirmPassword !== "") {
        setPasswordMatchMessage("Password sesuai");
      } else {
        setPasswordMatchMessage("");
      }
    }
  };

  // Validate fields and submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Semua field wajib diisi!");
      setSuccessMessage("");
      return;
    }
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak sesuai!");
      setSuccessMessage("");
      return;
    }

    // Reset error message
    setError("");

    try {
      // Call API registration
      const response = await fetch("https://take-home-test-api.nutech-integrasi.com/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        }),
      });

      // Parse response
      const data = await response.json();

      if (response.ok) {
        // Success
        setSuccessMessage("Registrasi berhasil!");
        setFormData({ first_name: "", last_name: "", email: "", password: "", confirmPassword: "" }); // Reset form
        setPasswordMatchMessage("");
      } else {
        // API returned an error
        setError(data.message || "Registrasi gagal. Silakan coba lagi.");
      }
    } catch (error) {
      // Network or server error
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
        <form className="registration-form" onSubmit={handleSubmit}>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="masukkan email anda" />
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="nama depan" />
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="nama belakang" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="buat password" />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="konfirmasi password" />
          {passwordMatchMessage && <p className={passwordMatchMessage === "Password sesuai" ? "success-message" : "error-message"}>{passwordMatchMessage}</p>}
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="register-button">
            Registrasi
          </button>
        </form>
        <p className="login-link">
          Sudah punya akun? Login <a href="/login">di sini</a>
        </p>
      </div>
      <div className="illustration-container"></div>
    </div>
  );
};

export default RegistrationPage;
