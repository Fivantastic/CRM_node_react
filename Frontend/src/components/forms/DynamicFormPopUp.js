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
      html += `<label for="${field.name}">${field.label}</label>` +
        `<input id="${field.name}" type="${field.type}" class="swal2-input">`;
    });
    return html;
  };

  handleClickSubmit();
};

export default DynamicFormPopUp;
