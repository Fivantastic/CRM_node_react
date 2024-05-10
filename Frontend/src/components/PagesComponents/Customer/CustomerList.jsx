export const CustomerList = ({ customer }) => {
  return (
    <>
        <h2 className="element_customer_title mainInsideTitle">{customer.name}</h2>
        <p className="element_customer_subtitle mainInsideSub">NIF: {customer.NIF} </p>
        
        <h3 className="element_customer_section mainSubSection">Empresa</h3>
        <p>{customer.company_name}</p>

        <h3 className="element_customer_section mainSubSection">Datos de contacto</h3>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Telefono:</strong> {customer.phone}</p>
        
        <p><strong>Dirección:</strong> {customer.street}</p>
        <p><strong>Numero:</strong> {customer.street_number}</p>
        {/* <p><strong>Letra / Numero:</strong> {customer.letter_number}</p>
        <p><strong>Escalera:</strong> {customer.floor}</p> */}
        <p><strong>Codigo Postal:</strong> {customer.zip_code}</p>
        <p><strong>Ciudad:</strong> {customer.city}</p>
        <p><strong>Pais:</strong> {customer.country}</p>
    </>
  );
};