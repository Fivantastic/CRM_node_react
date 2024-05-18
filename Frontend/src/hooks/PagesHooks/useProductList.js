import { useState, useEffect } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;

export const useProductList = (token) => {
  const [productList, setProductList] = useState([]);
  const [initialProductList, setInitialProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortProductOption, setSortProductOption] = useState(null);

  // Tipo de modulo para que la ruta URL de la petición  sea dinámica
  const typeModule = 'product';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'producto';

  // useEffect para obtener la lista de Productos
  useEffect(() => {
    getProductList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // useEffect para aplicar los filtros
  useEffect(() => {
    applyFilters();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, productList]);

  // useEffect para aplicar el ordenamiento
  useEffect(() => {
    if (filteredProductList.length > 0) {
      sortProducts(filteredProductList);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortProductOption]);

  //Función para obtener la lista de productos
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
        console.log('Product List:', responseData.data); // VER ERRR
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

  // Función para buscar productos
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
        console.log('Search', filteredProductList);
      } else {
        const errorData = await response.json();
        console.error('Búsqueda fallida:', errorData);
      }
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  // Función para cambiar los filtros
  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  // Función para cambiar el ordenamiento
  const handleSortChange = (option) => {
    console.log('Sort option change:', option); // VER ERRR
    setSortProductOption(option ? option.value : null);
    if (!option) {
      setFilteredProductList([...initialProductList]);
    }
  };

  // Función para aplicar los filtros
  const applyFilters = () => {
    let filtered = productList;

    if (selectedFilters.length > 0) {
      filtered = productList.filter((product) => {
        let activeFilter = true;

        if (selectedFilters.includes('active')) {
          activeFilter = product.product_status === 'active';
        } else if (selectedFilters.includes('inactive')) {
          activeFilter = product.product_status === 'inactive';
        }

        return activeFilter;
      });
    }

    setFilteredProductList(filtered);
    sortProducts(filtered);
  };

  // Función para ordenar la lista de productos
  const sortProducts = (list) => {
    if (!sortProductOption) {
      setFilteredProductList(list);
      return;
    }

    let sortedList = [...list];
    console.log('Before Sorting:', sortedList); //VER ERRR

    switch (sortProductOption) {
      case 'nombre-asc':
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nombre-desc':
        sortedList.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'fecha-asc':
        sortedList.sort((a, b) => {
          console.log('Comparing Dates ASC:', a.creation_at, b.creation_at); // VER ERRR
          return new Date(a.creation_at) - new Date(b.creation_at);
        });
        break;
      case 'fecha-desc':
        sortedList.sort((a, b) => {
          console.log('Comparing Dates DESC:', a.creation_at, b.creation_at); // VER ERRR
          return new Date(b.creation_at) - new Date(a.creation_at);
        });
        break;
      default:
        break;
    }
    console.log('After Sorting:', sortedList); // VER ERRR
    setFilteredProductList(sortedList);
  };

  const addProduct = async () => {
    try {
      await getProductList();
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al agregar el producto',
      });
    }
  };

  const deleteProduct = async (id_product) => {
    try {
      setProductList((prevUser) =>
        prevUser.filter((product) => product.id_product !== id_product)
      );
      await getProductList();
    } catch (error) {
      console.error('Error al eliminar el producto', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar el producto',
      });
    }
  };

  // Actualizo el estado con la ventana eliminada
  const updateProduct = async (id_product) => {
    try {
      setProductList((prevProduct) =>
        prevProduct.filter((product) => product.id_product !== id_product)
      );
      await getProductList();
    } catch (error) {
      console.error('Error al actualizar la ventana:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar la ventana',
      });
    }
  };

  // Retorna los Hooks
  return {
    filteredProductList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addProduct,
    deleteProduct,
    updateProduct,
    typeModule,
    typeModuleMessage,
  };
};
