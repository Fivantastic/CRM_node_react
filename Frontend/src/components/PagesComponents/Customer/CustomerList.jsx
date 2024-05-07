export const CustomerList = ({ customer }) => {
  return (
    <>
      <li>
        <h2>Cliente</h2>
        {/* <p>{customer.id_customer}</p> */}
        <p>Nombre: {customer.name}</p>
        <p>Email: {customer.email}</p>
        <p>Telefono: {customer.phone}</p>
        <p>Empresa: {customer.company_name}</p>
        <p>NIF: {customer.NIF} </p>
        <p>Dirección: {customer.street}</p>
        <p>Numero: {customer.street_number}</p>
        <p>Letra / Numero: {customer.letter_number}</p>
        <p>Escalera: {customer.floor}</p>
        <p>Codigo Postal: {customer.zip_code}</p>
        <p>Ciudad: {customer.city}</p>
        <p>Pais: {customer.country}</p>
      </li>
    </>
  );
};
