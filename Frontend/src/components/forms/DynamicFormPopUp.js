import Swal from 'sweetalert2';
import '../../Styles/Pages/DymanicsPopUps.css'


const DynamicFormPopUp = (title, fields, schema, onSubmit, buttonText) => {
  const handleClickSubmit = async () => {
    const { value: formData } = await Swal.fire({
      title: title,
      html: `
        <form class="dynamicFromModal">
          ${generateFormHtml(fields)}
        </form>
      `,
      focusConfirm: false,
      preConfirm: async () => {
        const values = {};
        fields.forEach(field => {
          values[field.name] = document.getElementById(field.name).value;
        });

        // Validar los datos con el esquema
        const validationResult = schema.validate(values);
        if (validationResult.error) {
          // Mostrar mensaje de error si la validación falla
          Swal.showValidationMessage(validationResult.error.message);
          return false;
        }

        return values;
      },
      width: '400px',
      focusCancel: true,
      allowOutsideClick: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `${buttonText}`,
      buttonsStyling: false, 
      customClass: {
        confirmButton: 'customConfirmBtnClass',
        cancelButton: 'customCancelBtnClass'
      },
      willOpen: () => {
        fields.forEach(field => {
          const input = document.getElementById(field.name);
          if (input && field.defaultValue) {
            input.value = field.defaultValue;
          }
          if (field.type === 'select') {
            const selectElement = document.getElementById(field.name);
            selectElement.innerHTML = generateSelectOptions(field.options);
          }
        });
      }
    });

    if (formData) {
      onSubmit(formData);
    }
  };

  const generateFormHtml = (fields) => {
    let html = '';
    fields.forEach(field => {
      if (field.type === 'select') {
        html += generateSelectField(field);
      } else {
        html += generateRegularField(field);
      }
    });
    return html;
  };
  
  const generateRegularField = (field) => {
    if (field.type === 'file') {
      return `
        <label for="${field.name}" id="${field.idLabel}" class="labelText">${field.label}</label>
        <input id="${field.name}" type="file" class="inputFile" onChange="${field.onChange}">
      `;
    } else {
      return `
      <div class="input-container">
      <input id="${field.name}" type="${field.type}" class="inputText" required="">
      <label for="${field.name}" id="${field.idLabel}" class="label labelText">${field.label}</label>
      <div class="underline"></div>
      </div>
      `;
    }
  };
  
  
  const generateSelectField = (field) => {
    return `
    <div class="input-container">
      <select id="${field.name}" class="inputSelect">
      ${generateSelectOptions(field.options)}
      </select>
      <label for="${field.name}" id="${field.idLabel}" class="labelSelect ">${field.label}</label>
      <div class="underline"></div>
    </div>
    `;
  };
  
  const generateSelectOptions = (options) => {
    let selectOptionsHtml = '<option value=""></option>'; 
  
    if (options) {
      for (const group in options) {
        if (Object.prototype.hasOwnProperty.call(options, group)) {
          if (group !== '') {
            selectOptionsHtml += `<optgroup label="${group}">`;
          }
          const groupOptions = options[group];
          if (groupOptions) {
            for (const key in groupOptions) {
              if (Object.prototype.hasOwnProperty.call(groupOptions, key)) {
                selectOptionsHtml += `<option value="${key}">${groupOptions[key]}</option>`;
              }
            }
          }
          if (group !== '') {
            selectOptionsHtml += `</optgroup>`;
          }
        }
      }
    }
    return selectOptionsHtml;
  };
  
  
  

  handleClickSubmit();
};

export default DynamicFormPopUp;
