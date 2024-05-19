import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { useState } from 'react';
import { CreateVisit } from '../../components/PagesComponents/Visits/CreateVisit.jsx';
import { VisitsList } from '../../components/PagesComponents/Visits/VisitList.jsx';
import { SearchPages } from '../../components/NavPages/SearchPages.jsx';
import { FilterPages } from '../../components/NavPages/FilterPages.jsx';
import { SortPages } from '../../components/NavPages/SortPages.jsx';
import { ToggleMode } from '../../components/NavPages/ToggleMode.jsx';
import { VisitListTable } from '../../components/PagesComponents/Visits/VisitListTable.jsx';
import { useVisitsList } from '../../hooks/PagesHooks/useVisitsList.js';

export const Visitpage = () => {
  const token = useUser();
  const {
    filteredVisitList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    addVisit,
    deleteVisit,
    updateVisit,
    typeModule,
    typeModuleMessage,
  } = useVisitsList(token);

  const [isListView, setIsListView] = useState(true);

  const filterOptions = [
    { label: 'Programada', value: 'scheduled' },
    { label: 'Cancelada', value: 'cancelled' },
    { label: 'Completada ', value: 'completed' },
  ];

  const sortOptions = [
    { label: 'Nombre (A - Z)', value: 'nombre-asc' },
    { label: 'Nombre (Z - A)', value: 'nombre-desc' },
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
  ];

  return (
    <MainLayout title="Visitas">
      <section id="visit_container" className=" mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateVisit onAddVisit={addVisit} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} />
          <ToggleMode onClick={() => setIsListView((prev) => !prev)} />
        </nav>
        {isListView ? (
        
          <ol id="visit_list" className="main_olist">
            {filteredVisitList.map((visit) => {
              return (
                <li
                  key={visit.id_visit}
                  id="element_visit_container"
                  className=" main_ilist"
                >
                  <VisitsList
                    visit={visit}
                    onDelete={deleteVisit}
                    onUpdateVisit={updateVisit}
                    typeModule={typeModule}
                    typeModuleMessage={typeModuleMessage}
                    token={token}
                  />
                </li>
              );
            })}
          </ol>
        ) : (
          <VisitListTable visit={filteredVisitList} onUpdateVisit={updateVisit} onDelete={deleteVisit} token={token} />
        )}
      </section>
    </MainLayout>
  );
};
