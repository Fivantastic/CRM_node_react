import { useState } from 'react';
import './ExportModal.css';

export const ExportModal = ({ show, onClose, onSubmit, onExport, isExportDisabled }) => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
    includeFields: {
      companyName: true,
      saleDate: true,
      status: true,
      totalAmount: true,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters((prev) => ({
        ...prev,
        includeFields: { ...prev.includeFields, [name]: checked },
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    onSubmit(filters);
  };

  if (!show) return null;

  return (
    <div className="export-modal-backdrop">
      <div className="export-modal-content">
        <h2>Filtrar y Exportar Ventas</h2>
        <div className="export-modal-body">
          <div className="form-group">
            <label>Fecha de Inicio</label>
            <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Fecha de Fin</label>
            <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <select name="status" value={filters.status} onChange={handleChange}>
              <option value="">Todos</option>
              <option value="open">Pendiente</option>
              <option value="processing">En proceso</option>
              <option value="cancelled">Cancelada</option>
              <option value="closed">Cerrada</option>
            </select>
          </div>
          <div className="form-group">
            <label>Campos a incluir</label>
            <div>
              <label>
                <input type="checkbox" name="companyName" checked={filters.includeFields.companyName} onChange={handleChange} />
                Nombre de la Empresa
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="saleDate" checked={filters.includeFields.saleDate} onChange={handleChange} />
                Fecha de Venta
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="status" checked={filters.includeFields.status} onChange={handleChange} />
                Estado
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="totalAmount" checked={filters.includeFields.totalAmount} onChange={handleChange} />
                Importe Total
              </label>
            </div>
          </div>
        </div>
        <div className="export-modal-footer">
          <button onClick={handleSubmit}>Filtrar</button>
          <button onClick={onExport} disabled={isExportDisabled}>Descargar Excel</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};
