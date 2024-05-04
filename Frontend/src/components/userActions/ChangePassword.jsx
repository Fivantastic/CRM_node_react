import { useState } from 'react';
import Swal from 'sweetalert2';

function ChangePasswordModal() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      showErrorAlert('Oops...', 'New password and confirm password do not match!');
      return;
    }

    // Aquí agregarías la lógica para cambiar la contraseña, por ejemplo, hacer una solicitud HTTP al servidor

    // Muestra el toast de éxito
    showSuccessAlert('Password changed successfully!');
    
    // Limpiar los campos
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: 'success',
      title: message,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
  };

  const showErrorAlert = (title, message) => {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message
    });
  };

  const handleClickChangePassword = () => {
    Swal.fire({
      title: "Cambiar contraseña",
      html:
        `<input id="current-password" class="swal2-input" type="password" placeholder="Current Password" value=${currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}>` +
        `<input id="new-password" class="swal2-input" type="password" placeholder="New Password" value=${newPassword} onChange={(e) => setNewPassword(e.target.value)}>` +
        `<input id="confirm-password" class="swal2-input" type="password" placeholder="Confirm New Password" value=${confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('current-password').value,
          document.getElementById('new-password').value,
          
        ];
      },
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Change Password',
      preDeny: () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleChangePassword();
      }
    });
  };

  return (
    <div>
      <button onClick={handleClickChangePassword}>
        Change Password
      </button>
    </div>
  );
}

export default ChangePasswordModal;
