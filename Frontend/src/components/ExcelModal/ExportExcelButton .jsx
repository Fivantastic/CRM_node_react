import  { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { ExportModal } from './ExportModal';

const ExportExcelButton = ({ salesList, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (getData) {
      const fetchData = async () => {
        const data = await getData();
        setFilteredData(data || []);
      };
      fetchData();
    } else {
      setFilteredData(salesList || []);
    }
  }, [getData, salesList]);

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales");
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sales.xlsx');
  };

  const handleFilterSubmit = (filters) => {
    const { startDate, endDate, status, includeFields } = filters;
    const filtered = salesList.filter(sale => {
      const saleDate = new Date(sale.create_at);
      const startMatch = startDate ? saleDate >= new Date(startDate) : true;
      const endMatch = endDate ? saleDate <= new Date(endDate) : true;
      const statusMatch = status ? sale.operation_status === status : true;
      return startMatch && endMatch && statusMatch;
    }).map(sale => {
      const filteredSale = {};
      if (includeFields.companyName) filteredSale.companyName = sale.company_name;
      if (includeFields.saleDate) filteredSale.saleDate = sale.create_at;
      if (includeFields.status) filteredSale.status = sale.operation_status;
      if (includeFields.totalAmount) filteredSale.totalAmount = sale.total_amount;
      return filteredSale;
    });
    setFilteredData(filtered);
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Excel</button>
      <ExportModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleFilterSubmit}
        onExport={handleExport}
        isExportDisabled={filteredData.length === 0}
      />
    </>
  );
};

export default ExportExcelButton;
