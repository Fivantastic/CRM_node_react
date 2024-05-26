import { useState, useEffect } from 'react';

export const useUnasignedSales = (token, reload) => {
  const [unasignedSales, setUnasignedSales] = useState([]);
  console.log('se lanza');

  useEffect(() => {
    const fetchUnasignedSales = async () => {
      try { 
        const response = await fetch('http://localhost:3000/invoices/unasigned-sales', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUnasignedSales(data.data);
          console.log('Debug useUnasignedSales: Resultado del fetch:', data.data);
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