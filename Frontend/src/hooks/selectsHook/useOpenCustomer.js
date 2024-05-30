import { useState, useEffect } from 'react';
const URL = import.meta.env.VITE_URL;

export const useOpenCustomers = (token, reload) => {
  const [openCustomers, setOpenCustomers] = useState([]);

  useEffect(() => {
    const fetchOpenCustomers = async () => {
      try {
        const response = await fetch(`${URL}/customer/list`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOpenCustomers(data.data);
        } else {
          console.error('Error al obtener los clientes');
          setOpenCustomers([]); 
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setOpenCustomers([]);
      }
    };

    fetchOpenCustomers();
  }, [token, reload]);

  return openCustomers;
};