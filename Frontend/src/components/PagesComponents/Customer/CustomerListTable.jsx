import { useUser } from "../../../context/authContext.jsx";
import { DeleteGenericModal } from "../../forms/DeleteGenericModal.jsx";
import { MoreCustomer } from "./MoreCustomer.jsx";
import { UpdateCustomer } from "./UpdateCustomer.jsx";
import './CustomerListTable.css';

export const CustomerListTable = ({ customer, updateCustomer, deleteCustomer }) => {
  const token = useUser();

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'customer';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Cliente';

  return (
    <section id="customer_table" className="customerTable">
      <div className="customerTableHead">
        <div className="customerTableHeadRowReference headRow">Referencia</div>
        <div className="customerTableHeadRowCompany headRow">Empresa</div>
        <div className="customerTableHeadRowStatus headRow">Estado</div>
        <div className="customerTableHeadRowActions headRow">Acciones</div>
      </div>
      <div className="customerTableBody">
        {customer && customer.length > 0 ? (
          customer.map((customerItem) => (
            <div key={customerItem.id_customer} className="customerTableBodyRow">
              <div className="customerTableBodyRowReference">{customerItem.ref_CT}</div>
              <div className="customerTableBodyRowCompany">{customerItem.company_name}</div>
              <div className={`customerTableBodyRowStatus ${customerItem.active ? 'active' : 'inactive'}`}>{customerItem.active ? 'Activo' : 'Inactivo'}</div>
              <div className="customerTableBodyRowActions">
                <MoreCustomer customer={customerItem} />
                <UpdateCustomer customer={customerItem} updateCustomer={updateCustomer} token={token} />
                <DeleteGenericModal id={customerItem.id_customer} onDelete={deleteCustomer} token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} />
              </div>
            </div>
          ))
        ) : (
          <div>No hay clientes disponibles</div>
        )}
      </div>
    </section>
  );
};
