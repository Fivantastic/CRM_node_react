import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx';
import { DeleteGenericModal } from '../components/forms/DeleteGenericModal.jsx';
import { DeliveryNoteList } from '../components/DeliveryNotes/DeliveryNoteList.jsx';
import { CreateDeliveryNote } from '../components/DeliveryNotes/CreateDeliveryNote.jsx';

export const DeliveryNotePage = () => {
  const token = useUser();
  const [deliveryNotesList, setDeliveryNotesList] = useState([]);
  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'deliveryNotes';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'DeliveryNote';

  useEffect(() => {
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

    fetchDeliveryNotes();
  }, [token]);

  const addDeliveryNote = (newDeliveryNote) => {
    setDeliveryNotesList([...deliveryNotesList, newDeliveryNote]);
  };

  const deleteDeliveryNote = (id) => {
    setDeliveryNotesList(deliveryNotesList.filter(note => note.id !== id));
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Notas de Entrega</h1>
      <CreateDeliveryNote onAddDeliveryNote={addDeliveryNote} token={token} />
      <ul>
        {deliveryNotesList.map((data) => (
          <li key={data.id}>
            <DeliveryNoteList deliveryNote={data} />
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
  );
};

export default DeliveryNotePage;
