export const CustomerList = ({ customer }) => {
  return (
    <>
        <h1 className="element_customer_title">{customer.name}</h1>
        <p className="element_customer_subtitle">NIF: {customer.NIF} </p>
        
        <h3 className="element_customer_section">Empresa</h3>
        <p>{customer.company_name}</p>

        <h3 className="element_customer_section">Datos de contacto</h3>
        <p>Email: {customer.email}</p>
        <p>Telefono: {customer.phone}</p>
        <h3 className="element_customer_section">Dirección</h3>
        
        <p>Dirección: {customer.street}</p>
        <p>Numero: {customer.street_number}</p>
        <p>Letra / Numero: {customer.letter_number}</p>
        <p>Escalera: {customer.floor}</p>
        <p>Codigo Postal: {customer.zip_code}</p>
        <p>Ciudad: {customer.city}</p>
        <p>Pais: {customer.country}</p>
    </>
  );
};
