import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const URL = import.meta.env.VITE_URL;

export const ValidationPage = () => {
  const { registration_code } = useParams();
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(true); // Estado para controlar la visibilidad de la imagen

  useEffect(() => {
    const validateRegistration = async () => {
      try {
        const response = await fetch(
          `${URL}/user/validate/${registration_code}`,
          {
            method: 'PUT',
            credentials: 'include',
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log('Cuenta validada con éxito:', responseData);
          handleSuccess();
        } else {
          handleValidationFailure();
        }
      } catch (error) {
        console.error('Error durante la validación:', error);
        handleValidationFailure();
      }
    };

    const handleSuccess = () => {
      setShowImage(true);
      Swal.fire({
        title: '¡Validación exitosa!',
        text: 'Ya puedes iniciar sesión, te recomendamos cambiar tu contraseña lo antes posible',
        icon: 'success',
        allowOutsideClick: false,
      }).then((result) => {
        if (
          result.isConfirmed ||
          result.dismiss === Swal.DismissReason.overlay ||
          result.dismiss === Swal.DismissReason.esc ||
          result.dismiss === Swal.DismissReason.close
        ) {
          navigate('/');
        }
      });
    };

    const handleValidationFailure = () => {
      setShowImage(true);
      Swal.fire({
        title: '¡Cuenta ya validada!',
        text: 'Ya tienes la cuenta validada, inicia sesión',
        icon: 'warning',
        allowOutsideClick: false,
      }).then((result) => {
        if (
          result.isConfirmed ||
          result.dismiss === Swal.DismissReason.overlay ||
          result.dismiss === Swal.DismissReason.esc ||
          result.dismiss === Swal.DismissReason.close
        ) {
          navigate('/');
        }
      });
    };

    validateRegistration();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registration_code, navigate]);

  return (
    <>
      {showImage && (
        <img
          src="/cosmic.png"
          alt="Logo Cosmic"
          style={{ width: '100%', height: '100vh' }}
        />
      )}
    </>
  );
};
