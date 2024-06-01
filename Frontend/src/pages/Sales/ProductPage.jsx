import { useUser } from '../../context/authContext';
import { CreateProduct } from '../../components/PagesComponents/Products/CreateProduct.jsx';
import { useEffect, useState } from 'react';
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
import { MoreProduct } from '../../components/PagesComponents/Products/MoreProduct.jsx';
import { StatusProductController } from '../../components/PagesComponents/Products/StatusProductController.jsx';

export const ProductPage = () => {
  const token = useUser();
  const {
    filteredProductList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addProduct,
    deleteProduct,
    updateProduct,
    activeProduct,
    typeModule,
    typeModuleMessage,
  } = useProductList(token);
  const [isListView, setIsListView] = useState(() => window.innerWidth <= 1060);

  useEffect(() => {
    const handleResize = () => {
      setIsListView(window.innerWidth <= 1060);
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
    { label: 'Ref (DSC)', value: 'ref-desc' },
    { label: 'Ref (ASC)', value: 'ref-asc' },
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
    { label: "Fecha (Antiguos)", value: "fecha-asc" },
    { label: "Fecha (Recientes)", value: "fecha-desc" },  
  ];

  const defaultSort = { label: 'Ref (DSC)', value: 'ref-desc' }

  return (
    <MainLayout title="Productos">
      <section id="product_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateProduct onAddProduct={addProduct} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} defaultSort={defaultSort}/>
          <ToggleMode onClick={() => setIsListView((prev) => !prev)} isListView={isListView} />
        </nav>
        {isListView ? (
          <ol id="product_list" className="main_olist">
            {filteredProductList.length > 0 ? (
              filteredProductList.map((product) => (
                <li key={product.id_product} id="element_product_container" className="main_ilist">
                  <ProductList product={product} activeProduct={activeProduct} />
                  <span id="product_actions" className="main_actions">
                    <MoreProduct product={product} />
                    <StatusProductController
                      id={product.id_product}
                      isActive={product.active}
                      activeProduct={activeProduct}
                      token={token}
                      typeModule={typeModule}
                      typeModuleMessage={typeModuleMessage}
                    />
                    <UpdateProduct
                      id={product.id_product}
                      onUpdateProduct={updateProduct}
                      productData={product}
                    />
                    <DeleteGenericModal
                      id={product.id_product}
                      onDelete={deleteProduct}
                      token={token}
                      typeModule={typeModule}
                      typeModuleMessage={typeModuleMessage}
                    />
                  </span>
                </li>
              ))
            ) : (
              <div className="noResult">No hay productos disponibles</div>
            )}
          </ol>
        ) : (
          <ProductListTable
            product={filteredProductList}
            onUpdateProduct={updateProduct}
            onDelete={deleteProduct}
            isActive={activeProduct}
            typeModule={typeModule}
            typeModuleMessage={typeModuleMessage}
          />
        )}

      </section>
    </MainLayout>
  );
};
