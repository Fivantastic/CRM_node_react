import { useForm } from 'react-hook-form';

function GenericForm({ title, schema, onSubmit, fields }) {
 
    /// ? ⬆⬆⬆⬆ ¿Que estamos recibiendo en la función? ⬆⬆⬆⬆

    /// ! TITLE: Da un título (elemento <h1>) al formulario
    /// ! SCHEMA: El esquema de validación específico de cada formulario
    /// ! onSubmit: Función lanzada al enviar, será probablemente un POST con los datos (no siempre)
    /// ! FIELDS: Los campos (inputs) que queremos en este formulario


  const { register, handleSubmit, formState } = useForm({

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

  // Variables del hook de react 'FormState' que permiten controlar el estado del formulario
  const { errors, isValid } = formState;

  return (

    // Componente del formulario en sí

    <div>
      <h1>{title}</h1>

      {/* 
        //? 'fields' es un objeto que incluye los inputs que queremos añadir.
           La función map hace que por cada elemento (en este caso, cada field (campo)) obtenga el 
           field.name, field.type... etc y lo asigne al lugar correspondiente
      */}
      <form onSubmit={handleSubmit(onSubmit)} > {/*//? la función onSubmit inicia la lógica de envío que le demos*/}
        {fields.map(field => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              className="input"
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name)}
            />
            <p>{errors[field.name]?.message}</p>
          </div>
        ))}
        <button type="submit" disabled={!isValid} >Submit</button>
      </form>
    </div>
  );
}

export default GenericForm;
