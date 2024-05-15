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

export const SalesBarCharts = () => {
  const token = useUser();
  const [salesList, setSalesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSaleList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sales/list`, {
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

  const chartData = useMemo(
    () => (loading ? <p>Loading...</p> : salesList),
    [loading, salesList]
  );

  return (
    <>
      <section id="sales-charts">
        <h2 id="customer-charts">Clintes</h2>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <div style={{ height: '100%', width: '100%', margin: 0 }}>
            <div
              style={{ display: 'flex', flexDirection: 'row', height: '200px' }}
            >
              <div style={{ flex: 1 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData} width={500} height={300}>
                    <CartesianGrid strokeDasharray="4 2 1" />
                    <XAxis dataKey="customer" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#3a35cd" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};