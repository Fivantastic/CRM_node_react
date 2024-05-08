import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { useUser } from '../../../context/authContext.jsx';
import Swal from 'sweetalert2';

export const UpdateProduct = ({ product, onUpdateSale }) => {
  // Asi obtienes el token del usuario de la sesión
  const token = useUser();