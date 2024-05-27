import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { CustomCheckbox } from '../checkbox/CustomCheckbox.jsx';
import { EyePassword } from '../buttons/Profile/EyePasword.jsx';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function DynamicForm({ title, imgTitle, imgTitleActive, idCustom, onSubmit, schema, fields, buttonText, extraButtons }) {
  const { register, handleSubmit, formState: { errors, isSubmitted }, setValue } = useForm({
    resolver: joiResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const [fieldValues, setFieldValues] = useState({});
  const [visibleErrors, setVisibleErrors] = useState({});

  const handleFieldChange = (fieldName, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value
    }));
    setValue(fieldName, value);
  };

  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      setVisibleErrors(errors);
      const timer = setTimeout(() => {
        setVisibleErrors({});
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors, isSubmitted]);

  return (
    <main className="outsideContainerForm">
      <section id={idCustom.idSection || ''} className="insideContainerForm">
        <div id={idCustom.idTitleContainer || ''} className="titleContainerForm">
          {imgTitleActive === 'true' ? (
            <img id={idCustom.idLogo || ''} className="imgTitleForm" src={imgTitle} alt="Logo Cosmic" />
          ) : (
            <legend className="titleLegendForm">{title}</legend>
          )}
          <p id={idCustom.idSubTitle || ''} className="subTitleForm">{idCustom.subTitle}</p>
        </div>
        <form id={idCustom.idFrom || ''} className="submitForm" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div id={field.idInputContainer || ''} className="input-container-login" key={index}>
              {field.type === 'textWithLink' ? (
                <p id={field.id || ''} className="textWithLinkParag">
                  {field.text}{' '}
                  <NavLink 
                  to={field.link}
                  id={field.idLink || ''} 
                  className="linkFrom" >
                  {field.linkText}
                  </NavLink>
                </p>
              ) : field.type === 'select' ? (
                <>
                  <select id={field.name} className="inputSelect" {...register(field.name)}>
                    {field.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor={field.name} id={field.idLabel} className="labelSelect">{field.label}</label>
                  <div className="underline"></div>
                </>
              ) : field.type === 'checkbox' ? (
                <CustomCheckbox
                  field={field}
                  register={register}
                />
              ) : field.type === 'password' ? (
                <div className="password-container">
                  <input
                    id={field.idInput}
                    type="password"
                    className={`inputText-login ${fieldValues[field.name] ? 'filled' : ''}`}
                    {...register(field.name)}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  />
                  <label htmlFor={field.idInput} id={field.idLabel} className="label-login">{field.label}</label>
                  <EyePassword idInput={field.idInput} />
                  <div className="underline-login"></div>
                </div>
              ) : (
                <>
                  <input
                    id={field.idInput}
                    type={field.type}
                    className={`inputText-login ${fieldValues[field.name] ? 'filled' : ''}`}
                    {...register(field.name)}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  />
                  <label htmlFor={field.idInput} id={field.idLabel} className="label-login">{field.label}</label>
                  <div className="underline-login"></div>
                </>
              )}
              {field.help && <p className="help-text-form">{field.help}</p>}
              {visibleErrors[field.name] && <p className="error-message-form">{visibleErrors[field.name]?.message}</p>}
            </div>
          ))}
          <nav id={idCustom.idNavLogin || ''} className="button-container-form">
            {extraButtons.map((button, index) => {
              if (button.type === 'submit') {
                return <button id='submitBtnLoginExtra' className='submitMainBtnExtra' key={index} type="submit">{button.label}</button>;
              } else if (button.type === 'reset') {
                return <button id='resetBtnLogin' className='resetMainBtn' key={index} type="reset">{button.label}</button>;
              } else {
                return <button id='extraBtnLogin' className='extraMainBtn' key={index} type="button" onClick={button.onClick}>{button.label}</button>;
              }
            })}
            <button id={idCustom.submitBtn || ''} className='submitMainBtn' type="submit">{buttonText}</button>
          </nav>
        </form>
      </section>
    </main>
  );
}

export default DynamicForm;
