import { useState, useEffect } from 'react';
import Select from 'react-select';
import { CustomModal } from './CustomModal';
import { customStyles } from './customStyle.js';
import MenuConRetraso from './MenuConRetraso';
import { EyePassword } from '../buttons/Profile/EyePasword.jsx';
import './DynamicFormModal.css';

export const DynamicFormModal = ({title, fields, schema, onSubmit, buttonText, dynamicIdModal, show, onClose, initialValues = {}, resetFormValues, customModalSize, StyleAcceptBtn }) => {
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
      if (inputElement) {
        const underlineElement = inputElement.nextElementSibling;
        if (formValues[field.name]) {
          inputElement.classList.add('has-initial-value');
          if (underlineElement) underlineElement.classList.add('has-initial-value');
        }
        if (field.type === 'date') {
          updateDateInputState(inputElement);
          inputElement.addEventListener('change', () => updateDateInputState(inputElement));
          inputElement.addEventListener('blur', () => updateDateInputState(inputElement));
        }
        if (field.type === 'textarea') {
          adjustTextareaHeight(inputElement);
        }
        if (field.type === 'select') {
          inputElement.classList.add('no-selection');
        }
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
    const inputElement = e.target;
    const underlineElement = inputElement.nextElementSibling;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));

    if (inputElement) {
      inputElement.classList.remove('has-initial-value');
      if (underlineElement) underlineElement.classList.remove('has-initial-value');
    }

    if (e.target.type === 'date') {
      updateDateInputState(e.target);
    }

    if (e.target.tagName === 'TEXTAREA') {
      adjustTextareaHeight(e.target);
    }

    checkFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: selectedOption ? selectedOption.value : '',
    }));

    const selectElement = document.getElementById(`react-select-${name}-input`);
    if (selectElement) {
      if (selectedOption) {
        selectElement.classList.remove('no-selection', 'has-initial-value');
        selectElement.classList.add('has-selection');
      } else {
        selectElement.classList.remove('has-selection');
        selectElement.classList.add('no-selection');
      }
    }

    checkFormValues({ ...formValues, [name]: selectedOption ? selectedOption.value : '' });
  };

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = 'auto';
    const maxHeight = 5 * 20; // 5 lines * 20px per line height
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  };

  const checkFormValues = (newFormValues) => {
    const hasValues = Object.values(newFormValues).some(value => value && value.trim() !== '');
    setIsSubmitDisabled(!hasValues);
  };

  const handleSubmit = () => {
    const modifiedValues = {};
    fields.forEach(field => {
      const initialValue = initialValues[field.name] || '';
      const currentValue = formValues[field.name] || '';
      if (initialValue !== currentValue) {
        modifiedValues[field.name] = currentValue.trim();
      }
    });

    const validationResult = schema.validate(modifiedValues, { abortEarly: false });
    if (validationResult.error) {
      setValidationErrors(validationResult.error.details.map(detail => detail.message));
      setTimeout(() => {
        setValidationErrors([]);
      }, 5000);
      return;
    }
    onSubmit(modifiedValues);
    onClose();
    resetFormValues();
  };

  const handleCancel = () => {
    onClose();
    resetFormValues();
  };

  const handleFocus = (e) => {
    const inputElement = e.target;
    if (inputElement) {
      const underlineElement = inputElement.nextElementSibling;
      inputElement.classList.remove('has-initial-value');
      if (underlineElement) underlineElement.classList.remove('has-initial-value');
      if (inputElement.tagName === 'TEXTAREA') {
        adjustTextareaHeight(inputElement);
      }
    }
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
    handleFocus({ target: document.getElementById(`react-select-${name}-input`) });
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
                  onFocus={() => handleFocus({ target: document.getElementById(`react-select-${field.name}-input`) })}
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
            ) : field.type === 'password' ? (
              <div className="password-containerFrom">
                <input
                  id={field.idInput}
                  type="password"
                  name={field.name}
                  className={`inputText ${formValues[field.name] ? 'filled' : ''}`}
                  value={formValues[field.name] || ''}
                  onChange={handleInputChange}
                  required={field.required}
                  placeholder=""
                  autoComplete="off"
                  onFocus={handleFocus}
                />
                <label htmlFor={field.idInput} className="label">{field.label}</label>
                {field.eye && <EyePassword idInput={field.idInput} />}
                <div className="underline has-initial-value"></div>
              </div>
            ) : field.type === 'textarea' ? (
              <>
                <textarea
                  id={field.idInput}
                  name={field.name}
                  className={`inputText ${formValues[field.name] ? 'has-initial-value' : ''}`}
                  value={formValues[field.name] || ''}
                  onChange={handleInputChange}
                  required={field.required}
                  placeholder=""
                  onFocus={handleFocus}
                  rows="1"
                  style={{ overflow: 'hidden', resize: 'none' }}
                />
                <label htmlFor={field.idInput} className="label">
                  {field.label}
                </label>
                <div className="underline has-initial-value"></div>
              </>
            ) : (
              <>
                <input
                  id={field.idInput}
                  type={field.type}
                  name={field.name}
                  className={`inputText ${formValues[field.name] ? 'has-initial-value' : ''}`}
                  value={formValues[field.name] || ''}
                  onChange={handleInputChange}
                  required={field.required}
                  placeholder=""
                  autoComplete="off"
                  onFocus={handleFocus}
                />
                <label htmlFor={field.idInput} className="label">
                  {field.label}
                </label>
                <div className="underline has-initial-value"></div>
              </>
            )}
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
