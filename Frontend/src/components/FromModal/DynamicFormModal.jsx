import { useState, useEffect } from 'react';
import Select from 'react-select';
import { CustomModal } from './CustomModal';
import { customStyles } from './customStyle.js';
import MenuConRetraso from './MenuConRetraso'; // Importa el componente de menú personalizado
import './DynamicFormModal.css';

export const DynamicFormModal = ({ title, fields, schema, onSubmit, buttonText, dynamicIdModal, show, onClose, initialValues = {}, resetFormValues, customModalSize, StyleAcceptBtn }) => {
  const initializeFormValues = () => {
    const initialFormValues = {};
    fields.forEach(field => {
      initialFormValues[field.name] = initialValues[field.name] || '';
    });
    return initialFormValues;
  };

  const [formValues, setFormValues] = useState(initializeFormValues);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    setFormValues(initializeFormValues());
    setIsSubmitDisabled(true);

    fields.forEach(field => {
      const inputElement = document.getElementById(field.idInput);
      if (field.type === 'date' && inputElement) {
        updateDateInputState(inputElement);
        inputElement.addEventListener('change', () => updateDateInputState(inputElement));
        inputElement.addEventListener('blur', () => updateDateInputState(inputElement));
      }
      if (field.type === 'select' && inputElement) {
        inputElement.classList.add('no-selection');
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, fields]);

  const updateDateInputState = (input) => {
    if (input.value) {
      input.classList.add('has-content');
    } else {
      input.classList.remove('has-content');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (e.target.type === 'date') {
      updateDateInputState(e.target);
    }

    checkFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormValues({
      ...formValues,
      [name]: selectedOption ? selectedOption.value : '',
    });

    const selectElement = document.getElementById(`react-select-${name}-input`);
    if (selectElement) {
      if (selectedOption) {
        selectElement.classList.remove('no-selection');
        selectElement.classList.add('has-selection');
      } else {
        selectElement.classList.remove('has-selection');
        selectElement.classList.add('no-selection');
      }
    }

    checkFormValues({ ...formValues, [name]: selectedOption ? selectedOption.value : '' });
  };

  const checkFormValues = (newFormValues) => {
    const hasValues = Object.values(newFormValues).some(value => value && value.trim() !== '');
    setIsSubmitDisabled(!hasValues);
  };

  const handleSubmit = () => {
    const filteredValues = {};
    fields.forEach(field => {
      const value = formValues[field.name];
      if (field.required || value.trim() !== '') {
        filteredValues[field.name] = value.trim();
      }
    });

    const validationResult = schema.validate(filteredValues, { abortEarly: false });
    if (validationResult.error) {
      setValidationErrors(validationResult.error.details.map(detail => detail.message));
      setTimeout(() => {
        setValidationErrors([]);
      }, 5000);
      return;
    }
    onSubmit(filteredValues);
    onClose();
    resetFormValues();
  };

  const handleCancel = () => {
    onClose();
    resetFormValues();
  };

  const handleFocus = (name) => {
    const labelElement = document.querySelector(`#react-select-${name}-input ~ .labelSelect`);
    const underlineElement = document.querySelector(`#react-select-${name}-input ~ .underline`);
    if (labelElement) labelElement.classList.add('has-focus');
    if (underlineElement) underlineElement.classList.add('has-focus');
  };

  const handleBlur = (name) => {
    const labelElement = document.querySelector(`#react-select-${name}-input ~ .labelSelect`);
    const underlineElement = document.querySelector(`#react-select-${name}-input ~ .underline`);
    if (labelElement) labelElement.classList.remove('has-focus');
    if (underlineElement) underlineElement.classList.remove('has-focus');
  };

  const handleMenuClose = (name) => {
    const selectElement = document.getElementById(`react-select-${name}-input`);
    if (selectElement) {
      selectElement.blur();
    }
    handleBlur(name);
  };

  const handleMenuOpen = (name) => {
    handleFocus(name);
  };

  const hasRequiredFields = fields.some(field => field.required);

  return (
    <CustomModal 
      show={show} 
      onClose={handleCancel} 
      onSubmit={handleSubmit} 
      buttonText={buttonText} 
      isSubmitDisabled={isSubmitDisabled} 
      customModalSize={customModalSize} 
      StyleAcceptBtn={StyleAcceptBtn}
    >
      <h2>{title}</h2>
      <form id={dynamicIdModal} className="dynamicCustomFromModal">
        {fields.map((field, index) => (
          <div key={index} className="input-container" id={field.idInputContainer || ''}>
            {field.type === 'select' ? (
              <>
                <Select
                  id={`react-select-${field.name}-input`}
                  name={field.name}
                  className="inputSelect no-selection"
                  value={field.options[Object.keys(field.options)[0]].find(option => option.value === formValues[field.name])}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, field.name)}
                  options={Object.keys(field.options).map(group => ({
                    label: group,
                    options: field.options[group],
                  }))}
                  isClearable
                  placeholder=""
                  styles={customStyles}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={() => handleBlur(field.name)}
                  onMenuClose={() => handleMenuClose(field.name)}
                  onMenuOpen={() => handleMenuOpen(field.name)}
                  components={{ Menu: MenuConRetraso }} // Utiliza el componente de menú personalizado
                  noOptionsMessage={() => 'No hay opciones disponibles'}
                />
                <label htmlFor={`react-select-${field.name}-input`} className="labelSelect">
                  {field.label}
                </label>
              </>
            ) : (
              <>
                <input
                  id={field.idInput}
                  type={field.type}
                  name={field.name}
                  className="inputText"
                  value={formValues[field.name] || ''}
                  onChange={handleInputChange}
                  required={field.required}
                  placeholder=""
                  autoComplete='off'
                />
                <label htmlFor={field.idInput} className="label">
                  {field.label}
                </label>
              </>
            )}
            <div className="underline"></div>
          </div>
        ))}
        {hasRequiredFields ? <p className="info-text">* Campos obligatorios</p> : <p className="info-text">Modifica el campo que necesites</p>}
        {validationErrors.length > 0 && (
          <ul className="validation-errors">
            {validationErrors.map((error, index) => (
              <li key={index} className="validation-error-item">{error}</li>
            ))}
          </ul>
        )}
      </form>
    </CustomModal>
  );
};
