import { useState, useEffect } from 'react';
const URL = import.meta.env.VITE_URL;

export const usePendingDeliveryNotes = (token, reload) => {
  const [pendingDeliveryNotes, setPendingDeliveryNotes] = useState([]);

  useEffect(() => {
    const fetchPendingDeliveryNotes = async () => {
      try {
        const response = await fetch(`${URL}/shipment/pending-delivery-notes`, {
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
          setPendingDeliveryNotes([]);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setPendingDeliveryNotes([]);
      }
    };

    fetchPendingDeliveryNotes();
  }, [token, reload]);

  return pendingDeliveryNotes;
};

