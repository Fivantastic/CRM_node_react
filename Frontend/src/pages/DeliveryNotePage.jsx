import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx';
import { DeleteGenericModal } from '../components/forms/DeleteGenericModal.jsx';
import { DeliveryNoteList } from '../components/DeliveryNotes/DeliveryNoteList.jsx';
import { CreateDeliveryNote } from '../components/DeliveryNotes/CreateDeliveryNote.jsx';
import UpdateDelivery from '../components/DeliveryNotes/UpdateDeliveryNote.jsx'; // Importamos el componente de actualización
import { MainLayout } from '../layout/MainLayout.jsx';

import "../components/PopsStyle/ListStyleGeneric.css"

export const DeliveryNotePage = () => {
  const token = useUser();
  const [deliveryNotesList, setDeliveryNotesList] = useState([]);
  const typeModule = 'deliveryNotes';
  const typeModuleMessage = 'DeliveryNote';

  
    const fetchDeliveryNotes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${typeModule}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Obtener notas de entrega satisfactorio:', responseData);
          setDeliveryNotesList(responseData.data);
        } else {
          const errorData = await response.json();
          console.error('Obtener notas de entrega fallido:', errorData);
        }
      } catch (error) {
        console.error('Error al obtener la lista de notas de entrega:', error);
      }
   
   };
    useEffect(() => {
    fetchDeliveryNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addDeliveryNote = (newDeliveryNote) => {
    setDeliveryNotesList([...deliveryNotesList, newDeliveryNote]);
  };

  //Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor
  const deleteDeliveryNote = async (id_note) => {
    try {
      // Eliminar la venta del estado local
      setDeliveryNotesList((prevVisit) =>
        prevVisit.filter((deliveryNote) => deliveryNote.id_note !== id_note)
      );

      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await fetchDeliveryNotes();
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      // Mostrar un mensaje de error al usuario
    }
  };


  return (
    <MainLayout>
    <div>
      <Link to="/">Home</Link>
      <h1>Notas de Entrega</h1>
      <CreateDeliveryNote onAddDeliveryNote={addDeliveryNote} token={token} />
      <ul className='generic_list'>
        {deliveryNotesList.map((data) => (
          <li key={data.id_note} className='element'>
            <DeliveryNoteList deliveryNote={data} />
            <UpdateDelivery deliveryNote={data.id_note} token={token} /> {/* Agregamos el componente de actualización */}
            <DeleteGenericModal
              id={data.id_note}
              onDelete={deleteDeliveryNote}
              token={token}
              typeModule={typeModule}
              typeModuleMessage={typeModuleMessage}
            />
          </li>
        ))}
      </ul>
    </div>
    </MainLayout>
  );
};

export default DeliveryNotePage;
