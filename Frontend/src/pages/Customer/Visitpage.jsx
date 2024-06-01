import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { useEffect, useState } from 'react';
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

  const [isListView, setIsListView] = useState(() => window.innerWidth <= 960);

  useEffect(() => {
    const handleResize = () => {
      setIsListView(window.innerWidth <= 960);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filterOptions = [
    { label: 'Programada', value: 'scheduled' },
    { label: 'Cancelada', value: 'cancelled' },
    { label: 'Completada ', value: 'completed' },
  ];

  const sortOptions = [
    { label: 'Ref (DSC)', value: 'ref-desc' },
    { label: 'Ref (ASC)', value: 'ref-asc' },
    { label: 'Nombre (A - Z)', value: 'nombre-asc' },
    { label: 'Nombre (Z - A)', value: 'nombre-desc' },
    { label: 'Fecha (Antiguos)', value: 'fecha-asc' },
    { label: 'Fecha (Recientes)', value: 'fecha-desc' },
  ];

  const defaultSort =  { label: 'Ref (DSC)', value: 'ref-desc' }

  return (
    <MainLayout title="Visitas">
      <section id="visit_container" className=" mainContainer">
        <nav id="user_nav" className="mainNav">
          <SearchPages onSearch={handleSearch} />
          <CreateVisit onAddVisit={addVisit} token={token} />
          <FilterPages options={filterOptions} onChange={handleFilterChange} />
          <SortPages options={sortOptions} onSort={handleSortChange} defaultSort={defaultSort}/>
          <ToggleMode  onClick={() => setIsListView(prev => !prev)} isListView={isListView}  />
        </nav>
        {isListView ? (
          <ol id="visit_list" className="main_olist">
            {filteredVisitList.length > 0 ? (
              filteredVisitList.map((visit) => (
                <li
                  key={visit.id_visit}
                  id="element_visit_container"
                  className="main_ilist"
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
              ))
            ) : (
              <div className="noResult">No hay visitas disponibles</div>
            )}
          </ol>
        ) : (
          <VisitListTable
            visit={filteredVisitList}
            onUpdateVisit={updateVisit}
            onDelete={deleteVisit}
            token={token}
          />
        )}

      </section>
    </MainLayout>
  );
};
