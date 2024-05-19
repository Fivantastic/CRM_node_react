// import Swal from 'sweetalert2';
import { useUser } from '../../context/authContext.jsx';
import { MainLayout } from '../../layout/MainLayout.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { CreatePayment } from '../../components/PagesComponents/Payments/CreatePayment.jsx'
import { PaymentsList } from '../../components/PagesComponents/Payments/PaymentsList.jsx';
import { ChangeStatus } from '../../components/forms/ChangeStatus.jsx';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal.jsx';
import { usePaymentsList } from '../../hooks/PagesHooks/usePaymentsList.js'
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { useState } from 'react';

export const PaymentPage = () => {
  const token = useUser();

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'payments';
  // mensajes al cliente
  const typeModuleMessage = 'Pagos';

  const {
    filteredList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addPayment,
    deletePayment,
    handleNewPaymentStatus
  } = usePaymentsList(token)
  const [isListView, setIsListView] = useState(true);

  // Opciones de filtro
  const filterOptions = [
    { label: 'Pendiente', value: 'pending' },
    { label: 'Resuelto', value: 'paid' },
    { label: 'Cancelado', value: 'cancelled' },
  ];

  const sortOptions = [
    { label: "Factura (A - Z)", value: "factura-asc" },
    { label: "Factura (Z - A)", value: "factura-desc" },
    { label: "Fecha (Antiguos)", value: "fecha-asc" },
    { label: "Fecha (Recientes)", value: "fecha-desc" },
    { label: "Estado (A - Z)", value: "status-asc" },
    { label: "Estado (Z - A)", value: "status-desc" },
  ];

  return (
    <MainLayout title="Pagos">
      <section className="payment_container mainContainer">
        <nav id="user_nav" className="mainNav">
        <SearchPages onSearch={handleSearch}/>
        <CreatePayment onAddPayment={addPayment} token={token} />
        <FilterPages options={filterOptions} onChange={handleFilterChange} />
        <SortPages options={sortOptions} onSort={handleSortChange} />
        <ToggleMode onClick={() => setIsListView(prev => !prev)} />
        </nav>
        {isListView ? (
        <ol className="payment_list main_olist">
          {filteredList.map((data) => {
            const currentStatus = data.payment_status;
            return (
              <li
                key={data.id_payment}
                className="element_payment_content main_ilist"
              >
                <PaymentsList payment={data} />
                <span id="payment_actions" className="main_actions">
                  {currentStatus !== 'cancelled' && (
                    <ChangeStatus
                      id={data.id_payment}
                      onClick={handleNewPaymentStatus}
                      newStatus={'cancelled'}
                      newStatusMessage="Cancelar"
                      token={token}
                      typeModule={typeModule}
                      typeModuleMessage={typeModuleMessage}
                    />
                  )}
                  {currentStatus !== 'paid' &&
                    currentStatus !== 'cancelled' && (
                      <ChangeStatus
                        id={data.id_payment}
                        onClick={handleNewPaymentStatus}
                        newStatus={'paid'}
                        newStatusMessage="Resolver"
                        token={token}
                        typeModule={typeModule}
                        typeModuleMessage={typeModuleMessage}
                      />
                    )}
                  {currentStatus !== 'pending' && currentStatus !== 'paid' && (
                    <ChangeStatus
                      id={data.id_payment}
                      onClick={handleNewPaymentStatus}
                      newStatus={'pending'}
                      newStatusMessage="Restaurar"
                      token={token}
                      typeModule={typeModule}
                      typeModuleMessage={typeModuleMessage}
                    />
                  )}

                  {currentStatus === 'cancelled' && (
                    <DeleteGenericModal
                      id={data.id_payment}
                      onDelete={deletePayment}
                      token={token}
                      typeModule={typeModule}
                      typeModuleMessage={typeModuleMessage}
                    />
                  )}
                </span>
              </li>
            );
          })}
        </ol>
        ) : (
          <h2>En construcción... </h2>
        )}
      </section>
    </MainLayout>
  );
};
