import { useUser } from "../context/authContext";
import { useState, useEffect } from "react";
import { CreateProduct } from "../components/PagesComponents/Products/CreateProduct";
import { UpdateProduct } from "../components/PagesComponents/Products/UpdateProduct";
import { ProductList } from "../components/PagesComponents/Products/ListProduct";
import { MainLayout } from "../layout/MainLayout";
import { DeleteGenericModal } from "../components/forms/DeleteGenericModal";


// 1. Listar
export const ProductPage = () => {
    const token = useUser();
    const [productList, setProductList] = useState([]);
    const typeModule = 'product';
    const typeModuleMessage = 'Producto';

    // Función para obtener la lista que tenemos en la base de datos
    const getProductList = async () => {
        try {
            // solicitar la lista actualizada al servidor utilizando la función reutilizada
            const response = await fetch(`http://localhost:3000/${typeModule}/list`, {
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
    }


useEffect(() => {
    getProductList();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [token]);

// 2. Crear 
// Funcion para agregar un nuevo producto

const addProduct = async () => {
    try{
    // Solicitar la lista actualizada al servidor utilizando la función reutilizada, cuando ejecutamos esta funcion que es crear un nuevo (producto, venta, etc..)
        await getProductList();
    } catch (error) {
        console.error('Error al agregar el producto:', error);
            // Mostrar un mensaje de error al usuario
    }
};   

//? 3. Modificar
    // Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor
    //! Funcion para actualizar una (venta, cliente, etc..)

    const updateProduct = async (id_product) => {
        try {
            //Actualizar el estado del producto eliminado
            setProductList((prevProduct) => 
                prevProduct.filter((product) => product.id_product !== id_product)
            );

            //Actualizar el estado de la modificación
            //Solicitar la lista actualizada de productos al servidor utilizando la función reutilizada
            await getProductList();
        } catch (error) {
            console.error('Error al actualizar el producto', error);
        }
    };

    // 4. Eliminar
    //! Funcion para eliminar un producto
      // Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor

      const productDelete = async (id_product) => {
        try {
            // Eliminar el producto del estado local
            setProductList((prevProduct) =>
                prevProduct.filter((product) => product.id_product !== id_product)
            );
            
            // Actualizar el estado con el producto eliminado
            // Solicitar la lista actualizada de productos al servidor utilizando la función reutilizada
            await getProductList();
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            // Mostrar un mensaje de error al usuario
        }
    }

    
        // Return dentro de la función del componente
        return (
            <MainLayout>
                <section className="product_container">
                    <h1 className="product_title">Products</h1>
                    <CreateProduct onAddProduct={addProduct} token={token} />
                    <ol className="product_list generic_list">
                        {productList.map((data)=> { 
                            return ( 
                            <li key={data.id_product} className="element_product_container">
                                <ProductList product={data} />
                                <UpdateProduct product={data.id_product} onUpdateProduct={updateProduct} />
                                <DeleteGenericModal id={data.id_product} onDelete={productDelete} token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} />
                            </li>
                            );
                            })
                        }
                    </ol>
                </section>
            </MainLayout>
        );
    };
