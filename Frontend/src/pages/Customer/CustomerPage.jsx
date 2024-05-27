import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { useEffect, useState } from 'react';
import { useCustomerList } from '../../hooks/PagesHooks/useCustomerList.js';
import { CreateCustomer } from '../../components/PagesComponents/Customer/CreateCustomer.jsx';
import { CustomerList } from '../../components/PagesComponents/Customer/CustomerList.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { CustomerListTable } from '../../components/PagesComponents/Customer/CustomerListTable.jsx';
import '../../Styles/Pages/StyleCustomerPage.css';

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
    activeCustomer,
    typeModule,
    typeModuleMessage,
  } = useCustomerList(token);

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
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' },
  ];

  const sortOptions = [
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
    { label: "Fecha (Antiguos)", value: "fecha-asc" },
    { label: "Fecha (Recientes)", value: "fecha-desc" },
  ];

  return (
    <MainLayout title="Clientes">
      <section id="customer_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateCustomer onAddCustomer={addCustomer} token={token} typeModule={typeModule} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} />
          <ToggleMode onClick={() => setIsListView(prev => !prev)} isListView={isListView} />
        </nav>
        {isListView ? (
          <ol id="customer_list" className="main_olist">
            {filteredCustomerList.map(customer => (
              <li key={customer.id_customer} id="element_customer_container">
                <CustomerList
                  customer={customer}
                  updateCustomer={updateCustomer}
                  deleteCustomer={deleteCustomer}
                  activeCustomer={activeCustomer}
                  typeModule={typeModule}
                  typeModuleMessage={typeModuleMessage}
                />
              </li>
            ))}
          </ol>
        ) : (
          <CustomerListTable
            customer={filteredCustomerList}
            updateCustomer={updateCustomer}
            deleteCustomer={deleteCustomer}
            activeCustomer={activeCustomer}
            typeModule={typeModule}
            typeModuleMessage={typeModuleMessage}
          />
        )}
      </section>
    </MainLayout>
  );
};
