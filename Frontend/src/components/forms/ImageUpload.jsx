import { useUser, useSetUserInfo } from '../../context/authContext.jsx';
import Swal from 'sweetalert2';
const URL = import.meta.env.VITE_URL;

function ImageUpload({ updateinfo }) {
  const token = useUser();
  const setUserInfo = useSetUserInfo();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch(`${URL}/user/update`, {
        method: 'PUT',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Avatar actualizada satisfactoriamente:', responseData);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Actualización realizada con éxito!',
        });

        setUserInfo(responseData.data); // Actualiza el usuario en el contexto

        if (updateinfo) {
          updateinfo(responseData.data);
        }
      } else {
        const errorData = await response.json();
        console.error('Actualización avatar fallida:', errorData);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el avatar. Por favor, intenta nuevamente.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error. Por favor, intenta nuevamente.',
      });
    }
  };

  const selectImage = async () => {
    const { value: file } = await Swal.fire({
      title: 'Selecciona una imagen',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Sube tu foto de perfil',
      },
      showCancelButton: true,
      confirmButtonText: 'Cambiar',
      cancelButtonText: 'Cancelar',
      preConfirm: (file) => {
        return new Promise((resolve, reject) => {
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              Swal.fire({
                title: 'Tu foto de perfil',
                imageUrl: e.target.result,
                imageAlt: 'Tu foto de perfil',
                showCancelButton: true,
                confirmButtonText: 'Subir',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                  resolve(file);
                } else {
                  reject('No file selected');
                }
              });
            };
            reader.readAsDataURL(file);
          } else {
            reject('No file selected');
          }
        });
      },
    });

    if (file) {
      handleImageUpload(file);
    } else {
      console.error('No se ha seleccionado ninguna imagen.');
    }
  };

  return (
    <div id="image-upload-container">
      <button id="btn-selectAvatar" onClick={selectImage}>
        <img src="/userBlue.svg" alt="" />
        <p>Cambiar Avatar</p>
      </button>
    </div>
  );
}

export default ImageUpload;
