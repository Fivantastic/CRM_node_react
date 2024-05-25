import { useState, useEffect } from 'react';

export const useOpenCustomers = (token, reload) => {
  const [openCustomers, setOpenCustomers] = useState([]);

  useEffect(() => {
    const fetchOpenCustomers = async () => {
      try {
        const response = await fetch('http://localhost:3000/customer/list', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOpenCustomers(data.data);
        } else {
          console.error('Error al obtener las ventas abiertas');
          setOpenCustomers([]); // Asegura que se establece un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setOpenCustomers([]); // Asegura que se establece un array vacío en caso de error
      }
    };

    fetchOpenCustomers();
  }, [token, reload]);

  return openCustomers;
};