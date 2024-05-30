import { useUser } from "../../../context/authContext.jsx";
import { DeleteGenericModal } from "../../forms/DeleteGenericModal.jsx";
import { UpdateCustomer } from "./UpdateCustomer.jsx";
import { MoreInfo } from "../../InfoModal/MoreInfo.jsx";
import { StatusCustomerController } from "./StatusCustomerController.jsx";
import '../../../Styles/Pages/StyleCustomerList.css';

export const CustomerList = ({ customer, updateCustomer, deleteCustomer, typeModule, typeModuleMessage, activeCustomer }) => {
  const token = useUser();

  const nameComplete = `${customer.name} ${customer.last_name}`;
  const active = customer.active  ? 'Activo' : 'Inactivo';
  const activeColor = customer.active  ? 'green' : 'red';
  const activeClass = customer.active ? 'active' : 'inactive';
  const addressConcatenated = customer.address 
    ? `${customer.address} ${customer.number}, ${customer.city}, ${customer.country}` 
    : 'Dirección no disponible';

  const moreInfoFields = [
    { label: 'Ref', value: customer.ref_CT, id: 'element_customer_ref' },
    { label: 'Nombre', value: nameComplete, id: 'element_customer_name' },
    { label: 'Teléfono', value: customer.phone, id: 'element_customer_phone' },
    { label: 'Email', value: customer.email, id: 'element_customer_email' },
    { label: 'Empresa', value: customer.company_name, id: 'element_customer_company' },
    { label: 'NIF', value: customer.NIF, id: 'element_customer_NIF' },
    { label: 'Dirección', value: addressConcatenated, id: 'element_customer_address' },
    { label: 'Estado', value: active, id: 'element_customer_active', color: activeColor },
  ];

  const modalIds = {
    idModalContainer: 'customerModalContainer',
    idModalHeader: 'customerModalHeader',
    idModalTitle: 'customerModalTitle',
    idModalBody: 'customerModalBody',
    idModalFooter: 'customerModalFooter',
    idModalBtnClose: 'customerModalBtnClose',
    classState: 'font-bold',
  };

  return (
    <>
      <div id="element_customer_subtitle" className="mainInsideSub">
        <p className="refTitle">Ref: {customer.ref_CT}</p>
      </div>
      <p className="mainInsideSub"><strong>Empresa: </strong>{customer.company_name}</p>

      <p className="mainInsideSub"><strong>Contacto: </strong> {nameComplete}</p>

      <p className="mainInsideSub"><strong>Email: </strong> {customer.email}</p>
      <p className="mainInsideSub"><strong>Teléfono: </strong> {customer.phone}</p>
      <p className="mainInsideSub"><strong>Estado: </strong> <span className={activeClass}>{customer.active ? 'Activo' : 'Inactivo'}</span></p>

      <span className="main_actions">
        <MoreInfo fields={moreInfoFields} modalIds={modalIds} />
        <StatusCustomerController
          id={customer.id_customer}
          isActive={customer.active}
          activeCustomer={activeCustomer}
          token={token}
          typeModule={typeModule}
          typeModuleMessage={typeModuleMessage}
        />
        <UpdateCustomer
          customerData={customer}
          onUpdateCustomer={updateCustomer}
          token={token}
          typeModuleMessage={typeModuleMessage}
        />
        <DeleteGenericModal
          id={customer.id_customer}
          onDelete={deleteCustomer}
          token={token}
          typeModule={typeModule}
          typeModuleMessage={typeModuleMessage}
        />
      </span>
    </>
  );
};
