import { useEffect, useState } from 'react';
import { useUser } from '../../context/authContext.jsx';
import { VisitChartsData } from './VisitChartsData.jsx';
const URL = import.meta.env.VITE_URL;

export const VisitBarCharts = () => {
  const token = useUser();
  const [moduleList, setModuleList] = useState([]);

  const [valueRatingRange, setValueRatingRange] = useState(0);

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

        // Modificar la lógica de filtrado basándose en valueRatingRange
        let filteredData;
        switch (valueRatingRange) {
          case 0:
            filteredData = responseData.data;
            break;
          case 1:
            filteredData = responseData.data.filter(
              (module) => module.rating_module == 1
            );
            break;
          case 2:
            filteredData = responseData.data.filter(
              (module) => module.rating_module == 2
            );
            break;
          case 3:
            filteredData = responseData.data.filter(
              (module) => module.rating_module == 3
            );
            break;
          case 4:
            filteredData = responseData.data.filter(
              (module) => module.rating_module == 4
            );
            break;
          case 5:
            filteredData = responseData.data.filter(
              (module) => module.rating_module == 5
            );
            break;

          default:
            filteredData = responseData.data;
        }

        // Ordenar y seleccionar un rango de datos
        const sortedAndFilteredData = filteredData
          .sort((a, b) => b.rating_module - a.rating_module)
          .slice(5, 10);

        // Actualizar el estado con los datos ordenados y filtrados
        setModuleList(sortedAndFilteredData);
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
  }, [token, valueRatingRange]);

  useEffect(() => {
    const error = console.error;
    console.error = (...args) => {
      if (/defaultProps/.test(args[0])) return;
      error(...args);
    };
  }, []);

  const changeValueRatingRange = (newRange) => {
    setValueRatingRange(newRange);
  };

  return (
    <VisitChartsData
      setValueRatingRange={changeValueRatingRange}
      moduleList={moduleList}
    />
  );
};
