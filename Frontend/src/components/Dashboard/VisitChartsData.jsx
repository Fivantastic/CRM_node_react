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
import './VisitchartsData.css';
import { useEffect, useMemo, useState } from 'react';
import { IsLoading } from './DataDashboard/isLoading.jsx';

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

  const chartData = useMemo(() => (loading ? <p>Loading...</p> : moduleList), [loading, moduleList]);

  return (
    <section id="product-charts">
      <div className='visit_all_container'>
        <h2 id="stock-charts">Valoraciónes</h2>
        <section className="filters_charts">
          <button className="btn_filter" onClick={() => changeValueRatingRange(1)}>1</button>
          <button className="btn_filter" onClick={() => changeValueRatingRange(2)}>2</button>
          <button className="btn_filter" onClick={() => changeValueRatingRange(3)}>3</button>
          <button className="btn_filter" onClick={() => changeValueRatingRange(4)}>4</button>
          <button className="btn_filter" onClick={() => changeValueRatingRange(5)}>5</button>
        </section>
      </div>
      {loading ? (
        <div className='isloading'>
          <IsLoading />
      </div>
      ) : (
        <>
          <ResponsiveContainer>
            <BarChart data={chartData} width={500} height={300}>
              <CartesianGrid strokeDasharray="4 2 1" />
              <XAxis dataKey="service_type" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="rating_module" fill="#3a35cd" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </section>
  );
};
