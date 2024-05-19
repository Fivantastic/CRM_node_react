import { useState, useEffect } from 'react';

export const useOpenSales = (token) => {
  const [openSales, setOpenSales] = useState([]);

  useEffect(() => {
    const fetchOpenSales = async () => {
      try {
        const response = await fetch('http://localhost:3000/deliveryNotes/open-sales', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Open sales data:', data); // Añade este log
          setOpenSales(data.data);
        } else {
          console.error('Error al obtener las ventas abiertas');
          setOpenSales([]); // Asegura que se establece un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setOpenSales([]); // Asegura que se establece un array vacío en caso de error
      }
    };

    fetchOpenSales();
  }, [token]);

  return openSales;
};
