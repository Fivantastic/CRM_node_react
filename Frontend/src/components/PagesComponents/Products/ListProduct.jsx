import '../../../Styles/Pages/StyleProductList.css';

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
        <div id="element_customer_subtitle" className="mainInsideSub">
        <p className="refTitle">Ref: {product.ref_PR}</p>
        </div>
        <p className='productName productP'><strong>Nombre:  </strong> {product.name}</p>
        <p className='productPrice productP'><strong>Precio:  </strong> {product.price} €</p>
        <p className='productStock productP'><strong>Stock:  </strong> {product.stock} u.</p>
        <p className='productStatus productP'><strong>Estado:  </strong> {traducirEstado(product.product_status)}</p>
      </>
    );
  };
  