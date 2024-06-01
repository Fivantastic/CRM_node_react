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
import { useState, useEffect } from 'react';

export const UserPage = () => {
  const token = useUser();
  const {
    filteredUserList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addUser,
    deleteUser,
    activeUser
  } = useUserList(token);
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
    { label: 'Administrador', value: 'admin' },
    { label: 'Comercial', value: 'salesAgent' },
    { label: 'Repartidor', value: 'deliverer' },
  ];

  const sortOptions = [
    { label: "Nombre (A - Z)", value: "nombre-asc" },
    { label: "Nombre (Z - A)", value: "nombre-desc" },
    { label: "Ref (ASC)", value: "ref-asc" },
    { label: "Ref (DSC)", value: "ref-desc" },
  ];

  const defaultSort = { label: "Nombre (A - Z)", value: "nombre-asc" }

  return (
    <MainLayout title="Usuarios">
      <section id="user_container" className="mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateUser onAddUser={addUser} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} defaultSort={defaultSort} />
          <ToggleMode onClick={() => setIsListView(prev => !prev)} isListView={isListView} />
        </nav>
        {isListView ? (
          <ol id="user_list" className="main_olist">
            {filteredUserList.length > 0 ? (
              filteredUserList.map(data => (
                <li key={data.id_user} id="element_user_container">
                  <UserList user={data} id={data.id_user} activeUser={activeUser} onDelete={deleteUser} />
                </li>
              ))
            ) : (
              <div className="noResult">No hay usuarios disponibles</div>
            )}
          </ol>
        ) : (
          <UserListTable user={filteredUserList} activeUser={activeUser} onDelete={deleteUser} />
        )}

      </section>
    </MainLayout>
  );
};
