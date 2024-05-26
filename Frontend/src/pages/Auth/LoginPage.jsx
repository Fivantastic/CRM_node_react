import Swal from 'sweetalert2';
import DynamicForm from '../../components/forms/DynamicForm.jsx';
import { useSetUser } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import { getUserDataFromToken } from '../../Services/GetUserDataToken.js';
import { getFullName } from '../../Services/getFullName.js';
import { loginUserSchema } from '../../Schema/Error/AuthSchema.js';
import { InitialLayout } from '../../layout/InitialLayout.jsx';
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
                    position: 'top-end',
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
                    document.getElementById('passwordLogin').value = '';  // Cambia a 'passwordLogin'
                }
            }
        } catch (error) {
            console.error('Error durante el login:', error);
        }
    };
    

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
            idInput: 'passwordLogin',  // Asegúrate de que el ID sea 'passwordLogin'
            required: true,
        },
        {
            name: 'remember',
            label: 'Remember me',
            type: 'checkbox',
            idInputContainer: 'rememberContainer',
            idLabel: 'rememberLabel',
            idInput: 'rememberInput',
            required: false,
        },
        {
            type: 'textWithLink',
            linkText: 'Forgot Password',
            idInputContainer: 'forgotPasswordContainer',
            idLink: 'forgotPassword',
            link: '/forgot-password',
        }
    ];
    

    const idFormLogin = {
        idTitleContainer: 'idTitleContainerLogin',
        idLogo: 'idLogoLogin',
        idSection: 'sectionLogin',
        idFrom: 'idFormLogin',
        idSubTitle:'idTitleLogin',
        subTitle: "Welcome back! Please login to your account.",
        idNavLogin: "idNavLogin",
        submitBtn: "submitBtnLogin",
    }

    return (
        <InitialLayout className="login-page-container">
            <section className="login-page-form-container">
                <DynamicForm
                    title="Login"
                    imgTitle="/Logo_cosmic.svg"
                    imgTitleActive='true'
                    idCustom={idFormLogin}
                    onSubmit={handleLoginSubmit}
                    schema={loginUserSchema}
                    fields={loginFormFields}
                    buttonText={'Login'}
                    extraButtons={[]}
                />
            </section>
        </InitialLayout>
    );
};
