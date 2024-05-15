import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { useEffect, useState } from 'react';
import { SalesList } from '../../components/PagesComponents/Sales/SalesList.jsx';
import { CreateSale } from '../../components/PagesComponents/Sales/CreateSale.jsx';
import { UpdateSale } from '../../components/PagesComponents/Sales/UpdateSale.jsx';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { SalesListTable } from '../../components/PagesComponents/Sales/SalesListTable.jsx';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;

export const SalesPage = () => {
  const token = useUser();
  const [salesList, setSalesList] = useState([]);
  const [isListView, setIsListView] = useState(true);

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'sales';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Venta';

  const getSaleList = async () => {
    try {
      const response = await fetch(`${URL}/${typeModule}/list`, {
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
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de ventas',
    });
    }
  };
  useEffect(() => {
    getSaleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `${URL}/${typeModule}/search?searchTerm=${searchTerm}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log('Busqueda satisfactoria:', responseData);
        // Verificar si el término de búsqueda actual es igual al término de búsqueda anterior antes de actualizar userList
        if (searchTerm === searchTerm) {
          setSalesList(responseData.data);
        }
      } else {
        const errorData = await response.json();
        console.error('Búsqueda fallida:', errorData);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  // Actualizo el estado con la venta añadida
  const addSale = async () => {
    try {
      await getSaleList();
    } catch (error) {
      console.error('Error al agregar la venta:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al agregar la venta',
    });
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
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar la venta',
    });
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
      console.error('Error al actualizar la venta:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar la venta',
    });
    }
  };

  const filterOptions = [
    { label: ' Proceso ', value: 'open' },
    { label: 'Cancelado ', value: 'cancelled' },
    { label: 'Cerrado ', value: 'closed' },
  ];

  const sortOptions = [
    { label: 'Nombre (A - Z)', value: 'nombre-asc' },
    { label: 'Nombre (Z - A)', value: 'nombre-desc' },
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
  ];

  return (
    <MainLayout>
      <section id="sale_container " className="mainContainer">
        <h1 id="sale_title" className=" mainTitle">
          Ventas
        </h1>
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateSale onAddSale={addSale} token={token} />
          <FilterPages options={filterOptions} />
          <SortPages options={sortOptions} />
          <ToggleMode onClick={() => setIsListView((prev) => !prev)} />
        </nav>
        {isListView ? (
          <ol id="sales_list" className=" main_olist">
            {salesList.map((data) => {
              return (
                <li
                  key={data.id_sale}
                  id="element_sale_container"
                  className=" main_ilist"
                >
                  <SalesList sale={data} />
                  <span id="sales_actions" className="main_actions">
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
                  </span>
                </li>
              );
            })}
          </ol>
        ) : (
          <SalesListTable sale={salesList} />
        )}
      </section>
    </MainLayout>
  );
};
