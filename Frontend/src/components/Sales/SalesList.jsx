export const SalesList = ({ data }) => {
    return (
       <section>
         <ul>
           <li>
             <p>ID</p>
             <p>{data.id_sale}</p>
           </li>
           <li>
             <p>Nombre Del Usuario</p>
             <p>{data.user_id}</p>
           </li>
           <li>
             <p>Producto En Venta</p>
             <p>{data.saleProduct_id}</p>
           </li>
           <li>
             <p>Cliente</p>
             <p>{data.customer_id}</p>
           </li>
           <li>
             <p>Estado De la Venta</p>
             <p>{data.operation_status}</p>
           </li>
           <li>
             <p>Fecha De Creación</p>
             <p>{data.create_at}</p>
           </li>
         </ul>
       </section>
    );
   };