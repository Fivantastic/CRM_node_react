import { useState, useEffect } from 'react';
const URL = import.meta.env.VITE_URL;

export const useOpenInvoices = (token, reload) => {
  const [openInvoices, setOpenInvoice] = useState([]);

  useEffect(() => {
    const fetchOpenCustomers = async () => {
      try {
        const response = await fetch(`${URL}/payments/unasigned-invoices`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOpenInvoice(data.data);
        } else {
          console.error('Error al obtener las ventas abiertas');
          setOpenInvoice([]); // Asegura que se establece un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setOpenInvoice([]); // Asegura que se establece un array vacío en caso de error
      }
    };

    fetchOpenCustomers();
  }, [token, reload]);

  return openInvoices;
};