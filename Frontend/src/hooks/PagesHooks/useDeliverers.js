import { useEffect, useState } from 'react';

export const useDeliverers = (token) => {
  const [deliverers, setDeliverers] = useState([]);

  useEffect(() => {
    const fetchDeliverers = async () => {
      try {
        const response = await fetch('http://localhost:3000/deliveryNotes/deliverers', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Deliverers data:', responseData); // Añade este log
          setDeliverers(responseData.data);
        } else {
          console.error('Error fetching deliverers:', response.statusText);
          setDeliverers([]); // Asegura que se establece un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error fetching deliverers:', error);
        setDeliverers([]); // Asegura que se establece un array vacío en caso de error
      }
    };

    fetchDeliverers();
  }, [token]);

  return deliverers;
};
