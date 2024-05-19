import { useUser } from '../../context/authContext';
import { CreateProduct } from '../../components/PagesComponents/Products/CreateProduct.jsx';
import { useState } from 'react';
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { UpdateProduct } from '../../components/PagesComponents/Products/UpdateProduct';
import { ProductList } from '../../components/PagesComponents/Products/ListProduct';
import { MainLayout } from '../../layout/MainLayout';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal';
import { useProductList } from '../../hooks/PagesHooks/useProductList.js';
import { ProductListTable } from '../../components/PagesComponents/Products/ProductListTable.jsx';


export const ProductPage = () => {
  const token = useUser();
  // Importamos el hook personalizado
  const {
    filteredProductList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addProduct,
    deleteProduct,
    updateProduct,
    typeModule,
    typeModuleMessage,
  } = useProductList(token);
  const [isListView, setIsListView] = useState(true);

  //Opciones de filtro
  const filterOptions = [
  { label: 'Activo', value: 'active' },
  { label: 'Inactivo', value: 'inactive' },
  ];

  // Opciones de ordenamiento
  const sortOptions = [
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
    { label: "Fecha (Antiguos)", value: "fecha-asc" },
    { label: "Fecha (Recientes)", value: "fecha-desc" },
  ]

  //Manejadores de eventos
  return (
    
    <MainLayout title="Productos">
      <section id="product_container " className="mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateProduct onAddUser={addProduct} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} />
          <ToggleMode onClick={() => setIsListView((prev) => !prev)}/>
        </nav>
        {isListView ? (
        
        <ol id="product_list" className=" main_olist">
          {filteredProductList.map((data) => {
            return (
              <li
                key={data.id_product}
                id="element_product_container "
                className="main_ilist"
              >
                <ProductList product={data} />
                <span id="product_actions" className="main_actions">
                  <UpdateProduct
                    product={data.id_product}
                    onUpdateProduct={updateProduct}
                  />
                  <DeleteGenericModal
                    id={data.id_product}
                    onDelete={deleteProduct}
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
          <ProductListTable product={filteredProductList} onDelete={deleteProduct} />
        )
        }
      </section>
    </MainLayout>
  
  );
};
