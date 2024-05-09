export const ProductList = ({ product }) => {
    return (
      <>
          <h2 className="element_product_title">ID del producto</h2>
          <p className="element_product_subtitle"> {product.id_product}</p>
          <h3 className="element_product_section">Nombre Producto</h3>
          <p>{product.name}</p>
          <h3 className="element_product_section">Description</h3>
          <p>{product.description}</p>
          <h3 className="element_product_section">Price</h3>
          <p>{product.price}</p>
          <h3 className="element_product_section">Stock del producto</h3>
          <p>{product.stock}</p>
          <h3 className="element_product_section">Product Status</h3>
          <p>{product.product_status}</p>
          <h3 className="element_product_section">Creado el día:</h3>

      </>
    );
  };
  