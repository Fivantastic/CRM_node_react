import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { useEffect, useState } from 'react';
import { CreateVisit } from '../../components/PagesComponents/Visits/CreateVisit.jsx';
import { VisitsList } from '../../components/PagesComponents/Visits/VisitList.jsx';
import { UpdateVisit } from '../../components/PagesComponents/Visits/UpdateVisit.jsx';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal.jsx';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;

export const Visitpage = () => {
  const token = useUser();
  const [visitList, setVisitList] = useState([]);

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'visits';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Visita';

  const getVisitList = async () => {
    try {
      const response = await fetch(`${URL}/${typeModule}/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        // Actualizar el estado con los datos obtenidos
        setVisitList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Obetener fallido:', errorData);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error al obtener la lista de visitas:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de visitas',
    });
    }
  };

  useEffect(() => {
    getVisitList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Actualizo el estado con la venta añadida
  const addVisit = async () => {
    try {
      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await getVisitList();
    } catch (error) {
      console.error('Error al agregar la visita:', error);
      // Mostrar un mensaje de error al usuario
      Toast.fire({
        icon: 'error',
        title: 'Error al agregar la visita',
    });
    }
  };

  // Actualizo el estado con la venta eliminada y solicito la lista actualizada al servidor
  const deleteVisit = async (id_visit) => {
    try {
      // Eliminar la venta del estado local
      setVisitList((prevVisit) =>
        prevVisit.filter((visit) => visit.id_visit !== id_visit)
      );

      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await getVisitList();
    } catch (error) {
      console.error('Error al eliminar la visita:', error);
      // Mostrar un mensaje de error al usuario
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar la visita',
    });
    }
  };

  const updateVisit = async (id_visit) => {
    try {
      // Eliminar la venta del estado local
      setVisitList((prevVisit) =>
        prevVisit.filter((visit) => visit.id_visit !== id_visit)
      );

      // Solicitar la lista actualizada de ventas al servidor utilizando la función reutilizada
      await getVisitList();
    } catch (error) {
      console.error('Error al actualizar la visita:', error);
      // Mostrar un mensaje de error al usuario
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar la visita',
    });
    }
  };

  return (
    <MainLayout>
      <section id="visit_container" className=" mainContainer">
        <h1 id="visit_title" className=" mainTitle">
          Visitas
        </h1>
        <CreateVisit onAddVisit={addVisit} token={token} />
        <ol id="visit_list" className="main_olist">
          {visitList.map((visit) => (
            <li
              key={visit.id_visit}
              id="element_visit_container"
              className=" main_ilist"
            >
              <VisitsList visit={visit} />
              <span id="visit_actions" className="main_actions">
                <UpdateVisit
                  visit={visit.id_visit}
                  onUpdateVisit={updateVisit}
                />
                <DeleteGenericModal
                  id={visit.id_visit}
                  onDelete={deleteVisit}
                  token={token}
                  typeModule={typeModule}
                  typeModuleMessage={typeModuleMessage}
                />
              </span>
            </li>
          ))}
        </ol>
      </section>
    </MainLayout>
  );
};
