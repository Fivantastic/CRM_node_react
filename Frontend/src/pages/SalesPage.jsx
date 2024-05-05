import { useEffect, useState } from 'react';

import { useUser } from '../context/authContext.jsx';
import { SalesList } from '../components/Sales/SalesList.jsx';
import { CreateSale } from '../components/Sales/CreateSale.jsx';
import { UpdateSale } from '../components/Sales/UpdateSale.jsx';
import { DaleteSale } from '../components/Sales/DaleteSale.jsx';

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
          setSalesList(responseData.data);
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
  }, [token]);

  return (
    <section className="sale_container">
      <h1 className="sale_title">Ventas</h1>
      <CreateSale />
      <ol>
        {salesList.map((data) => {
          return (
            <>
              <SalesList key={data.id} sale={data} /> <UpdateSale />
              <DaleteSale />
            </>
          );
        })}
      </ol>
    </section>
  );
};
