import Swal from 'sweetalert2';
import './simpleEstilo.css';

const DynamicFormPopUp = (title, fields, schema, onSubmit, buttonText) => {
  const handleClickSubmit = async () => {
    const { value: formData } = await Swal.fire({
      title: title,
      html: generateFormHtml(fields),
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
      allowOutsideClick: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `${buttonText}`,
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
        html += `<label for="${field.name}">${field.label}</label>` +
          `<select id="${field.name}" class="swal2-select"></select>`;
      } else {
        html += `<label for="${field.name}">${field.label}</label>` +
          `<input id="${field.name}" type="${field.type}" class="swal2-input">`;
      }
    });
    return html;
  };

  const generateSelectOptions = (options) => {
    let selectOptionsHtml = '';
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
