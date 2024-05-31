import { useEffect, useState } from "react";
const URL = import.meta.env.VITE_URL;
import "./ratingDashboard.css";
import { useUser } from "../../../context/authContext.jsx";
import { FilterPages } from "../../NavPages/FilterPages.jsx";
import { SortPages } from "../../NavPages/SortPages.jsx";
/* import { getNormalizedDate } from "../../../Services/getNormalizedDate.js"; */

export const RatingDashboard = () => {
  const token = useUser();
  const [moduleList, setModuleList] = useState([]);
  console.log(moduleList);

  const getModuleList = async () => {
    try {
      const response = await fetch(`${URL}/module/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setModuleList(responseData.data);

      } else {
        const errorData = await response.json();
        console.error('Obtener fallido:', errorData);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error al obtener la lista de modulos:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  useEffect(() => {
    getModuleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < Math.min(rating, 5); i++) {
      stars.push(<span key={i} className="estrella">&#9733;</span>);
    }
    return stars;
  };

  function getNormalizedDate(dateString) {
    // Verifica si dateString es válido
    if (!dateString || isNaN(Date.parse(dateString))) {
        return '';
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString();
}
  
  return (
      <>     
      <div className="tarjeta" >
        <div className="head_dashboard">
          <h2>Valoraciones Recientes</h2>
          <div className="filters_dashboard">
            <FilterPages /* options={filterOptions} onChange={handleFilterChange} */ />
            <SortPages /* options={sortOptions} onSort={handleSortChange }*/ />
          </div>
        </div>
      {moduleList.map((module) => {
        return (
        <>
          <ul key={module.id_module}>
              <li className="valoracion">
              {module.service_type === 'sale'? (
                  <div className="servicio_dashboard">Venta</div>
                ) : (
                  <div className="servicio_dashboard">Visita</div>
                )}
                {renderStars(module.rating_module)}
                <div className="company_dashboard">{module.company_name || `${module.agent_name} ${module.agent_last_name}`}</div>
                <div>{module.rating_comment}</div>
                <div>{getNormalizedDate(module.update_at)}</div>
              </li>
          </ul>
        </>
      )
    })}
    </div>
    </>
  )
}
