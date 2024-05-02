import Joi from 'joi';
import { useParams } from 'react-router-dom'; 
import DynamicForm from '../components/forms/DynamicForm.jsx';

export const ResetPassword = () => {
    const { registration_code } = useParams();

    const handleResetPasswordSubmit = async (data) => {
        try {
            // Peticion al servidor para el login y peticion en cors de las cookies
            const response = await fetch(`http://localhost:3000/user/reset-password/${registration_code}`, { // Incluye el código de registro en la URL de la solicitud
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log('Contraseña cambiada con exito:', responseData);
                // redireccionar a la página principal
            } else {
                const errorData = await response.json();
                console.error('Restablecer contraseña a fallado:', errorData);
                // pops de error
            }
        } catch (error) {
            console.error('Error durante el login:', error);
            //pops de error
        }
    };
    const resetPasswordUserSchema = Joi.object({
        newPassword: Joi.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
            .required()
            .label('Nueva contraseña'),
        repeatPassword: Joi.string()
            .valid(Joi.ref('newPassword'))
            .required()
            .label('Repetir nueva contraseña'),
    });


    const resetPasswordFields = [
        { 
            name: 'newPassword', 
            label: 'Nueva contraseña', 
            type: 'password' 
        },
        { 
            name: 'repeatPassword', 
            label: 'Repetir nueva contraseña', 
            type: 'password' 
        },
    ];
    
    return (
        <div>
            <DynamicForm 
                title="Nueva contraseña"
                onSubmit={handleResetPasswordSubmit}
                schema={resetPasswordUserSchema}
                fields={resetPasswordFields}
                buttonText={'Restablecer contraseña'}
                extraButtons={[]}
            
            />
        </div>
    );
}
