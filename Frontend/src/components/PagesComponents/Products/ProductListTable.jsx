import { useUser } from '../../../context/authContext.jsx';
import { DeleteGenericModal } from "../../forms/DeleteGenericModal.jsx";
import { UpdateProduct } from "./UpdateProduct.jsx";
import { MoreProduct } from "./MoreProduct.jsx";
import { StatusProductController } from './StatusProductController.jsx';
import './productListTable.css';

export const ProductListTable = ({ product, onUpdateProduct, onDelete, isActive, typeModule, typeModuleMessage }) => {
  const token = useUser();
  return (
    <section id="product_table">
      <div id="productTableHead">
        <div id="productTableHeadRowRef">Ref</div>
        <div id="productTableHeadRowName">Producto</div>
        <div id="productTableHeadRowPrice">Precio</div>
        <div id="productTableHeadRowStock">Stock</div>
        <div id="productTableHeadRowStatus">Estado</div>
        <div id="productTableHeadRowActions">Acciones</div>
      </div>
      <div id="productTableBody">
        {product.length > 0 ? (
          product.map((product) => (
            <div key={product.id_product} className="productTableBodyRow">
              <div className="productTableBodyRef">{product.ref_PR}</div>
              <div className="productTableBodyName">{product.name}</div>
              <div className="productTableBodyPrice">{product.price} €</div>
              <div className="productTableBodyStock">{product.stock} u.</div>
              <div
                className={`productTableBodyStatus ${product.active ? 'active' : 'inactive'}`}
              >
                {product.active ? 'Activo' : 'Inactivo'}
              </div>
              <div className="productTableBodyActions">
                <MoreProduct product={product} />
                <StatusProductController
                  id={product.id_product}
                  isActive={product.active}
                  activeProduct={isActive}
                  token={token}
                  typeModule={typeModule}
                  typeModuleMessage={typeModuleMessage}
                />
                <UpdateProduct
                  id={product.id_product}
                  onUpdateProduct={onUpdateProduct}
                  productData={product}
                />
                <DeleteGenericModal
                  id={product.id_product}
                  onDelete={onDelete}
                  token={token}
                  typeModule="product"
                  typeModuleMessage="Productos"
                />
              </div>
            </div>
          ))
        ) : (
          <div className='noResult'>No hay productos disponibles</div>
        )}
      </div>
    </section>
  );
};
