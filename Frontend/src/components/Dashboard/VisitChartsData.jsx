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
import './VisitChartsData.css';
import { useEffect, useMemo, useState } from 'react';

export const VisitChartsData = ({ setValueRatingRange, moduleList }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeValueRatingRange = (newRange) => {
    setValueRatingRange(newRange);
  };

  const chartData = useMemo(
    () => (loading ? <p>Loading...</p> : moduleList),
    [loading, moduleList]
  );

  return (
    <section id="product-charts">
      <h2 id="stock-charts">Valoraciónes</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <>
          <section className="filters_charts">
            <button
              className="btn_filter"
              onClick={() => changeValueRatingRange(1)}
            >
              1
            </button>
            <button
              className="btn_filter"
              onClick={() => changeValueRatingRange(2)}
            >
              2
            </button>
            <button
              className="btn_filter"
              onClick={() => changeValueRatingRange(3)}
            >
              3
            </button>
            <button
              className="btn_filter"
              onClick={() => changeValueRatingRange(4)}
            >
              4
            </button>
            <button
              className="btn_filter"
              onClick={() => changeValueRatingRange(5)}
            >
              5
            </button>
          </section>

          <div style={{ height: '100%', width: '100%', margin: 0 }}>
            <div
              style={{ display: 'flex', flexDirection: 'row', height: '200px' }}
            >
              <div style={{ flex: 1 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData} width={500} height={300}>
                    <CartesianGrid strokeDasharray="4 2 1" />
                    <XAxis dataKey="service_type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rating_module" fill="#3a35cd" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
