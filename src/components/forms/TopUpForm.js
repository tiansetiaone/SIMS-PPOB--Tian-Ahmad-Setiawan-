import React, { useState } from 'react';
import axios from 'axios';

const TopUpForm = ({ onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateAmount = (value) => {
    const amount = Number(value);
    if (amount < 10000 || amount > 1000000) {
      setError('Nominal harus antara 10.000 hingga 1.000.000');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    validateAmount(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAmount(amount)) return;

    setLoading(true);
    try {
      await axios.post('/topup', { amount });
      setAmount('');
      onSuccess('Top up berhasil!');
    } catch (error) {
      setError('Terjadi kesalahan: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Top Up</h3>
      <div>
        <label>Nominal:</label>
        <input
          type="number"
          value={amount}
          onChange={handleChange}
          required
          min="10000"
          max="1000000"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <button type="submit" disabled={loading || !!error}>
        {loading ? 'Memproses...' : 'Top Up'}
      </button>
    </form>
  );
};

export default TopUpForm;
