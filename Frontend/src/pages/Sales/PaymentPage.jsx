import { useEffect, useState } from 'react';
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
  const [isListView, setIsListView] = useState(() => window.innerWidth <=930);

  useEffect(() => {
    const handleResize = () => {
      setIsListView(window.innerWidth <= 930);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Opciones de filtro
  const filterOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'Resuelto', value: 'paid' },
    { label: 'Cancelado', value: 'cancelled' },
  ];

  const sortOptions = [
    { label: "Ref (DSC)", value: "ref-desc" },
    { label: "Ref (ASC)", value: "ref-asc" },
    { label: "Importe (Asc)", value: "importe-asc" },
    { label: "Importe (Desc)", value: "importe-desc" },
    { label: "Fecha (A - Z)", value: "fecha-asc" },
    { label: "fecha (Z -A)", value: "fecha-desc" },
  ];

  const defaultSort =  { label: "Ref (DSC)", value: "ref-desc" }

  return (
    <MainLayout title="Pagos">
      <section id="payment_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
        <SearchPages onSearch={handleSearch}/>
        <CreatePayment onAddPayment={addPayment} token={token} />
        <FilterPages options={filterOptions} onChange={handleFilterChange} />
        <SortPages options={sortOptions} onSort={handleSortChange} defaultSort={defaultSort}/>
        <ToggleMode  onClick={() => setIsListView(prev => !prev)} isListView={isListView}  />
        </nav>
        {isListView ? (
          <ol id="payments_list" className="main_olist">
            {filteredList.length > 0 ? (
              filteredList.map((data) => (
                <li
                  key={data.id_payment}
                  id="element_payment_content"
                  className="main_ilist"
                >
                  <PaymentsList 
                    payment={data} 
                    handleNewPaymentStatus={handleNewPaymentStatus}
                    token={token} 
                  />
                </li>
              ))
            ) : (
              <div className="noResult">No hay pagos disponibles</div>
            )}
          </ol>
        ) : (
          <PaymentsListTable payments={filteredList} onUpdatePayment={handleNewPaymentStatus} />
        )}
      </section>
    </MainLayout>
  );
};
