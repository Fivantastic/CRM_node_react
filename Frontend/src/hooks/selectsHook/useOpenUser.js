import { useState, useEffect } from 'react';
const URL = import.meta.env.VITE_URL;

export const useOpenUser = (token, reload) => {
  const [openUsers, setOpenUsers] = useState([]);

  useEffect(() => {
    const fetchOpenUsers = async () => {
      try {
        const response = await fetch(`${URL}/visits/salesAgents`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOpenUsers(data.data);
        } else {
          console.error('Error al obtener los usuarios');
          setOpenUsers([]); // Asegura que se establece un array vacío en caso de error
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setOpenUsers([]); // Asegura que se establece un array vacío en caso de error
      }
    };

    fetchOpenUsers();
  }, [token, reload]);

  return openUsers;
};