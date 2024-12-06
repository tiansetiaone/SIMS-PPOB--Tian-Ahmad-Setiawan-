import React, { useState } from "react";
import axios from "axios";


const SaveProfileForm = () => {
  // State untuk menyimpan data input pengguna
  const [formData, setFormData] = useState({
    email: "wallet@nutech.com",
    firstName: "Kristanto",
    lastName: "Wibowo",
  });

  const [loading, setLoading] = useState(false); // State untuk menandai loading
  const [successMessage, setSuccessMessage] = useState(""); // State untuk pesan sukses
  const [errorMessage, setErrorMessage] = useState(""); // State untuk pesan error

  // Handler untuk perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk menyimpan data ke server menggunakan Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Kirim data ke API backend
      const response = await axios.put("https://example.com/api/profile", formData);
      setLoading(false);

      if (response.status === 200) {
        setSuccessMessage("Profil berhasil diperbarui!");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("Gagal memperbarui profil. Silakan coba lagi.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-image-section">
          <div className="profile-image">
            <img src="/path/to/avatar.png" alt="Profile" />
            <button className="edit-icon">✏️</button>
          </div>
          <h2>{formData.firstName} {formData.lastName}</h2>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Nama Depan
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Nama Belakang
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default SaveProfileForm;
