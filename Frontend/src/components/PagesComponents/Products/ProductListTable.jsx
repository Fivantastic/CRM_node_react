import { getNormalizedDate } from "../../../Services/getNormalizedDate.js";
import { useUser } from '../../../context/authContext.jsx';
import { DeleteGenericModal } from "../../forms/DeleteGenericModal.jsx";
import { UpdateProduct } from "./UpdateProduct.jsx";
import '../Products/productListTable.css';

 
export const ProductListTable = ({ product, onUpdateProduct, onDelete }) => {
    const token = useUser();
    const productData = product;
    
    const fechaNormal = getNormalizedDate(product.creation_at);

    const moreInfoFields = [
     { 
       name: 'ref_PR', 
       label: 'Ref', 
       value: product.ref_PR, 
     },
     
    //  { 
    //     name: 'Nombre', 
    //     label: 'Nombre', 
    //     value: product.name, 
    //  },

    //  { 
    //     name: 'Descripción', 
    //     label: 'Descripción',
    //     value: product.description,
    //  },
    
    //  {
    //     name: 'Precio',
    //     label: 'Precio',
    //     value: product.price,
    //  },

    //  {
    //     name:  'Stock',
    //     label: 'Stock',
    //     value: product.stock,
    //  },

    //  {
    //     name: 'Estado',
    //     label: 'Estado',
    //     value: product.product_status,
    //  },

    //  {
    //     name: 'Fecha de creación',
    //     label: 'Fecha de creación',
    //     value: fechaNormal.toLocaleDateString(),
    //  },
     ];

    return (
        <section id="product_table">
            <div id="productTableHead">
                <div id="productTableHeadRowRef">Ref</div>
                <div id="productTableHeadRowName">Nombre</div>
                {/* <div id="productTableHeadRowDescription">Descripción</div> */}
                <div id="productTableHeadRowPrice">Precio</div>
                <div id="productTableHeadRowStock">Stock</div>
                <div id="productTableHeadRowStatus">Estado</div>
                <div id="productTableHeadRowDate">Fecha de creación</div>
                <div id="productTableHeadRowActions">Acciones</div>
            </div>
            <div id="productTableBody">
                {productData.length > 0 && productData.map((product) => (
                    <div key={product.id_product} id="productTableBodyRow">
                        <div id="productTableBodyRef">{product.ref_PR}</div>
                        <div id="productTableBodyName">{product.name}</div>
                        {/* <div id="productTableBodyDescription">{product.description}</div> */}
                        <div id="productTableBodyPrice">{product.price}</div>
                        <div id="productTableBodyStock">{product.stock}</div>
                        <div id="productTableBodyStatus">{product.product_status}</div>
                        <div id="productTableBodyDate">{fechaNormal.toLocaleDateString()}</div>
                        <div id="productTableBodyActions">
                            <UpdateProduct
                                product={product}
                                onUpdateProduct={onUpdateProduct}
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
                ))}
            </div>
        </section>
    );
};