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
import './Charts.css';
import { IsLoading } from './DataDashboard/isLoading.jsx';
const URL = import.meta.env.VITE_URL;

export const SalesBarCharts = () => {
  const token = useUser();
  const [salesList, setSalesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSaleList = async () => {
    try {
      const response = await fetch(`${URL}/sales/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Obtener satisfactorio:', responseData);
        setSalesList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Obetener fallido:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de ventas:', error);
    }
  };

  useEffect(() => {
    getSaleList();

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

  const prepareChartData = () => {
    if (!salesList || loading) return [];

    // Asumiendo que cada venta tiene una propiedad 'date' en formato YYYY-MM-DD
    const groupedByMonth = salesList.reduce((acc, sale) => {
      const month = new Date(sale.create_at).toLocaleString('default', {
        month: 'long',
      });
      acc[month] = (acc[month] || 0) + sale.quantity;
      return acc;
    }, {});

    // Convertir el objeto agrupado en un array de objetos compatibles con Recharts
    const chartData = Object.entries(groupedByMonth).map(([name, value]) => ({
      name,
      Producto: value,
    }));

    return chartData;
  };

  const chartData = useMemo(prepareChartData, [salesList, loading]);

  return (
    <>
      <section id="sales-charts">
        <h2 id="customer-charts">Ventas</h2>
        {loading ? (
          <div className='isloading'>
            <IsLoading />
          </div>
        ) : (
          <ResponsiveContainer>
            <BarChart data={chartData} width={500} height={300}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" tickLine={false} axisLine={true} />
              <YAxis tickFormatter={(tick) => `${tick}`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Producto" fill="#3a35cd" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>
    </>
  );
};
