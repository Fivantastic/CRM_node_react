import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { CreateInvoice } from '../../components/PagesComponents/Invoces/CreateInvoice.jsx';
import { InvoicesList } from '../../components/PagesComponents/Invoces/InvoicesList.jsx';
import { ClosedInvoice } from '../../components/PagesComponents/Invoces/ClosedInvoice.jsx';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal.jsx';
import { useInvoicesList } from '../../hooks/PagesHooks/useInvoicesList.js'
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
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
    { label: 'Pendiente', value: 'pending' },
    { label: 'Pagado', value: 'paid' },
    { label: 'Atrasado', value: 'overdue' },
    { label: 'Parcialmente Pagado', value: 'partially_paid' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'Reembolsado', value: 'refunded' },
    { label: 'Reclamado', value: 'disputed' },
    { label: 'Enviado', value: 'sent' },
  ];

  // TODO Adaptarlas al caso
  const sortOptions = [ 
    { label: "Factura (A - Z)", value: "factura-asc" },
    { label: "Factura (Z - A)", value: "factura-desc" },
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
                <InvoicesList invoice={data} />
                <span id="invoice_actions" className="main_actions">
                  <ClosedInvoice
                    invoice={data.id_invoice}
                    onUpdateInvoice={updateInvoice}
                    token={token}
                  />
                  <DeleteGenericModal
                    id={data.id_invoice}
                    onDelete={deleteInvoice}
                    token={token}
                    typeModule={typeModule}
                    typeModuleMessage={typeModuleMessage}
                  />
                </span>
              </li>
            );
          })}
        </ol>
        ) : (
          <h2>En construcción...</h2>
        )}
      </section>
    </MainLayout>
  );
};
