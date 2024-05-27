import { useState, useEffect } from 'react';
const URL = import.meta.env.VITE_URL;

export const useOpenProducts = (token, reload) => {
  const [openProducts, setOpenProducts] = useState([]);

  useEffect(() => {
    const fetchOpenProduct = async () => {
      try {
        const response = await fetch(`${URL}/product/list`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOpenProducts(data.data);
        } else {
          console.error('Error al obtener las ventas abiertas');
          setOpenProducts([]); // Asegura que se establece un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setOpenProducts([]); // Asegura que se establece un array vacío en caso de error
      }
    };

    fetchOpenProduct();
  }, [token, reload]);

  return openProducts;
};