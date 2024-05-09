// //! EJEMPLO DE PAGE, COPIAR Y CAMBIAR LOS DATOS PARA LA PAGINA QUE CREAS

// // TE VOY A LISTAR POR ORDEN LO QUE TIENES QUE PONER SOLO PRIMERO Y OMITES EL RESTO
        

// // Aqui los imports que necesites te los listo
// //? Importamos para los efectos de react y su renderizacion
// import { useEffect, useState } from 'react';
// //? LLamamos a nuestro context que es el TOKEN
// import { useUser } from '../context/authContext.jsx';
// //? Llamamos al componete de crear 
// import { CreateVisit } from '../components/PagesComponents/Visits/CreateVisit.jsx';
// //? Llamamos al componete de actualizar
// import { UpdateVisit } from '../components/PagesComponents/Visits/UpdateVisit.jsx';
// //? Llamamos al componete de la lista que es el que se ejecuta al cargar la pagina
// import { VisitsList } from '../components/PagesComponents/Visits/VisitList.jsx';
// //? Llamamos al componete de eliminar que es un componente CUSTOM
// import { DeleteGenericModal } from '../components/forms/DeleteGenericModal.jsx';
// //? Estilos
// import '../components/PopsStyle/listStyle.css'

// //? 1. LISTAR
// // Funcion que crea la pagina, aqui esta todo. Y directamente lo exportamos
// export const ProductPage = () => {
//     //? 1. LISTAR
//     // Aqui recibimos el token
//   const token = useUser();
//     //? 1. LISTAR
//     // Aqui creamos el estado para la lista  y lo inicializamos vacio
//   const [visitList, setVisitList] = useState([]);

//     //? 1. LISTAR
//     // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
//     //! Revisar ruta que sea igual.
//   const typeModule = 'product';
   
//     //? 1. LISTAR
//     // Tipo de modulo para el nombre de los mensajes al cliente (Producto, Visitas, Venta, etc..) La que hagas
//   const typeModuleMessage = 'Visita';


//     //? 1. LISTAR
//     // Funcion para obtener la lista que tenemos datos en la base de datos
//   const getVisitList = async () => {
//     try {
//       // Solicitar la lista actualizada al servidor utilizando la función reutilizada
//       const response = await fetch(`http://localhost:3000/${typeModule}/list`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `${token}`, // Agrega el token de autenticación a la peticion
//         },
//       });

//       if (response.ok) {
//         const responseData = await response.json(); // Obtener los datos de la respuesta

//         // Actualizar el estado con los datos obtenidos
//         setVisitList(responseData.data);  // Setear el estado con los datos obtenidos, los metemos en el estado de arriba para que pueda ser renderizado
//       } else {
//         const errorData = await response.json();
//         console.error('Obetener fallido:', errorData);
//         // Mostrar un mensaje de error al usuario
//       }
//     } catch (error) {
//       console.error('Error al obtener la lista de ventas:', error);
//       // Mostrar un mensaje de error al usuario
//     }
//   };

//     //? 1. LISTAR
//     //? useEffect que se ejecuta cuando cambia el token, que se cambia cada 14min
//   useEffect(() => {
//     getVisitList();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   //? 2. Crear
//   //! Funcion para agregar una nueva (venta, producto, etc..)
// const addVisit = async () => {
//   try {
//         // Solicitar la lista actualizada al servidor utilizando la función reutilizada, cuando ejecutamos esta funcion que es crear un nuevo (producto, venta, etc..)
//     await getVisitList();
//   } catch (error) {
//     console.error('Error al agregar la visita:', error);
//     // Mostrar un mensaje de error al usuario
//   }
// };

//  //? 3. Modificar
//     // Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor
//     //! Funcion para actualizar una (venta, cliente, etc..)
//     const updateVisit = async (id_visit) => {
//       try {
   
//         // Actualizar el estado con la venta eliminada
//         setVisitList((prevVisit) =>
//         prevVisit.filter((visit) => visit.id_visit !== id_visit)
//         );
  
//         // Actualizar el estado de la modificacion
//         // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
//         await getVisitList();
//       } catch (error) {
//         console.error('Error al actualizar la visita:', error);
//         // Mostrar un mensaje de error al usuario
//       }
//     };


//   //? 4. Eliminar
//   //! Funcion para eliminar una (venta, cliente, etc..)
//   // Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor
//   const deleteVisit = async (id_visit) => {
//     try {
//       // Eliminar la venta del estado local
//       setVisitList((prevVisit) =>
//         prevVisit.filter((visit) => visit.id_visit !== id_visit)
//       );

//       // Actualizar el estado con la venta eliminada
//       // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
//       await getVisitList();
//     } catch (error) {
//       console.error('Error al eliminar la venta:', error);
//       // Mostrar un mensaje de error al usuario
//     }
//   };

//     // Renderizado de la pagina
//     //! TIENES QUE PASARLE LAS PROPS QUE NECESITAS DENTRO DE CADA COMPONENTE
//   return (
//     <section className="visit_container">
//       <h1 className="visit_title">Visitas</h1>
//       {/* Creamos una nueva visita */}
//       <CreateVisit onAddVisit={addVisit} token={token} />
//       <ol className="visit_list">
//         {/* Listamos con el map todos los elementos que hemos recibido del fecth en responseData e imprime los elementos uno a uno con el siguiente bloque */}
//         {visitList.map((visit) => (
//           <div key={visit.id_visit}>
//             <VisitsList visit={visit} />  {/* Lista de un usuario */} 
//             <UpdateVisit visit={visit.id_visit} onUpdateVisit={updateVisit} /> {/* Boton de actualizar */}
//             <DeleteGenericModal id={visit.id_visit} onDelete={deleteVisit} token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} /> {/* Boton de eliminar */}
//           </div>
//         ))}
//       </ol>
//     </section>
//   );
// };

// //? 1. LISTAR

//         // return (
//         //     <section className="visit_container">
//         //     <li>
//         //         <Link to="/">Home</Link>
//         //     </li>
//         //     <h1 className="visit_title">Visitas</h1>
//         //     <ol className="visit_list">
//         //         {visitList.map((visit) => (
//         //         <div key={visit.id_visit}>
//         //             <VisitsList visit={visit} />  {/* Lista de un usuario */} 
//         //         </div>
//         //         ))}
//         //     </ol>
//         //     </section>
//         // );

// //? 2. LISTAR Y CREAR

//         // return (
//         //     <section className="visit_container">
//         //     <li>
//         //         <Link to="/">Home</Link>
//         //     </li>
//         //     <h1 className="visit_title">Visitas</h1>
//         //     {/* Creamos una nueva visita */}
//         //     <CreateVisit onAddVisit={addVisit} token={token} />
//         //     <ol className="visit_list">
//         //         {/* Listamos con el map todos los elementos que hemos recibido del fecth en responseData e imprime los elementos uno a uno con el siguiente bloque */}
//         //         {visitList.map((visit) => (
//         //         <div key={visit.id_visit}>
//         //             <VisitsList visit={visit} />  {/* Lista de un usuario */} 
//         //         </div>
//         //         ))}
//         //     </ol>
//         //     </section>
//         // );

// //? 3. LISTAR, CREAR Y MODIFICAR

//         // return (
//         //     <section className="visit_container">
//         //     <li>
//         //         <Link to="/">Home</Link>
//         //     </li>
//         //     <h1 className="visit_title">Visitas</h1>
//         //     {/* Creamos una nueva visita */}
//         //     <CreateVisit onAddVisit={addVisit} token={token} />
//         //     <ol className="visit_list">
//         //         {/* Listamos con el map todos los elementos que hemos recibido del fecth en responseData e imprime los elementos uno a uno con el siguiente bloque */}
//         //         {visitList.map((visit) => (
//         //         <div key={visit.id_visit}>
//         //             <VisitsList visit={visit} />  {/* Lista de un usuario */} 
//         //             <UpdateVisit visit={visit.id_visit} onUpdateVisit={updateVisit} /> {/* Boton de actualizar */}
//         //         </div>
//         //         ))}
//         //     </ol>
//         //     </section>
//         // );

// //? 4. LISTAR, CREAR, MODIFICAR Y ELIMINAR (CRUD)

//         // return (
//         //     <section className="visit_container">
//         //     <li>
//         //         <Link to="/">Home</Link>
//         //     </li>
//         //     <h1 className="visit_title">Visitas</h1>
//         //     {/* Creamos una nueva visita */}
//         //     <CreateVisit onAddVisit={addVisit} token={token} />
//         //     <ol className="visit_list">
//         //         {/* Listamos con el map todos los elementos que hemos recibido del fecth en responseData e imprime los elementos uno a uno con el siguiente bloque */}
//         //         {visitList.map((visit) => (
//         //         <div key={visit.id_visit}>
//         //             <VisitsList visit={visit} />  {/* Lista de un usuario */} 
//         //             <UpdateVisit visit={visit.id_visit} onUpdateVisit={updateVisit} /> {/* Boton de actualizar */}
//         //             <DeleteGenericModal id={visit.id_visit} onDelete={deleteVisit} token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} /> {/* Boton de eliminar */}
//         //         </div>
//         //         ))}
//         //     </ol>
//         //     </section>
//         // );