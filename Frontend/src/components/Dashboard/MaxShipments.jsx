import { useEffect, useState } from 'react';
import { useUser } from '../../context/authContext.jsx';
const URL = import.meta.env.VITE_URL;
import { IsLoading } from './DataDashboard/isLoading.jsx';
import './Max.css';

export const MaxShipments = () => {
  const token = useUser();
  const [currentMonthShipments, setCurrentMonthShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({ min: 0, max: 0 });

  const getShipmentMonth = async () => {
    try {
      const response = await fetch(`${URL}/shipment/list`, {
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
        const filteredSales = responseData.data.filter(shipment =>
          new Date(shipment.deliveryNote_create_at
          ).getFullYear() === year && new Date(shipment.deliveryNote_create_at
          ).getMonth() + 1 === month
        );

        // Actualizar el estado con las facturas del mes actual
        setCurrentMonthShipments(filteredSales);

        calculateTotalShipments(filteredSales);
        setRange({
          min: Math.min(...filteredSales.map(shipment => parseFloat(shipment.product_quantity))),
          max: Math.max(...filteredSales.map(shipment => parseFloat(shipment.product_quantity)))
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


  useEffect(() => {
    getShipmentMonth();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  const calculateTotalShipments = (sales) => sales.reduce((total, shipment) => total + ( parseFloat(shipment.product_quantity
  )), 0);

  const percentageChange = ((calculateTotalShipments(currentMonthShipments) / previousTotalIncome) * 100).toFixed(2);

  return (
    <div className="card_Dashboard">
      <div className="title">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M233.76-177.69q-46.84 0-79.53-32.76T121.54-290H53.85v-417.69q0-30.31 21-51.31 21-21 51.3-21h544.62v152.31h106.15l129.23 173.08V-290h-72.3q0 46.79-32.79 79.55-32.78 32.76-79.61 32.76t-79.53-32.76q-32.69-32.76-32.69-79.55H346.15q0 46.92-32.78 79.61-32.78 32.7-79.61 32.7Zm.09-60q22 0 37.15-15.16Q286.15-268 286.15-290T271-327.16q-15.15-15.15-37.15-15.15t-37.16 15.15Q181.54-312 181.54-290q0 22 15.15 37.15 15.16 15.16 37.16 15.16ZM113.85-350h28.92q12.77-22.23 36.88-37.27 24.12-15.04 54.2-15.04 29.3 0 53.8 14.85 24.5 14.85 37.27 37.46h285.85v-370H126.15q-4.61 0-8.46 3.85-3.84 3.84-3.84 8.46V-350Zm607.69 112.31q22 0 37.15-15.16Q773.85-268 773.85-290t-15.16-37.16q-15.15-15.15-37.15-15.15t-37.16 15.15Q669.23-312 669.23-290q0 22 15.15 37.15 15.16 15.16 37.16 15.16ZM670.77-430H850L746.15-567.69h-75.38V-430ZM362.31-535Z" />
          </svg>
        </span>
        <p className="title-text">Envios</p>
        <s className="percent">
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
        </s>
      </div>
      <div className="data">
        <section>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="34px"
            viewBox="0 -960 960 960"
            width="34px"
            fill="#000000"
          >
            <path d="m400-570 80-40 80 40v-190H400v190ZM280-280v-80h200v80H280Zm-80 160q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-640v560-560Zm0 560h560v-560H640v320l-160-80-160 80v-320H200v560Z" />
          </svg>
          {loading ? (
            <IsLoading />
          ) : (
            <>
               &nbsp;{calculateTotalShipments(currentMonthShipments)}
            </>
          )}
        </section>

        <div className="range">
          <div className='fill' style={{ maxWidth: "100%", width: `${(range.max - range.min) * (percentageChange / 100)}%`}}></div>
        </div>
      </div>
    </div>
  );
};
