import { useEffect, useState } from 'react';
import { useUser } from '../../context/authContext.jsx';
const URL = import.meta.env.VITE_URL;
import './Max.css';
import { IsLoading } from './DataDashboard/isLoading.jsx';

export const MaxInvoices = () => {
  const token = useUser();
  const [currentMonthInvoices, setCurrentMonthInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({ min: 0, max: 0 });


  const getInvoicesMonth = async () => {
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

        // Obtener el año y mes actual
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; 

        // Filtrar facturas por mes actual
        const filteredInvoices = responseData.data.filter(invoice =>
          new Date(invoice.creation_at).getFullYear() === year && new Date(invoice.creation_at).getMonth() + 1 === month
        );

        // Actualizar el estado con las facturas del mes actual
        setCurrentMonthInvoices(filteredInvoices);
        
        setRange({
          min: Math.min(...filteredInvoices.map(invoice => parseFloat(invoice.total_amount))),
          max: Math.max(...filteredInvoices.map(invoice => parseFloat(invoice.total_amount)))
        });
      } else {
        const errorData = await response.json();
        console.error('Obetener fallido:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de facturas:', error);
    }
  };

  // Ejemplo de total de ingresos previos
  const previousTotalIncome = 100000;
  const calculateTotalInvoice = (invoice) => invoice.reduce((total, shipment) => total + ( parseFloat(shipment.total_amount
  )), 0); 


  useEffect(() => {
    getInvoicesMonth();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const percentageChange = ((calculateTotalInvoice(currentMonthInvoices) / previousTotalIncome) * 100).toFixed(2);

  return (
    <div className="card_Dashboard">
      <div className="title">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1792 1792"
            height="20"
            fill="currentColor"
            width="20"
          >
            <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
          </svg>
        </span>
        <p className="title-text">Ingresos</p>
        <p className="percent">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"></path>
          </svg>{' '}
          {percentageChange}%
        </p>
      </div>
      <div className="data">
        <section>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="44px"
            viewBox="0 -960 960 960"
            width="44px"
            fill="#000000"
          >
            <path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z" />
          </svg>
          {loading ? (
            <IsLoading />
          ) : (
            <>
              {currentMonthInvoices.length > 
              0? currentMonthInvoices.reduce((total, invoice) => 
              total + parseFloat(invoice.total_amount), 0).toFixed(2) : 0}
            </>
          )}
        </section>

        <div className="range">
          <div className="fill" style={{ maxWidth: "100%", width: `${(range.max - range.min) * (percentageChange / 100)}%`}}></div>
        </div>
      </div>
    </div>
  );
};
