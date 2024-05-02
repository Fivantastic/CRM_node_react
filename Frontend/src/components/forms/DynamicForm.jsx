// import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import './simpleEstilo.css';

function DynamicForm({ title, onSubmit, schema, fields, buttonText }) {
    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({

      //? Función que utiliza Joi para validar los campos 
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

    // Obtener todos los campos del formulario
    const watchedFields = watch();

    // Verificar si todos los campos tienen datos
    const allFieldsFilled = Object.values(watchedFields).every(value => value !== "");

    return (
        <div className="dynamic-form">
            <main className="container"> 
                <h1>{title}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map(field => (
                        <div key={field.name}>
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
                        </div>
                    ))}
                    <button type="submit" disabled={!isValid || !allFieldsFilled}>{buttonText}</button>
                </form>
            </main>
        </div>
    );
}

export default DynamicForm;


