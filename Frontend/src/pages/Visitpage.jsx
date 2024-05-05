import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/authContext.jsx';
import { CreateVisit } from '../components/Visits/CreateVisit.jsx';
import { UpdateVisit } from '../components/Visits/UpdateVisit.jsx';
import { DeleteVisit } from '../components/Visits/DeleteVisit.jsx';
import { VisitsList } from '../components/Visits/VisitList.jsx';


export const Visitpage = () => {
  const token = useUser();
  const [visitList, setVisitList] = useState([]);

  useEffect(() => {
    const getVisitList = async () => {
      try {
        const response = await fetch('http://localhost:3000/visits/list', {
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
            <UpdateVisit visit={visit.id_visit} onUpdateVisit={updateVisit} />
            <DeleteVisit visit={visit.id_visit} onDeleteVisit={deleteVisit} />
          </div>
        ))}
      </ol>
    </section>
  );
};
