export const ProductList = ({ product }) => {
    return (
      <>
        <h2 className="element_product_title mainInsideTitle">Producto</h2>
        <p><strong>Nombre:</strong>{product.name}</p>
        <p><strong>Descripción:</strong>{product.description}</p>
        <p><strong>Precio:</strong>{product.price}€</p>
        <p><strong>Stock:</strong>{product.stock}uni.</p>
        <p><strong>Estado:</strong>{product.product_status}</p>
      </>
    );
  };
  