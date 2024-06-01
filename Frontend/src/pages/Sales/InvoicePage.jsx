import { useEffect, useState } from 'react';
import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { CreateInvoice } from '../../components/PagesComponents/Invoces/CreateInvoice.jsx';
import { InvoicesList } from '../../components/PagesComponents/Invoces/InvoicesList.jsx';
import { useInvoicesList } from '../../hooks/PagesHooks/useInvoicesList.js'
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { InvoicesListTable } from '../../components/PagesComponents/Invoces/InvoicesListTable.jsx';

export const InvoicePage = () => {
  const token = useUser();
  const {
    filteredList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addInvoice,
    updateInvoice
  } = useInvoicesList(token)
  const [isListView, setIsListView] = useState(() => window.innerWidth <= 860);

  useEffect(() => {
    const handleResize = () => {
      setIsListView(window.innerWidth <= 860);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filterOptions = [
    { label: 'Enviada', value: 'sent' },
    { label: 'Pendiente', value: 'pending' },
    { label: 'Pago parcial', value: 'partially_paid' },
    { label: 'Vencida', value: 'overdue' },
    { label: 'Pagada', value: 'paid' },
    { label: 'Reclamada', value: 'disputed' },
    { label: 'Reembolsada', value: 'refunded' },
    { label: 'Cancelada', value: 'cancelled' },    
  ];

  const sortOptions = [ 
    { label: "Ref (DSC)", value: "ref-desc" },
    { label: "Ref (ASC)", value: "ref-asc" },
    { label: "Comercial (A - Z)", value: "comercial-asc" },
    { label: "Comercial (Z - A)", value: "comercial-desc" },
    { label: "Vencimiento (Próximos)", value: "fecha-desc" },
    { label: "Vencimiento (Útlimos)", value: "fecha-asc" },
  ];

  const defaultSort = { label: "Ref (DSC)", value: "ref-desc" }
  
  return (
    <MainLayout title="Facturas">
      <section id="invoice_container" className=" mainContainer">
        <nav id="user_nav" className="mainNav">
        <SearchPages onSearch={handleSearch}/>
        <CreateInvoice onAddInvoice={addInvoice} token={token} />
        <FilterPages options={filterOptions} onChange={handleFilterChange} />
        <SortPages options={sortOptions} onSort={handleSortChange} defaultSort={defaultSort}/>
        <ToggleMode  onClick={() => setIsListView(prev => !prev)} isListView={isListView} />
        </nav>
        {isListView ? (
          <ol id="invoice_list" className="main_olist">
            {filteredList.length > 0 ? (
              filteredList.map((data) => (
                <li
                  key={data.id_invoice}
                  id="element_invoice_container"
                  className="main_ilist"
                >
                  <InvoicesList 
                    invoice={data} 
                    handleNewInvoiceStatus={updateInvoice}
                    token={token}
                  />
                </li>
              ))
            ) : (
              <div className="noResult">No hay listas disponibles</div>
            )}
          </ol>
        ) : (
          <InvoicesListTable invoices={filteredList} onUpdate={updateInvoice} />
        )}

      </section>
    </MainLayout>
  );
};
