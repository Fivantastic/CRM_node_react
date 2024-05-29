// src/components/PagesComponents/Sales/SalesExport.jsx

import { DynamicModalExcelWrapper } from "../../ExcelModal/DynamicModalExcelWrapper.jsx";



export const SalesExport = ({ tableName, token }) => {
    const nameButton = 'Exportar';
  
    const customModalSize = {
      idModalContainer: 'exportExcelContainerModal',
      idModalFooter: 'exportExcelFooterModal',
      idModalBtnClose: 'exportExcelBtnCloseModal',
      idAcceptBtn: 'exportExcelAcceptBtn',
    };
  
    const StyleAcceptBtn = {
      idAcceptBtn: 'btnAcceptExport',
      altImgBtn: 'icono exportar Excel',
      btnSvg: '/excelp.svg',
      altAcceptBtn: 'Boton exportar',
      action: 'create',
    };
  
    const exportFields = [
      {
        name: 'fields',
        label: 'Selecciona los campos a exportar',
        type: 'checkbox',
        options: [
          { label: 'Nombre', value: 'name' },
          { label: 'Email', value: 'email' },
          { label: 'Teléfono', value: 'phone' },
          // Agrega más opciones según los campos de tu tabla
        ],
      },
      {
        name: 'startDate',
        label: 'Fecha de inicio',
        type: 'date',
        required: false,
      },
      {
        name: 'endDate',
        label: 'Fecha de fin',
        type: 'date',
        required: false,
      },
    ];
  
    return (
      <DynamicModalExcelWrapper
        title="Exportar Datos a Excel"
        fields={exportFields}
        tableName={tableName}
        token={token}
        nameButton={nameButton}
        customModalSize={customModalSize}
        StyleAcceptBtn={StyleAcceptBtn}
      />
    );
  };