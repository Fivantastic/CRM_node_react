import { useState, useEffect } from 'react';
import '../../../Styles/Pages/StyleProductList.css';

export const ProductList = ({ product }) => {

  const traducirEstado = (estado) => {
    return estado ? 'Activo' : 'Inactivo';
  };

  // Estado para controlar si el usuario está activo o no
  const [isActive, setIsActive] = useState(product.active);
  
  useEffect(() => {
    setIsActive(product.active);
  }, [product.active]);

  const activeClass = isActive ? 'active' : 'inactive';

  return (
    <>
      <div id="element_customer_subtitle" className="mainInsideSub">
        <p className="refTitle">Ref: {product.ref_PR}</p>
      </div>
      <p className="mainInsideSub"><strong>Nombre:  </strong> {product.name}</p>
      <p className="mainInsideSub"><strong>Precio:  </strong> {product.price} €</p>
      <p className="mainInsideSub"><strong>Stock:  </strong> {product.stock} u.</p>
      <p className="mainInsideSub"><strong>Estado:  </strong><span className={activeClass}> {traducirEstado(isActive)}</span></p>
    </>
  );
};
