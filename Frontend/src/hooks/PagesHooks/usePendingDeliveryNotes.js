import { useState, useEffect } from 'react';

const usePendingDeliveryNotes = (token) => {
  const [pendingDeliveryNotes, setPendingDeliveryNotes] = useState([]);

  useEffect(() => {
    const fetchPendingDeliveryNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/shipments/pending-delivery-notes', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPendingDeliveryNotes(data.data);
        } else {
          console.error('Error al obtener las notas de entrega pendientes');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchPendingDeliveryNotes();
  }, [token]);

  return pendingDeliveryNotes;
};

export default usePendingDeliveryNotes;
