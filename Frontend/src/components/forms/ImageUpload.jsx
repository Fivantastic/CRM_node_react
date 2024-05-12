import { useState } from 'react';
import { getUserDataFromToken } from '../../Services/GetUserDataToken.js';
import { useUser } from '../../context/authContext.jsx';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const token = useUser();
  const { id_user } = getUserDataFromToken(token);

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('avatar', selectedImage);

    try {
      const response = await fetch(
        `http://localhost:3000/user/avatar/${id_user}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log('Imagen cargada con éxito');
      } else {
        console.log('Error al cargar la imagen');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <button onClick={handleImageUpload}>Subir imagen</button>
    </div>
  );
}

export default ImageUpload;
