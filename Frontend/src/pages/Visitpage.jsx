import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx';
import { CreateVisit } from '../components/Visits/CreateVisit.jsx';
import { UpdateVisit } from '../components/Visits/UpdateVisit.jsx';
import { VisitsList } from '../components/Visits/VisitList.jsx';
import { DeleteGenericModal } from '../components/forms/DeleteGenericModal.jsx';


export const Visitpage = () => {
  const token = useUser();
  const [visitList, setVisitList] = useState([]);

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'visits';
    
  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Visita';

  useEffect(() => {
    const getVisitList = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${typeModule}/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();

          // Actualizar el estado con los datos obtenidos
          setVisitList(responseData.data.userVisits);
        } else {
          const errorData = await response.json();
          console.error('Obetener fallido:', errorData);
          // Mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error('Error al obtener la lista de ventas:', error);
        // Mostrar un mensaje de error al usuario
      }
    };

    getVisitList();
  }, [token]);

  // Actualizo el estado con la venta añadida
  const addVisit = (id_visit) => {
    setVisitList((prevVisit) =>
      prevVisit.filter((sale) => sale.id_visit !== id_visit)
    );
  };

  // Actualizo el estado con la venta eliminada
  const deleteVisit = (id_visit) => {
    setVisitList((prevVisit) =>
      prevVisit.filter((visit) => visit.id_visit !== id_visit)
    );
  };

  // Actualizo el estado con la venta eliminada
  const updateVisit = (id_visit) => {
    setVisitList((prevVisit) =>
      prevVisit.filter((visit) => visit.id_visit !== id_visit)
    );
  };

  return (
    <section className="visit_container">
      <li>
        <Link to="/">Home</Link>
      </li>
      <h1 className="visit_title">Visitas</h1>
      <CreateVisit onAddVisit={addVisit} />
      <ol>
        {visitList.map((visit) => (
          <div key={visit.id_visit}>
            <VisitsList visit={visit} />
            <UpdateVisit visit={visit.id_visit} onUpdateVisit={updateVisit}  />
            <DeleteGenericModal id={visit.id_visit} onDelete={deleteVisit} token={token} typeModule={typeModule} typeModuleMessage={typeModuleMessage} />
          </div>
        ))}
      </ol>
    </section>
  );
};
