import { useState, useEffect } from 'react';
const URL = import.meta.env.VITE_URL;

export const useUnasignedSales = (token, reload) => {
  const [unasignedSales, setUnasignedSales] = useState([]);

  useEffect(() => {
    const fetchUnasignedSales = async () => {
      try { 
        const response = await fetch(`${URL}/invoice/unasigned-sales`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUnasignedSales(data.data);
        } else {
          console.error('Error al obtener las ventas sin asignar');
          setUnasignedSales([]); // Asegura que se establece un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setUnasignedSales([]); // Asegura que se establece un array vacío en caso de error
      }
    };

    fetchUnasignedSales();
  }, [token, reload]);

  return unasignedSales;
};