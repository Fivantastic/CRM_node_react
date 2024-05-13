import { MaxInvoice } from '../../components/Dashboard/MaxInvoice.jsx';
import { MaxShiments } from '../../components/Dashboard/MaxShiments.jsx';
import { MaximSale } from '../../components/Dashboard/MaximSale.jsx';
import { SalesBarCharts } from '../../components/Dashboard/SalesBarCharts.jsx';
import { StockProductBarCharts } from '../../components/Dashboard/StockProductBarCharts.jsx';
import { MainLayout } from '../../layout/MainLayout.jsx';
import './Home.css';

export const HomePage = () => {
  return (
    <MainLayout>
      <section
        id="dashboard_container"
        className="note_container mainContainer"
      >
        <h1 id="dashboard_title" className=" mainTitle">
          Dashboard
        </h1>
        <section id="max-charts">
          <MaximSale />
          <MaxShiments />
          <MaxInvoice />
        </section>
        <SalesBarCharts />
        <StockProductBarCharts />
      </section>
    </MainLayout>
  );
};
