// import { useEffect } from "react";

import { MainLayout } from "../layout/MainLayout.jsx";


// // 1. Listar
// export const ProductPage = () => {
//     const token = useUser();
//     const [productList, setProductList] = useState([]);
//     const typeModule = 'product';
//     const typeModuleMessage = 'Producto';

//     // Función para obtener la lista que tenemos en la base de datos
//     const getProductList = async () => {
//         try {
//             // solicitar la lista actualizada al servidor utilizando la función reutilizada
//             const response = await fetch(`http://localhost:3000/${typeModule}/Product`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `${token}`,
//                 },
//             });

//             if (response.ok) {
//                 // Obtener los datos de la respuesta
//                 const responseData = await response.json();
//                 //Actualizar el estado de los datos obtenidos
//                 setProductList(responseData);
//             } else {
//                 const errorData = await response.json();
//                 console.error('Obtener producto fallido', errorData);
//             }
//         } catch (error) {
//         console.error('Error al obtener la lista de productos', error);

//         }
//     }
// };

// useEffect(() => {
//     getProductList();
// }, [token]);

// // 2. Crear 
// // Funcion para agregar un nuevo producto

// const addProduct = async () => {
//     try{
//     // Solicitar la lista actualizada al servidor utilizando la función reutilizada, cuando ejecutamos esta funcion que es crear un nuevo (producto, venta, etc..)
//         await getProductList();
//     } 
//     catch (error) {
//         console.error('Error al agregar el producto:', error);
//             // Mostrar un mensaje de error al usuario
//     }
// };   

// //? 3. Modificar
//     // Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor
//     //! Funcion para actualizar una (venta, cliente, etc..)

//     const updateProduct = async (id_product) => {
//         try {
//             //Actualizar el estado del producto eliminado
//             setProductList((prevProduct) => 
//                 prevProduct.filter((visit) => product.id_product !== id_product)
//             );

//             //Actualizar el estado de la modificación
//             //Solicitar la lista actualizada de productos al servidor utilizando la función reutilizada
//             await getProductList();
//         } catch (error) {
//             console.error('Error al actualizar el producto', error);
//         }
//     };

//     // 

export const ProductPage = () => {
    return (
        <MainLayout>
            <div>
                <h1>ProductPage</h1>
            </div>
        </MainLayout>
    )
}
