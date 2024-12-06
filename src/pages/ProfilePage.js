import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from '../components/forms/Profile';
import { useNavigate } from "react-router-dom";

import "../styles//ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    email: "",
    first_name: "",
    last_name: "",
    profileImage: "", // Null means no profile image uploaded yet
  });
  const [error, setError] = useState("");

// Fetch profile data dari API saat halaman dimuat
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const response = await axios.get("https://take-home-test-api.nutech-integrasi.com/profile");
      if (response.status === 200) {
        const { email, first_name, last_name } = response.data.data;
        setProfile({
          email,
          first_name,
          last_name,
          profileImage: response.data.data.profile_image || "",
        });
        setLoading(false);
      }
    } catch (err) {
      setError("Gagal memuat data profil. Silakan coba lagi.");
      setLoading(false);
    }
  };

  fetchProfileData();
}, []);

if (loading) {
  return <div>Loading...</div>; // Menampilkan indikator loading
}

  // Handle profile picture update
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];

    // Validate file size (max 100 KB)
    if (file.size > 100 * 1024) {
      setError("Ukuran gambar maksimum adalah 100 KB");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/profile/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setProfile((prev) => ({ ...prev, profileImage: URL.createObjectURL(file) }));
        setError("");
        alert("Profile picture berhasil diperbarui!");
      }
    } catch (err) {
      setError("Gagal memperbarui profile picture. Silakan coba lagi.");
    }
  };

  // Handle edit profile button
  const handleEditProfile = () => {
    alert("Fitur edit profile belum diimplementasikan sepenuhnya.");
    // Implement form or modal for editing profile data
  };

  // Handle logout button
  const handleLogout = () => {
    localStorage.removeItem("sessionToken"); // Clear session token
    navigate("/login"); // Redirect to login page
  };


  return (
    <div className="profile-container">
        <header className="homepage-header">
        <div className='homepage-title'>
        <img src="/images/Logo.png" alt="Logo" />
        <h1 className="logotext">SIMS PPOB</h1>
        </div>
          <nav>
            <ul>
              <ul className="nav-menu">
            <li onClick={() => navigate("/topup")}>Top Up</li>
            <li onClick={() => navigate("/history")}>Transaction</li>
            <li className="active">Akun</li>
          </ul>
            </ul>
          </nav>
        </header>

      {/* Main Content */}
      <main className="profiles-section">
        <div className="profile-header">
          <img
            src={profile.profileImage || "https://via.placeholder.com/80"}
            alt="User Avatar"
            className="profile-avatar"
          />
          <button id="profilePictureInput"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="edit-avatar-btn"></button>
               <input
              id="profilePictureInput"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
          <h1>{profile.first_name} {profile.last_name}</h1>
        </div>

        <form className="profile-form">
          <div className="form-group">
            <label>Email</label>
            <input type="text" value={profile.email} readOnly />
          </div>

          <div className="form-group">
            <label>Nama Depan</label>
            <input type="text" value={profile.first_name} readOnly />
          </div>

          <div className="form-group">
            <label>Nama Belakang</label>
            <input type="text" value={profile.last_name} readOnly />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="edit-profile-btn" onClick={handleEditProfile}>Edit Profil</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </form>
      </main>
    </div>
  );
};

export default ProfilePage;