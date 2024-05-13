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

export const StockProductBarCharts = () => {
  const token = useUser();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener la lista de productos de la base de datos
  const getProductList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/product/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setProductList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Obtener producto fallido', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de productos', error);
    }
  };

  useEffect(() => {
    getProductList();

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
    () => (loading ? <p>Loading...</p> : productList),
    [loading, productList]
  );

  return (
    <>
      <section id="product-charts">
        <h2 id="stock-charts">Productos</h2>
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
              <Bar dataKey="stock" fill="#0e8743" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>
    </>
  );
};
