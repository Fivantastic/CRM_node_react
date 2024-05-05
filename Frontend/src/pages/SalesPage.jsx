import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx';
import { SalesList } from '../components/Sales/SalesList.jsx';
import { CreateSale } from '../components/Sales/CreateSale.jsx';
import { UpdateSale } from '../components/Sales/UpdateSale.jsx';
import { DeleteSale } from '../components/Sales/DaleteSale.jsx';

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

  // Actualizo el estado con la venta añadida
  const addSale = () => {
    setSalesList((prevSales) => [...prevSales, salesList]);
  };

  // Actualizo el estado con la venta eliminada
  const deleteSale = (id_sale) => {
    setSalesList((prevSales) =>
      prevSales.filter((sale) => sale.id_sale !== id_sale)
    );
  };

  // Actualizo el estado con la venta eliminada
  const updateSale = (id_sale) => {
    setSalesList((prevSales) =>
      prevSales.filter((sale) => sale.id_sale !== id_sale)
    );
  };

  return (
    <section className="sale_container">
      <li>
        <Link to="/">Home</Link>
      </li>
      <h1 className="sale_title">Ventas</h1>
      <CreateSale onAddSale={addSale} />
      <ol>
        {salesList.map((data) => {
          console.log(data);
          return (
            <div key={data.id_sale}>
              <SalesList sale={data} />
              <UpdateSale sale={data.id_sale} onUpdateSale={updateSale} />
              <DeleteSale sale={data.id_sale} onDeleteSale={deleteSale} />
            </div>
          );
        })}
      </ol>
    </section>
  );
};
