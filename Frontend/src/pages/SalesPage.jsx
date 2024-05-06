import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx';
import { SalesList } from '../components/Sales/SalesList.jsx';
import { CreateSale } from '../components/Sales/CreateSale.jsx';
import { UpdateSale } from '../components/Sales/UpdateSale.jsx';
import { DeleteGenericModal } from '../components/forms/DeleteGenericModal.jsx';

export const SalesPage = () => {
  const token = useUser();
  const [salesList, setSalesList] = useState([]);

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'sales';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Venta';

  const getSaleList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${typeModule}/list`, {
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
        console.error('Obtener fallido:', errorData);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error al obtener la lista de ventas:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  useEffect(() => {
    getSaleList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Actualizo el estado con la venta añadida y solicito la lista actualizada al servidor
  const addSale = async () => {
    try {
      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await getSaleList();
    } catch (error) {
      console.error('Error al agregar la venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  // Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor
  const deleteSale = async (id_sale) => {
    try {
      // Eliminar la venta del estado local
      setSalesList((prevSales) =>
        prevSales.filter((sale) => sale.id_sale !== id_sale)
      );

      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await getSaleList();
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  // Actualizo el estado con la venta actualizada y solicito la lista actualizada al servidor
  const updateSale = async (id_sale) => {
    try {
      // Eliminar la venta del estado local
      setSalesList((prevSales) =>
        prevSales.filter((sale) => sale.id_sale !== id_sale)
      );

      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await getSaleList();
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  return (
    <section className="sale_container">
      <li>
        <Link to="/">Home</Link>
      </li>
      <h1 className="sale_title">Ventas</h1>
      <CreateSale onAddSale={addSale} token={token} />
      <ol>
        {salesList.map((data) => {
          return (
            <div key={data.id_sale}>
              <SalesList sale={data}/>
              <UpdateSale sale={data.id_sale} onUpdateSale={updateSale} token={token} />
              <DeleteGenericModal id={data.id_sale} onDelete={deleteSale} token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} />
            </div>
          );
        })}
      </ol>
    </section>
  );
};
