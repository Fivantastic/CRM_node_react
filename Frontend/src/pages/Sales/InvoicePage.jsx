import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { CreateInvoice } from '../../components/PagesComponents/Invoces/CreateInvoice.jsx';
import { InvoicesList } from '../../components/PagesComponents/Invoces/InvoicesList.jsx';
import { useInvoicesList } from '../../hooks/PagesHooks/useInvoicesList.js'
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { InvoicesListTable } from '../../components/PagesComponents/Invoices/InvoicesListTable.jsx';
import { useState } from 'react';

export const InvoicePage = () => {
  const token = useUser();
  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'invoice';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Factura';

  const {
    filteredList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addInvoice,
    deleteInvoice,
    updateInvoice
  } = useInvoicesList(token)
  const [isListView, setIsListView] = useState(true);

  const filterOptions = [
    { label: 'Enviada', value: 'sent' },
    { label: 'Pendiente', value: 'pending' },
    { label: 'Pago parcial', value: 'partially_paid' },
    { label: 'Atrasada', value: 'overdue' },
    { label: 'Pagada', value: 'paid' },
    { label: 'Reclamada', value: 'disputed' },
    { label: 'Reembolsada', value: 'refunded' },
    { label: 'Cancelada', value: 'cancelled' },    
  ];

  const sortOptions = [ 
    { label: "Referencia (A - Z)", value: "ref-asc" },
    { label: "Referencia (Z - A)", value: "ref-desc" },
    { label: "Comercial (A - Z)", value: "comercial-asc" },
    { label: "Comercial (Z - A)", value: "comercial-desc" },
    { label: "Vencimiento (Próximos)", value: "fecha-desc" },
    { label: "Vencimiento (Útlimos)", value: "fecha-asc" },
    { label: "Estado (A - Z)", value: "status-asc" },
    { label: "Estado (Z - A)", value: "status-desc" },
  ];
  

  return (
    <MainLayout title="Facturas">
      <section id="invoice_container" className=" mainContainer">
        <nav id="user_nav" className="mainNav">
        <SearchPages onSearch={handleSearch}/>
        <CreateInvoice onAddInvoice={addInvoice} token={token} />
        <FilterPages options={filterOptions} onChange={handleFilterChange} />
        <SortPages options={sortOptions} onSort={handleSortChange} />
        <ToggleMode onClick={() => setIsListView(prev => !prev)} />
        </nav>
        {isListView ? (
        <ol id="invoice_list" className=" main_olist">
          {filteredList.map((data) => {
            return (
              <li
                key={data.id_invoice}
                id="element_invoice_container"
                className=" main_ilist"
              >
                <InvoicesList 
                  invoice={data} 
                  onDelete={deleteInvoice}
                  handleNewInvoiceStatus={updateInvoice}
                  typeModule={typeModule}
                  typeModuleMessage={typeModuleMessage}
                  token={token}
                />
              </li>
            );
          })}
        </ol>
        ) : (
          <InvoicesListTable invoices={filteredList} onUpdate={updateInvoice} onDelete={deleteInvoice} />
        )}
      </section>
    </MainLayout>
  );
};
