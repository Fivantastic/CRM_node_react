import Joi from 'joi';
import GenericForm from './GenericForm';

function UserForm({ onSubmit }) {

    // ===================================================================================================

    // Le pasamos un schema de Joi

  const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().label('Username'),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().label('Password'),
  });

  // =====================================================================================================

    // Le pasamos los campos que queremos
  // const fields = [ // Para un login
  //   { name: 'username', type: 'text', placeholder: 'Introduce tu usuario...' },
  //   { name: 'password', type: 'password', placeholder: 'Introduce tu contraseña...' },
  // ];

const fields = [ // Para una venta
    { name: 'producto', label: 'Producto', type: 'text', placeholder: 'Ingrese el nombre del producto' },
    { name: 'cantidad', label: 'Cantidad', type: 'number', placeholder: 'Ingrese la cantidad' },
    { name: 'fecha', label: 'Fecha', type: 'date' },
    { name: 'cliente', label: 'Cliente', type: 'text', placeholder: 'Ingrese el nombre del cliente' },
  ];

// const fields = [ // Para un cliente
//     { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Ingrese el nombre del cliente' },
//     { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'Ingrese el correo electrónico del cliente' },
//     { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: 'Ingrese el número de teléfono del cliente' },
//     { name: 'direccion', label: 'Dirección', type: 'text', placeholder: 'Ingrese la dirección del cliente' },
//     { name: 'fotoPerfil', label: 'Foto de Perfil', type: 'file' },
//   ];

  // ======================================================================================================

  return (

    // Utilizamos el componente que hemos creado

    <GenericForm
      title="Form Cliente"
      schema={userSchema}
      onSubmit={onSubmit}
      fields={fields}
    />
  );
}

export { UserForm };
