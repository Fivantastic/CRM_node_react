import { useEffect, useState } from 'react';
import { useUser } from '../../context/authContext.jsx';
import { SalesList } from '../../components/PagesComponents/Sales/SalesList.jsx';
import { CreateSale } from '../../components/PagesComponents/Sales/CreateSale.jsx';
import { UpdateSale } from '../../components/PagesComponents/Sales/UpdateSale.jsx';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal.jsx';
import { MainLayout } from '../../layout/MainLayout.jsx';

import '../../components/PopsStyle/ListStyleGeneric.css';

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
        console.error('Obetener fallido:', errorData);
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

  // Actualizo el estado con la venta añadida
  const addSale = async () => {
    try {
      await getSaleList();
    } catch (error) {
      console.error('Error al agregar la venta:', error);
    }
  };

  // Actualizo el estado con la venta eliminada
  const deleteSale = async (id_sale) => {
    try {
      setSalesList((prevSales) =>
        prevSales.filter((sale) => sale.id_sale !== id_sale)
      );

      await getSaleList();
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
    }
  };

  // Actualizo el estado con la venta eliminada
  const updateSale = async (id_sale) => {
    try {
      setSalesList((prevSales) =>
        prevSales.filter((sale) => sale.id_sale !== id_sale)
      );
      await getSaleList();
    } catch (error) {
      console.error('Error al actualizar la factura:', error);
    }
  };

  return (
    <MainLayout>
      <section className="sale_container mainContainer">
        <h1 className="sale_title mainTitle">Ventas</h1>
        <CreateSale onAddSale={addSale} token={token} />
        <ol className="sales_list main_olist">
          {salesList.map((data) => {
            return (
              <li
                key={data.id_sale}
                className="element_sale_container main_ilist"
              >
                <SalesList sale={data} />
                <UpdateSale
                  sale={data.id_sale}
                  onUpdateSale={updateSale}
                  token={token}
                />
                <DeleteGenericModal
                  id={data.id_sale}
                  onDelete={deleteSale}
                  token={token}
                  typeModule={typeModule}
                  typeModuleMessage={typeModuleMessage}
                />
              </li>
            );
          })}
        </ol>
      </section>
    </MainLayout>
  );
};
