import { useState, useEffect } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;

export const useProductList = (token) => {
  const [productList, setProductList] = useState([]);
  const [initialProductList, setInitialProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortProductOption, setSortProductOption] = useState(null);

  const typeModule = 'product';
  const typeModuleMessage = 'producto';

  useEffect(() => {
    getProductList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, productList]);

  useEffect(() => {
    if (filteredProductList.length > 0) {
      sortProducts(filteredProductList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortProductOption]);

  const getProductList = async () => {
    try {
      const response = await fetch(`${URL}/${typeModule}/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setProductList(responseData.data);
        setInitialProductList(responseData.data);
        setFilteredProductList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener la lista:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de producto:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de productos',
      });
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `${URL}/${typeModule}/search?searchTerm=${searchTerm}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setProductList(responseData.data);
        setFilteredProductList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Búsqueda fallida:', errorData);
      }
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortProductOption(option ? option.value : null);
    if (!option) {
      setFilteredProductList([...initialProductList]);
    }
  };

  const applyFilters = () => {
    let filtered = productList;
  
    if (selectedFilters.length > 0) {
      filtered = productList.filter((product) => {
        let activeFilter = true;
  
        if (selectedFilters.includes('1') && selectedFilters.includes('0')) {
          activeFilter = true; // Muestra tanto activos como inactivos
        } else if (selectedFilters.includes('1')) {
          activeFilter = product.active;
        } else if (selectedFilters.includes('0')) {
          activeFilter = !product.active;
        }
  
        return activeFilter;
      });
    }
  
    setFilteredProductList(filtered);
    sortProducts(filtered);
  };
  

  const sortProducts = (list) => {
    if (!sortProductOption) {
      setFilteredProductList(list);
      return;
    }

    let sortedList = [...list];

    switch (sortProductOption) {
      case 'nombre-asc':
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nombre-desc':
        sortedList.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'fecha-asc':
        sortedList.sort((a, b) => a.creation_at.localeCompare(b.creation_at));
        break;
      case 'fecha-desc':
        sortedList.sort((a, b) => b.creation_at.localeCompare(a.creation_at));
        break;
      case 'ref-asc':
          sortedList.sort((a, b) => a.ref_PR.localeCompare(b.ref_PR));
        break;
      case 'ref-desc':
        sortedList.sort((a, b) => b.ref_PR.localeCompare(a.ref_PR));
        break;
      default:
        break;
    }

    setFilteredProductList(sortedList);
  };

  const addProduct = async () => {
    try {
      await getProductList();
    } catch (error) {
      console.error('Error al agregar un producto:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al agregar un producto',
      });
    }
  };

  const deleteProduct = async (id_product) => {
    try {
      setProductList(prevProduct => prevProduct.filter(product => product.id_product !== id_product));
      await getProductList();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar el producto',
      });
    }
  };

  const updateProduct = async (updatedProduct) => {
    // Update the product locally
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id_product === updatedProduct.id_product ? { ...product, ...updatedProduct } : product
      )
    );
    
    setFilteredProductList((prevList) =>
      prevList.map((product) =>
        product.id_product === updatedProduct.id_product ? { ...product, ...updatedProduct }  : product
      )
    );

    // Fetch the product list again to ensure consistency
    await getProductList();
  };

  const activeProduct = (id_product) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id_product === id_product
          ? { ...product, active: !product.active }
          : product
      )
    );
    setFilteredProductList((prevList) =>
      prevList.map((product) =>
        product.id_product === id_product
          ? { ...product, active: !product.active }
          : product
      )
    );
  };

  return {
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
  };
};
