import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { useEffect, useState } from 'react';
import { CreateCustomer } from '../../components/PagesComponents/Customer/CreateCustomer.jsx';
import { CustomerList } from '../../components/PagesComponents/Customer/CustomerList.jsx';
import { UpdateCustomer } from '../../components/PagesComponents/Customer/UpdateCustomer.jsx';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal.jsx';
const URL = import.meta.env.VITE_URL;

export const CustomerPage = () => {
  const token = useUser();
  const [listCustomer, setListCustomer] = useState([]);

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'customer';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Cliente';

  const getCustomerList = async () => {
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
        setListCustomer(responseData.data);
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
    getCustomerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Actualizo el estado con la venta añadida y solicito la lista actualizada al servidor
  const addCustomer = async () => {
    try {
      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await getCustomerList();
    } catch (error) {
      console.error('Error al agregar la venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  // Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor
  const deleteCustomer = async (id_customer) => {
    try {
      // Eliminar la venta del estado local
      setListCustomer((prevSales) =>
        prevSales.filter((customer) => customer.id_customer !== id_customer)
      );

      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await getCustomerList();
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  // Actualizo el estado con la venta actualizada y solicito la lista actualizada al servidor
  const updateCustomer = async (id_customer) => {
    try {
      // Eliminar la venta del estado local
      setListCustomer((prevSales) =>
        prevSales.filter((customer) => customer.id_customer !== id_customer)
      );

      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await getCustomerList();
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  return (
    <MainLayout>
      <section id="customer_container" className="mainContainer">
        <h1 id="customer_title" className=" mainTitle">
          Clientes
        </h1>
        <CreateCustomer onAddCustomer={addCustomer} token={token} />
        <ol id="customer_list" className=" main_olist">
          {listCustomer.map((data) => {
            return (
              <li
                key={data.id_customer}
                id="element_customer_container"
                className="element_customer_container main_ilist"
              >
                <CustomerList customer={data} />
                <span id="customer_actions" className="main_actions">
                  <UpdateCustomer
                    customer={data.id_customer}
                    onUpdateCustomer={updateCustomer}
                    token={token}
                  />
                  <DeleteGenericModal
                    id={data.id_customer}
                    onDelete={deleteCustomer}
                    token={token}
                    typeModule={typeModule}
                    typeModuleMessage={typeModuleMessage}
                  />
                </span>
              </li>
            );
          })}
        </ol>
      </section>
    </MainLayout>
  );
};
