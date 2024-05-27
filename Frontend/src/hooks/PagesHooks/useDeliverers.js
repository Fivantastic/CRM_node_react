import { useEffect, useState } from 'react';
const URL = import.meta.env.VITE_URL;

export const useDeliverers = (token) => {
  const [deliverers, setDeliverers] = useState([]);

  useEffect(() => {
    const fetchDeliverers = async () => {
      try {
        const response = await fetch(`${URL}/deliveryNotes/deliverers`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
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
