import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ services, onSuccess }) => {
  const [selectedService, setSelectedService] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/transaction', { serviceId: selectedService });
      setMessage('Pembayaran berhasil!');
      onSuccess(response.data);
    } catch (error) {
      setMessage('Terjadi kesalahan: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Pembayaran</h3>
      <div>
        <label>Layanan:</label>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          required
        >
          <option value="">Pilih layanan</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} - Rp{service.price}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading || !selectedService}>
        {loading ? 'Memproses...' : 'Bayar'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default PaymentForm;
