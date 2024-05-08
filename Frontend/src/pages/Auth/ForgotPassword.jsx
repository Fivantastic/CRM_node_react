import Joi from 'joi';
import DynamicForm from '../../components/forms/DynamicForm.jsx';

export const ForgotPassword = () => {

    const handleForgotPasswordSubmit = async (data) => {
        try {
            //Peticion para cambiar el codigo de registro en la base de datos, y enviarte un email con el enlace para cambiar la contraseña
            const response = await fetch('http://localhost:3000/user/forgot-password-request', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Correo enviado:', responseData);
            } else {
                const errorData = await response.json();
                console.error('Error al enviar el correo:', errorData);
            }
            
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    };

        const forgotPasswordUserSchema = Joi.object({
            email: Joi.string().email({ tlds: false }).required().label('Email'),
          });

        const forgotPasswordFormFields = [
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            placeholder: 'Introduce tu email...',
            required: true,
        }
        ];


    return (
        <div>
            <DynamicForm
                title="Recuperar contraseña"
                onSubmit={handleForgotPasswordSubmit}
                schema={forgotPasswordUserSchema}
                fields={forgotPasswordFormFields}
                buttonText="Recuperar contraseña"
                extraButtons={[]}
            />
        </div>
    );
  };