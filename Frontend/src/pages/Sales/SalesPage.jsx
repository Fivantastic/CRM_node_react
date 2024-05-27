import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { useEffect, useState } from 'react';
import { SalesList } from '../../components/PagesComponents/Sales/SalesList.jsx';
import { CreateSale } from '../../components/PagesComponents/Sales/CreateSale.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { SalesListTable } from '../../components/PagesComponents/Sales/SalesListTable.jsx';
import { useSalesList } from '../../hooks/PagesHooks/useSalesList.js';

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

  const [isListView, setIsListView] = useState(() => window.innerWidth <= 1050);

  useEffect(() => {
    const handleResize = () => {
      setIsListView(window.innerWidth <= 1050);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filterOptions = [
    { label: 'Procesado', value: 'processing' },
    { label: 'Pendiente', value: 'open' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'Cerrado ', value: 'closed' },
  ];

  const sortOptions = [
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
    { label: 'Empresa (A - Z)', value: 'empresa-asc' },
    { label: 'Empresa (Z - A)', value: 'empresa-desc' },
    { label: 'Ref (A - Z)', value: 'ref-asc' },
    { label: 'Ref (Z - A)', value: 'ref-desc' },
  ];

  return (
    <MainLayout title="Ordenes de venta">
      <section id="sale_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateSale onAddSale={addSale} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} />
          <ToggleMode  onClick={() => setIsListView(prev => !prev)} isListView={isListView} />
        </nav>
        {isListView ? (
          <ol id="sales_list" className="main_olist">
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
          <SalesListTable sale={filteredSalesList} onUpdateSale={updateSale} onDelete={deleteSale} />
        )}
      </section>
    </MainLayout>
  );
};
