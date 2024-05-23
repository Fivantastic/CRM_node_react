import Swal from 'sweetalert2';
import '../../Styles/Pages/DymanicsPopUps.css';

const DynamicFormPopUp = (title, fields, schema, onSubmit, buttonText, dynamicIdModal) => {
  // Crear un mapeo entre idInput y name
  const idToNameMap = {};
  fields.forEach(field => {
    idToNameMap[field.idInput] = field.name;
  });

  // Modifico la id el dynamicIdModal es null, para no generar conflictos
  if (!dynamicIdModal) {
    dynamicIdModal = 'dynamicFormModal';
  }

  const handleClickSubmit = async () => {
    const { value: formData } = await Swal.fire({
      title: title,
      html: `
        <form id=${dynamicIdModal} class="dynamicFromModal">
          ${generateFormHtml(fields)}
        </form>
      `,
      focusConfirm: false,
      preConfirm: async () => {
        const values = {};
        fields.forEach(field => {
          values[idToNameMap[field.idInput]] = document.getElementById(field.idInput).value;
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
      width: 'auto',
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
          const input = document.getElementById(field.idInput);
          if (input && field.defaultValue) {
            input.value = field.defaultValue;
          }
          if (field.type === 'select') {
            const selectElement = document.getElementById(field.idInput);
            selectElement.innerHTML = generateSelectOptions(field.options);
            selectElement.selectedIndex = -1;
            // Agregar clase al elemento select
            selectElement.classList.add('no-selection');
            // Agregar evento change al elemento select
            selectElement.addEventListener('change', function() {
              if (this.value !== "-1") {
                this.classList.remove('no-selection');
                this.classList.add('has-selection');
              } else {
                this.classList.remove('has-selection');
                this.classList.add('no-selection');
              }
            });
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
      <div id="${field.idInputContainer || ''}" class="input-container">
        <label for="${field.idInput}" id="${field.idLabel}" class="labelText">${field.label}</label>
        <input id="${field.idInput}" type="file" class="inputFile" onChange="${field.onChange}">
        <div class="underline"></div>
      </div>
      `;
    } else {
      return `
      <div id="${field.idInputContainer || ''}" class="input-container">
      <input id="${field.idInput}" type="${field.type}" class="inputText" required="${field.required}">
      <label for="${field.idInput}" id="${field.idLabel}" class="label labelText">${field.label}</label>
      <div class="underline"></div>
      </div>
      `;
    }
  };

  const generateSelectField = (field) => {
    return `
    <div id="${field.idInputContainer || ''}" class="input-container">
      <select id="${field.idInput}" class="inputSelect">
        ${generateSelectOptions(field.options)}
        </select>
      <label for="${field.idInput}" id="${field.idLabel}" class="labelSelect ">${field.label}</label>
      <div class="underline"></div>
    </div>
    `;
  };

  const generateSelectOptions = (options) => {
    let selectOptionsHtml = '';

    if (Array.isArray(options)) {
      options.forEach(option => {
        selectOptionsHtml += `<option value="${option.value}">${option.label}</option>`;
      });
    } else {
      for (const group in options) {
        if (Object.prototype.hasOwnProperty.call(options, group)) {
          selectOptionsHtml += `<optgroup label="${group}">`;
          const groupOptions = options[group];
          if (Array.isArray(groupOptions)) {
            groupOptions.forEach(option => {
              selectOptionsHtml += `<option value="${option.value}">${option.label}</option>`;
            });
          } else {
            for (const key in groupOptions) {
              if (Object.prototype.hasOwnProperty.call(groupOptions, key)) {
                selectOptionsHtml += `<option value="${key}">${groupOptions[key]}</option>`;
              }
            }
          }
          selectOptionsHtml += `</optgroup>`;
        }
      }
    }
    return selectOptionsHtml;
  };

  handleClickSubmit();
};

export default DynamicFormPopUp;
