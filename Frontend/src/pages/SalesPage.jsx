import { useEffect, useState } from 'react';

import { useUser } from '../context/authContext.jsx';
import { SalesList } from '../components/Sales/SalesList.jsx';

export const SalesPage = () => {
  const token = useUser();
  const [salesList, setSalesList] = useState([]);

  useEffect(() => {
    const getSaleList = async () => {
      try {
        const response = await fetch('http://localhost:3000/sales', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Obtener satisfactorio:', responseData);

          // Actualizar el estado con los datos obtenidos
          const dataArray = Object.values(responseData);
          setSalesList(dataArray);
        } else {
          const errorData = await response.json();
          console.error('Obetener fallido:', errorData);
          // Mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error('Error al obtener la lista de ventas:', error);
        // Mostrar un mensaje de error al usuario
      }
    };

    getSaleList();
  }, [token]); // Dependencia para que se ejecute cuando el token cambie

  return (
    <>
      <h1>Ventas</h1>
      {salesList.map((data) => {
        return <SalesList key={data.id} data={data} />;
      })}
    </>
  );
};
