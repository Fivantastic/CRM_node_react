import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './simpleEstilo.css';

function DynamicForm({ title, onSubmit, schema, fields, buttonText, extraButtons }) {
    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({

      // Función que utiliza Joi para validar los campos 
      resolver: async data => {
        try {
          const values = await schema.validateAsync(data);
          return { 
              values, 
              errors: {} 
          };
        } catch (error) {
          return {
            values: {},
            errors: error.details.reduce((acc, curr) => {
              acc[curr.context.key] = { message: curr.message };
              return acc;
            }, {})
          };
        }
      }
  });

    // Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);

    // Obtener todos los campos del formulario
    const watchedFields = watch();

    // Verificar si todos los campos tienen datos
    const allFieldsFilled = Object.values(watchedFields).every(value => value !== "");

    return (
        <div className="dynamic-form">
            <main className="container"> 
                <h1>{title}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((field, index) => (
                        <div key={index}> {/* Usamos el índice como clave única */}
                            {field.type === 'textWithLink' ? (
                                <p>
                                    {field.text}{' '}
                                    <a href={field.link}>{field.linkText || 'Link'}</a>
                                </p>
                            ) : (
                                <>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    {field.type === 'select' ? (
                                        <select
                                            id={field.name}
                                            {...register(field.name, {
                                                required: field.required
                                            })}
                                        >
                                            {field.options.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.type === 'textarea' ? (
                                        <textarea
                                            id={field.name}
                                            className="textarea"
                                            placeholder={field.placeholder}
                                            {...register(field.name, {
                                                required: field.required,
                                                minLength: field.minLength,
                                                maxLength: field.maxLength
                                            })}
                                        />
                                    ) : field.type === 'checkbox' ? (
                                        <input
                                            id={field.name}
                                            className={`input ${errors[field.name] ? 'error' : ''}`}
                                            type="checkbox"
                                            {...register(field.name)}
                                        />
                                    ) : field.type === 'radio' ? (
                                        <input
                                            id={field.name}
                                            className={`input ${errors[field.name] ? 'error' : ''}`}
                                            type="radio"
                                            value={field.value}
                                            {...register(field.name, {
                                                required: field.required
                                            })}
                                        />
                                    ) : field.type === 'password' ? (
                                        <div className="password-input-wrapper">
                                            <input
                                                id={field.name}
                                                className={`input ${errors[field.name] ? 'error' : ''}`}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder={field.placeholder}
                                                {...register(field.name, {
                                                    required: field.required,
                                                    minLength: field.minLength,
                                                    maxLength: field.maxLength
                                                })}
                                            />
                                            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </button>
                                        </div>
                                    ) : (
                                        <input
                                            id={field.name}
                                            className={`input ${errors[field.name] ? 'error' : ''}`}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            {...register(field.name, {
                                                required: field.required,
                                                minLength: field.minLength,
                                                maxLength: field.maxLength
                                            })}
                                        />
                                    )}
                                    {field.help && <p className="help-text">{field.help}</p>}
                                    {errors[field.name] && <p className="error-message">{errors[field.name]?.message}</p>}
                                </>
                            )}
                        </div>
                    ))}

                    <div className="button-container">
                        {extraButtons.map((button, index) => (
                            <button key={index} type={button.type} onClick={button.onClick}>{button.label}</button>
                        ))}
                        <button type="submit" disabled={!isValid || !allFieldsFilled}>{buttonText}</button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default DynamicForm;
