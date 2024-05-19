import { MainLayout } from '../layout/MainLayout.jsx';
import { useUser } from '../context/authContext.jsx';
import { UserList } from '../components/PagesComponents/User/UserList.jsx';
import { CreateUser } from '../components/PagesComponents/User/CreateUser.jsx';
import { ToggleMode } from '../components/NavPages/ToggleMode.jsx';
import { SearchPages } from '../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../components/NavPages/FilterPages.jsx';
import { SortPages } from '../components/NavPages/SortPages.jsx';
import { UserListTable } from '../components/PagesComponents/User/UserListTable.jsx';
import { useUserList } from '../hooks/PagesHooks/useUserList.js';
import { useState } from 'react';

export const UserPage = () => {
  const token = useUser();
  // Importa el hook personalizado
  const {
    filteredUserList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addUser,
    deleteUser,
    activeUser
  } = useUserList(token); // Usa el hook personalizado
  const [isListView, setIsListView] = useState(true);

  // Opciones de filtro
  const filterOptions = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' },
    { label: 'Administrador', value: 'admin' },
    { label: 'Comercial', value: 'salesAgent' },
    { label: 'Repartidor', value: 'deliverer' },
  ];

  // Opciones de ordenamiento 
  const sortOptions = [
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
    { label: "Fecha (Antiguos)", value: "fecha-asc" },
    { label: "Fecha (Recientes)", value: "fecha-desc" },
    { label: "Rol (A - Z)", value: "rol-asc" },
    { label: "Rol (Z - A)", value: "rol-desc" },
  ];

  // Manejadores de eventos
  return (
    <MainLayout title="Usuarios">
      <section id="user_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateUser onAddUser={addUser} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} />
          <ToggleMode onClick={() => setIsListView(prev => !prev)} />
        </nav>
        {isListView ? (
          <ol id="user_list" className="main_olist">
            {filteredUserList.map(data => (
              <li key={data.id_user} id="element_user_container">
                <UserList user={data} id={data.id_user} activeUser={activeUser} onDelete={deleteUser} />
              </li>
            ))}
          </ol>
        ) : (
          <UserListTable user={filteredUserList} activeUser={activeUser} onDelete={deleteUser} />
        )}
      </section>
    </MainLayout>
  );
};
