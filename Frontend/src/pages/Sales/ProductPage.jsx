import { useUser } from '../../context/authContext';
import { useState, useEffect } from 'react';
import { CreateProduct } from '../../components/PagesComponents/Products/CreateProduct';
import { UpdateProduct } from '../../components/PagesComponents/Products/UpdateProduct';
import { ProductList } from '../../components/PagesComponents/Products/ListProduct';
import { MainLayout } from '../../layout/MainLayout';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal';
const URL = import.meta.env.VITE_URL;

export const ProductPage = () => {
  const token = useUser();
  const [productList, setProductList] = useState([]);
  const typeModule = 'product';
  const typeModuleMessage = 'Producto';

  // Función para obtener la lista que tenemos en la base de datos
  const getProductList = async () => {
    try {
      // solicitar la lista actualizada al servidor utilizando la función reutilizada
      const response = await fetch(`${URL}/${typeModule}/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        // Obtener los datos de la respuesta
        const responseData = await response.json();
        //Actualizar el estado de los datos obtenidos
        setProductList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Obtener producto fallido', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de productos', error);
    }
  };

  useEffect(() => {
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addProduct = async () => {
    try {
      await getProductList();
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  const updateProduct = async (id_product) => {
    try {
      //Actualizar el estado del producto eliminado
      setProductList((prevProduct) =>
        prevProduct.filter((product) => product.id_product !== id_product)
      );

      await getProductList();
    } catch (error) {
      console.error('Error al actualizar el producto', error);
    }
  };

  const productDelete = async (id_product) => {
    try {
      // Eliminar el producto del estado local
      setProductList((prevProduct) =>
        prevProduct.filter((product) => product.id_product !== id_product)
      );

      await getProductList();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      // Mostrar un mensaje de error al usuario
    }
  };
  return (
    <MainLayout>
      <section id="product_container " className="mainContainer">
        <h1 id="product_title" className=" mainTitle">
          Products
        </h1>
        <CreateProduct onAddProduct={addProduct} token={token} />
        <ol id="product_list" className=" main_olist">
          {productList.map((data) => {
            return (
              <li
                key={data.id_product}
                id="element_product_container "
                className="main_ilist"
              >
                <ProductList product={data} />
                <span id="product_actions" className="main_actions">
                  <UpdateProduct
                    product={data.id_product}
                    onUpdateProduct={updateProduct}
                  />
                  <DeleteGenericModal
                    id={data.id_product}
                    onDelete={productDelete}
                    token={token}
                    typeModule={typeModule}
                    typeModuleMessage={typeModuleMessage}
                  />
                </span>
              </li>
            );
          })}
        </ol>
      </section>
    </MainLayout>
  );
};
