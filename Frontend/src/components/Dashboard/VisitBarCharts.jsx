import { useEffect, useMemo, useState } from 'react';
import { useUser } from '../../context/authContext.jsx';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const VisitBarCharts = () => {
  const token = useUser();
  const [visitList, setVisitList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVisitList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/visits/list`, {
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
      console.error('Error al obtener la lista de ventas:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  useEffect(() => {
    getVisitList();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const error = console.error;
    console.error = (...args) => {
      if (/defaultProps/.test(args[0])) return;
      error(...args);
    };
  }, []);

  const chartData = useMemo(
    () => (loading ? <p>Loading...</p> : visitList),
    [loading, visitList]
  );

  return (
    <section id="product-charts">
      <h2 id="stock-charts">Visitas</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ResponsiveContainer>
          <BarChart data={chartData} width={500} height={300}>
            <CartesianGrid strokeDasharray="4 2 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rating_visit" fill="#3a35cd" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
};
