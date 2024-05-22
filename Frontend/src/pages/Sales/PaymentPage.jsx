import { useState } from 'react';
import { useUser } from '../../context/authContext.jsx';
import { MainLayout } from '../../layout/MainLayout.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { CreatePayment } from '../../components/PagesComponents/Payments/CreatePayment.jsx'
import { PaymentsList } from '../../components/PagesComponents/Payments/PaymentsList.jsx';
import { usePaymentsList } from '../../hooks/PagesHooks/usePaymentsList.js'
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { PaymentsListTable } from '../../components/PagesComponents/Payments/PaymentsListTable.jsx';

export const PaymentPage = () => {
  const token = useUser();
  const {
    filteredList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addPayment,
    handleNewPaymentStatus
  } = usePaymentsList(token)
  const [isListView, setIsListView] = useState(() => window.innerWidth <= 1000);

  // Opciones de filtro
  const filterOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'Resuelto', value: 'paid' },
    { label: 'Cancelado', value: 'cancelled' },
  ];

  const sortOptions = [
    { label: "Importe (Asc)", value: "importe-asc" },
    { label: "Importe (Desc)", value: "importe-desc" },
    { label: "Referencia (A - Z)", value: "ref-asc" },
    { label: "Referencia (Z -A)", value: "ref-desc" },
    { label: "Estado (A - Z)", value: "status-asc" },
    { label: "Estado (Z - A)", value: "status-desc" },
  ];

  return (
    <MainLayout title="Pagos">
      <section id="payment_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
        <SearchPages onSearch={handleSearch}/>
        <CreatePayment onAddPayment={addPayment} token={token} />
        <FilterPages options={filterOptions} onChange={handleFilterChange} />
        <SortPages options={sortOptions} onSort={handleSortChange} />
        <ToggleMode  onClick={() => setIsListView(prev => !prev)} isListView={isListView}  />
        </nav>
        {isListView ? (
        <ol className="payment_list main_olist">
          {filteredList.map((data) => {
            return (
              <li
                key={data.id_payment}
                className="element_payment_content main_ilist"
              >
                <PaymentsList 
                  payment={data} 
                  handleNewPaymentStatus={handleNewPaymentStatus}
                  token={token} />
              </li>
            );
          })}
        </ol>
        ) : (
          <PaymentsListTable payments={filteredList} onUpdatePayment={handleNewPaymentStatus} />
        )}
      </section>
    </MainLayout>
  );
};
