export const ProductList = ({ product }) => {
  const traducirEstado = (estado) => {
    switch (estado) {
    case 'active':
      return 'Activo';
    case 'inactive':
      return 'Inactivo';
    default:
      return estado;
    }
  };
    return (
      <>
        <h2 id="element_product_title" className=" mainInsideTitle">Producto</h2>
        <h3>Nombre: {product.name}</h3>
        <p><strong>Descripción: </strong>{product.description}</p>
        <p><strong>Precio: </strong>{product.price} €</p>
        <p><strong>Stock: </strong>{product.stock} uni.</p>
        <p><strong>Estado: </strong>{traducirEstado(product.product_status)}</p>
      </>
    );
  };
  