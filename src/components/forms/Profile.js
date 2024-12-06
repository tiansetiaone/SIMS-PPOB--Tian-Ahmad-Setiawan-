import React, { useState } from 'react';
import axios from 'axios';

const Profile = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put('/profile/update', formData);
      setMessage('Profil berhasil diperbarui!');
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      setMessage('Gagal memperbarui profil: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Profil</h3>
      {!isEditing ? (
        <div>
          <p>Nama: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profil</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nama:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" onClick={() => setIsEditing(false)} disabled={loading}>
            Batalkan
          </button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
