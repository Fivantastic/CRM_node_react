// src/pages/Sales/SalesPage.jsx
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
import { ExportCompletTableDB } from '../../components/ExcelModal/ExportCompletTableDB.jsx';

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

  const [isListView, setIsListView] = useState(() => window.innerWidth <= 1080);

  useEffect(() => {
    const handleResize = () => {
      setIsListView(window.innerWidth <= 1080);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filterOptions = [
    { label: 'Pendiente', value: 'open' },
    { label: 'En proceso', value: 'processing' },
    { label: 'Cancelada', value: 'cancelled' },
    { label: 'Cerrada', value: 'closed' },
  ];

  const sortOptions = [
    { label: 'Ref (DSC)', value: 'ref-desc' },
    { label: 'Ref (ASC)', value: 'ref-asc' },
    { label: 'Empresa (A - Z)', value: 'empresa-asc' },
    { label: 'Empresa (Z - A)', value: 'empresa-desc' },
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
  ];

  const defaultSort =  { label: 'Ref (DSC)', value: 'ref-desc' }

  const tables = [
    {
      name: 'Sales',
      columns: [
        { field: 'ref_SL', header: 'Ref. venta' },
        { field: 'operation_status', header: 'Estado de la Venta' },
        { field: 'create_at', header: 'Fecha de Creación' },
      ],
    },
    {
      name: 'Customers',
      columns: [
        { field: 'company_name', header: 'Empresa' },
        { field: 'name', header: 'Contacto' },
        { field: 'email', header: 'Email' },
        { field: 'phone', header: 'Teléfono' },
      ],
    },
    {
      name: 'Products',
      columns: [
        { field: 'name', header: 'Producto' },
        { field: 'price', header: 'Precio' },
      ],
    },
    {
      name: 'SalesProducts',
      columns: [
        { field: 'quantity', header: 'Cantidad' },
      ],
    },
    {
      name: 'Users',
      columns: [
        { field: 'name', header: 'Comercial' },
      ],
    },
  ];

  const page = 'orderSales';

  return (
    <MainLayout title="Ordenes de venta">
      <section id="sale_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateSale onAddSale={addSale} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} defaultSort={defaultSort}/>
          <ExportCompletTableDB tables={tables} token={token} page={page} />
          <ToggleMode  onClick={() => setIsListView(prev => !prev)} isListView={isListView} />
        </nav>
        {isListView ? (
          <ol id="sales_list" className="main_olist">
            {filteredSalesList.length > 0 ? (
              filteredSalesList.map((data) => (
                <li
                  key={data.id_sale}
                  id="element_sale_container"
                  className="main_ilist"
                >
                  <SalesList
                    sale={data}
                    onUpdateSale={updateSale}
                    onDelete={deleteSale}
                    typeModule={typeModule}
                    typeModuleMessage={typeModuleMessage}
                  />
                </li>
              ))
            ) : (
              <div className="noResult">No hay ventas disponibles</div>
            )}
          </ol>
        ) : (
          <SalesListTable sale={filteredSalesList} onUpdateSale={updateSale} onDelete={deleteSale} />
        )}
      </section>
    </MainLayout>
  );
};
