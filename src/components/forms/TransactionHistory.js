import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/history', { params: { offset, limit: 5 } });
      setTransactions((prev) => [...prev, ...response.data]);
      setOffset((prev) => prev + 5);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []); // Fetch initial data

  return (
    <div>
      <h3>Riwayat Transaksi</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.date} - {transaction.serviceName} - Rp{transaction.amount}
          </li>
        ))}
      </ul>
      <button onClick={fetchHistory} disabled={loading}>
        {loading ? 'Memuat...' : 'Tampilkan Lebih Banyak'}
      </button>
    </div>
  );
};

export default TransactionHistory;
