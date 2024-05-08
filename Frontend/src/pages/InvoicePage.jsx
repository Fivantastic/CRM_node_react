import { Link } from 'react-router-dom';
import { CreateInvoice } from '../components/PagesComponents/Invoces/CreateInvoice.jsx';
import { InvoicesList } from '../components/PagesComponents/Invoces/InvoicesList.jsx';
import { ClosedInvoice } from '../components/PagesComponents/Invoces/ClosedInvoice.jsx';
import { DeleteGenericModal } from '../components/forms/DeleteGenericModal.jsx';
import { useEffect, useState } from 'react';
import { useUser } from '../context/authContext.jsx';
import { MainLayout } from '../layout/MainLayout.jsx';

export const InvoicePage = () => {
  const token = useUser();
  const [invoiceList, setInvoiceList] = useState([]);

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'invoice';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Factura';

  const getSaleList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${typeModule}`, {
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
        setInvoiceList(responseData.data);
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
  const addInvoice = async () => {
    try {
      await getSaleList();
    } catch (error) {
      console.error('Error al agregar la factura:', error);
    }
  };

  // Actualizo el estado con la venta eliminada
  const deleteInvoice = async (id_invoice) => {
    try {
      setInvoiceList((prevSales) =>
        prevSales.filter((invoice) => invoice.id_invoice !== id_invoice)
      );

      await getSaleList();
    } catch (error) {
      console.error('Error al eliminar la factura:', error);
    }
  };

  // Actualizo el estado con la venta eliminada
  const updateInvoice = async (id_invoice) => {
    try {
      setInvoiceList((prevSales) =>
        prevSales.filter((invoice) => invoice.id_invoice !== id_invoice)
      );

      await getSaleList();
    } catch (error) {
      console.error('Error al actualizar la factura:', error);
    }
  };

  return (
    <MainLayout>
    <section className="invoice_container">
      <li>
        <Link to="/">Home</Link>
      </li>
      <h1 className="invoice_title">Facturas</h1>
      <CreateInvoice onAddInvoice={addInvoice} token={token} />
      <ol>
        {invoiceList.map((data) => {
          return (
            <div key={data.id_invoice}>
              <InvoicesList invoice={data} />
              <ClosedInvoice
                invoice={data.id_invoice}
                onUpdateInvoice={updateInvoice}
                token={token}
              />
              <DeleteGenericModal
                id={data.id_invoice}
                onDelete={deleteInvoice}
                token={token}
                typeModule={typeModule}
                typeModuleMessage={typeModuleMessage}
              />
            </div>
          );
        })}
      </ol>
    </section>
    </MainLayout>
  );
};
