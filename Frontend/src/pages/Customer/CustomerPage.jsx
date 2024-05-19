import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { useState } from 'react';
import { CreateCustomer } from '../../components/PagesComponents/Customer/CreateCustomer.jsx';
import { CustomerList } from '../../components/PagesComponents/Customer/CustomerList.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import '../../Styles/Pages/StyleCustomerPage.css';
import { useCustomerList } from '../../hooks/PagesHooks/useCustomerList.js';

export const CustomerPage = () => {
  const token = useUser();

  const {
    filteredCustomerList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addCustomer,
    deleteCustomer,
    updateCustomer,
  } = useCustomerList(token);

  const [isListView, setIsListView] = useState(true);

    // Opciones de filtro
    const filterOptions = [
      { label: 'Activo', value: '1' },
      { label: 'Inactivo', value: '0' },
    ];
  
    // Opciones de ordenamiento
    const sortOptions = [
      { label: "Nombre (A - Z)", value: "nombre-asc" },
      { label: "Nombre (Z - A)", value: "nombre-desc" },
      { label: "Fecha (Antiguos)", value: "fecha-asc" },
      { label: "Fecha (Recientes)", value: "fecha-desc" },
    ];

  return (
    <MainLayout title="Clientes">
      <section id="customer_container" className="mainContainer">
        <nav id="customer_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateCustomer onAddCustomer={addCustomer} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} />
          <ToggleMode onClick={() => setIsListView(prev => !prev)} />
        </nav>
        {isListView ? (
          <ol id="customer_list" className="main_olist">
            {filteredCustomerList.map(customer => (
              <li key={customer.id_customer} id="element_customer_container">
                <CustomerList customer={customer} updateCustomer={updateCustomer} onDelete={deleteCustomer} />
              </li>
            ))}
          </ol>
        ) : (
          <div>En construcción</div>
        )}
      </section>
    </MainLayout>
  );
  
};
