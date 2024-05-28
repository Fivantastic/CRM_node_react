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

export const InvoicesBarCharts = () => {
  const token = useUser();
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInvoicesList = async () => {
    try {
      const response = await fetch(`${URL}/invoice`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Obtener satisfactorio:', responseData);

        // Actualizar el estado con los datos obtenidos
        setInvoiceList(responseData.data);
        setLoading(false); //
      } else {
        const errorData = await response.json();
        console.error('Obetener fallido:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de facturas:', error);
    }
  };

  useEffect(() => {
    getInvoicesList();
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
    if (!invoiceList || loading) return [];

    const groupedByMonth = invoiceList.reduce((acc, curr) => {
      const month = new Date(curr.creation_at).toLocaleString('default', {
        month: 'long',
      });

      // Verificar y convertir total_amount a número
      const amount = Number(curr.total_amount);
      if (isNaN(amount)) {
        return acc;
      }

      acc[month] = (acc[month] || 0) + amount;
      return acc;
    }, {});

    // Convertir el objeto agrupado en un array de objetos compatibles con Recharts
    const chartData = Object.entries(groupedByMonth).map(([name, value]) => ({
      name,
      ingresos: value.toFixed(2),
    }));

    return chartData;
  };

  const chartData = useMemo(prepareChartData, [invoiceList, loading]);

  return (
    <>
      <section id="payments-charts">
        <h2 id="stock-charts">Ingresos</h2>
        {loading ? (
          <div className='isloading'>
            <IsLoading />
          </div>
        ) : (
          <ResponsiveContainer>
            <BarChart data={chartData} width={500} height={300}>
              <CartesianGrid strokeDasharray="4 2 1" />
              <XAxis dataKey="name" tickLine={false} axisLine={true} />
              <YAxis tickFormatter={(tick) => `${tick}`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="ingresos" fill="#0e8743" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>
    </>
  );
};
