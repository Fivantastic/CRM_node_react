import { useUser } from "../../../context/authContext.jsx";
import { DeleteGenericModal } from "../../forms/DeleteGenericModal.jsx";
import { UpdateCustomer } from "./UpdateCustomer.jsx";

import '../../../Styles/Pages/StyleCustomerList.css';
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";


export const CustomerList = ({ customer, updateCustomer, deleteCustomer }) => {

  const token = useUser();

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'customer';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Cliente';

  // Concatena el nombre y los apellidos del cliente
  const nameComplete = `${customer.name} ${customer.last_name}`;

  // Si active es 1 que ponga activo si es 0 que muestre inactivo
  const active = customer.active === 1 ? 'Activo' : 'Inactivo';

  // Construye el contenido del modal con la información del usuario
  const addressConcatenated = customer.address 
    ? `${customer.address} ${customer.number}, ${customer.city}` 
    : 'Dirección no disponible';

  // Lista de campos para crear la información del botón de más info
  const moreInfoFields = [
    { name: 'ref_CT', label: 'Ref', value: customer.ref_CT },
    { name: 'name', label: 'Nombre', value: nameComplete },
    { name: 'phone', label: 'Teléfono', value: customer.phone },
    { name: 'email', label: 'Email', value: customer.email },
    { name: 'company_name', label: 'Empresa', value: customer.company_name },
    { name: 'NIF', label: 'NIF', value: customer.NIF },
    { name: 'address', label: 'Dirección', value: addressConcatenated },
    { name: 'active', label: 'Estado', value: active },
  ];

  return (
    <>
      <h2 id="element_customer_title" className="mainInsideTitle">{customer.company_name}</h2>
      <p id="element_customer_subtitle" className="mainInsideSub">Ref: {customer.ref_CT}</p>

      <h3 id="element_customer_section" className="mainSubSection">Datos de contacto</h3>
      <p className="mainInsideSub"><strong>Nombre: </strong> {nameComplete}</p>
      <p className="mainInsideSub"><strong>Email: </strong> {customer.email}</p>
      <p className="mainInsideSub"><strong>Teléfono: </strong> {customer.phone}</p>
      <p className="mainInsideSub"><strong>Estado: </strong> {active}</p>

      <nav className="actions">
        <MoreInfo fields={moreInfoFields} />
        <UpdateCustomer
          customer={customer.id_customer}
          onUpdateCustomer={updateCustomer}
          token={token}
        />
        <DeleteGenericModal
          id={customer.id_customer}
          onDelete={deleteCustomer}
          token={token}
          typeModule={typeModule}
          typeModuleMessage={typeModuleMessage}
        />
      </nav>
    </>
  );
};
