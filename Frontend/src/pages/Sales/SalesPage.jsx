import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { useState } from 'react';
import { SalesList } from '../../components/PagesComponents/Sales/SalesList.jsx';
import { CreateSale } from '../../components/PagesComponents/Sales/CreateSale.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { SalesListTable } from '../../components/PagesComponents/Sales/SalesListTable.jsx';
import { useSalesList } from '../../hooks/PagesHooks/useSalesList.js';
/* import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal.jsx'; */

export const SalesPage = () => {
  const token = useUser();

  const {
    filteredSalesList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addSale,
    deleteSale,
    updateSale,
    typeModule,
    typeModuleMessage,
  } = useSalesList(token);

  const [isListView, setIsListView] = useState(true);

  const filterOptions = [
    { label: 'Proceso', value: 'open' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'Cerrado ', value: 'closed' },
  ];

  const sortOptions = [
    { label: 'Nombre (A - Z)', value: 'nombre-asc' },
    { label: 'Nombre (Z - A)', value: 'nombre-desc' },
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
  ];

  return (
    <MainLayout>
      <section id="sale_container " className="mainContainer">
        <h1 id="sale_title" className=" mainTitle">
          Ventas
        </h1>
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateSale onAddSale={addSale} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} />
          <ToggleMode onClick={() => setIsListView((prev) => !prev)} />
        </nav>
        {isListView ? (
          <ol id="sales_list" className=" main_olist">
            {filteredSalesList.map((data) => {
              return (
                <li
                  key={data.id_sale}
                  id="element_sale_container"
                  className=" main_ilist"
                >
                  <SalesList
                    sale={data}
                    onUpdateSale={updateSale}
                    onDelete={deleteSale}
                    typeModule={typeModule}
                    typeModuleMessage={typeModuleMessage}
                  />
                </li>
              );
            })}
          </ol>
        ) : (
          <SalesListTable sale={filteredSalesList} onDelete={deleteSale} />
        )}
      </section>
    </MainLayout>
  );
};
