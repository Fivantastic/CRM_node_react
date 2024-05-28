import { useState, useEffect } from 'react';
const URL = import.meta.env.VITE_URL;

export const useOpenSales = (token, reload) => {
  const [openSales, setOpenSales] = useState([]);

  useEffect(() => {
    const fetchOpenSales = async () => {
      try {
        const response = await fetch(`${URL}/deliveryNotes/open-sales`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
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
  }, [token, reload]);

  return openSales;
};