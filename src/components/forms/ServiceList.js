import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/services');
        setServices(response.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p>Memuat daftar layanan...</p>;
  }

  return (
    <div>
      <h3>Daftar Layanan</h3>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name} - Rp{service.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
