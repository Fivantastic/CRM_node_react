import Joi from 'joi';
import Swal from 'sweetalert2';
import { useSetUser } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import DynamicForm from '../../components/forms/DynamicForm.jsx';
import { getUserDataFromToken } from '../../Services/GetUserDataToken.js';
import { getFullName } from '../../Services/getFullName.js';
import '../../Styles/Auth/LoginPage.css';

const URL = import.meta.env.VITE_URL;

export const LoginPage = () => {
    const navigate = useNavigate();
    const setUser = useSetUser();

    const handleLoginSubmit = async (data) => {
        console.log(data);
        try {
            const response = await fetch(`${URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Login satisfactorio:', responseData.message);

                const newToken = responseData.token;
                const { name, lastName } = getUserDataFromToken(newToken);
                setUser(newToken);

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                        navigate('/home');
                    },
                });

                Toast.fire({
                    icon: 'success',
                    title: 'Bienvenido a Cosmic, ' + getFullName(name, lastName) + '.',
                });
            } else {
                const errorData = await response.json();
                console.error('Login fallido:', errorData);

                if (errorData.code === 'ACCOUNT_INACTIVE_CRM_ERROR') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Usuario inactivo',
                        text: 'Verifica tu correo electronico para activar tu cuenta',
                    });
                }

                if (errorData.code === 'INVALID_PASSWORD_CRM_ERROR') {
                    Swal.fire({
                        icon: 'error',
                        title: '¡Contraseña incorrecta!',
                    });
                    document.getElementById('password').value = '';
                }
            }
        } catch (error) {
            console.error('Error durante el login:', error);
        }
    };

    const loginUserSchema = Joi.object({
        email: Joi.string().email({ tlds: false }).required().label('Email'),
        password: Joi.string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
            .required()
            .label('Password'),
        remember: Joi.boolean().optional().label('Remember'),
    });

    const loginFormFields = [
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            idInputContainer: 'emailContainer',
            idInput: 'emailLogin',
            required: true,
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            idInputContainer: 'passwordContainer',
            idInput: 'passwordLogin',
            required: true,
        },
        {
            name: 'remember',
            label: 'Remember me',
            type: 'checkbox',
            idInputContainer: 'rememberContainer',
            idLabel: 'rememberLabel',
            idInput: 'rememberInput',
            required: false, // No obligatorio
        },
        {
            type: 'textWithLink',
            linkText: 'Forgot Password',
            idInputContainer: 'forgotPasswordContainer',
            idLink: 'forgotPassword',
            link: 'http://localhost:5173/forgot-password',
        }
    ];

    const idFormLogin = {
        idTitleContainer: 'idTitleContainer',
        idLogo: 'idLogoLogin',
        idSection: 'sectionLogin',
        idFrom: 'idFormLogin',
        subTitle: "Welcome back! Please login to your account.",
        idNavLogin: "idNavLogin",
        submitBtn: "submitBtnLogin",
    }

    return (
        <main className="login-page-container">
            <section className="login-page-animation-container">
                <img className="login-page-image" src="./Mesa_de_trabajo_1.png" alt="imagen de login" />
            </section>
            <section className="login-page-form-container">
                <DynamicForm
                    title="Login"
                    imgTitle="./Logo_cosmic.svg"
                    imgTitleActive='true'
                    idCustom={idFormLogin}
                    onSubmit={handleLoginSubmit}
                    schema={loginUserSchema}
                    fields={loginFormFields}
                    buttonText={'Login'}
                    extraButtons={[]}
                />
            </section>
        </main>
    );
};
