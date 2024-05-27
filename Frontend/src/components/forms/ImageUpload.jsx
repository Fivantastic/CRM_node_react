import { useState } from 'react';
import { useUser } from '../../context/authContext.jsx';
import Swal from 'sweetalert2'; // Asegúrate de importar SweetAlert2
const URL = import.meta.env.VITE_URL;

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const token = useUser();

  const handleImageUpload = async () => {
    if (!selectedImage) {
      console.error('No se ha seleccionado ninguna imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedImage);

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
        console.log('Avatar actualizada satisfactorio:', responseData);

        // Aqui puedes mostrar un mensaje de exito con Swal que sale abajo a la derecha de la pantalla y dura 3 segundos
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
          title: 'Actualización Realizada con exito ! ',
        });
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Actualización avatar fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const selectImage = async () => {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your profile picture',
      },
    });

    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: 'Tu foto de perfil',
          imageUrl: e.target.result,
          imageAlt: 'Tu foto de perfil',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="image-upload-container">
      <button id="btn-selectAvatar" onClick={selectImage}>
        <img
          src="/userBlue.svg"
          alt=""
        />
        <p>Cambiar Avatar</p>
      </button>
      <button id="btn-send" onClick={handleImageUpload}>
        Subir
      </button>
    </div>
  );
}

export default ImageUpload;
