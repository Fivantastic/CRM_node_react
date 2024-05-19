import { InvoicesBarCharts } from '../../components/Dashboard/InvoicesBarCharts.jsx';
import { MaxInvoices } from '../../components/Dashboard/MaxInvoice.jsx';

import { MaxShipments } from '../../components/Dashboard/MaxShipments.jsx';
import { MaximSale } from '../../components/Dashboard/MaximSale.jsx';
import { SalesBarCharts } from '../../components/Dashboard/SalesBarCharts.jsx';
import { StockProductBarCharts } from '../../components/Dashboard/StockProductBarCharts.jsx';
import { VisitBarCharts } from '../../components/Dashboard/VisitBarCharts.jsx';
import { MainLayout } from '../../layout/MainLayout.jsx';
import './Home.css';

export const HomePage = () => {
  return (
    <MainLayout>
      <h1 id="dashboard_title" className=" mainTitle">
        Dashboard
      </h1>
      <section
        id="dashboard_container"
        className="note_container mainContainer"
      >
        <section id="max-charts">
          <MaximSale />
          <MaxShipments />
          <MaxInvoices />
        </section>
        <section id="charts">
          <SalesBarCharts />
          <StockProductBarCharts />
        </section>
        <section id="charts">
          <InvoicesBarCharts />
          <VisitBarCharts />
        </section>
      </section>
    </MainLayout>
  );
};
