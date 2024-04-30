export const generateExpiryDate = (due_date) => {
   // Obtener la fecha actual
   let fechaActual = new Date();
   let expiry_date;

   // Verificar si se proporcionó la fecha de vencimiento en la petición
   if (due_date) {
       // Si se proporcionó, utilizar la fecha proporcionada
       expiry_date = new Date(due_date);
   } else {
       // Si no se proporcionó, calcular la fecha de vencimiento por defecto (1 mes después de la fecha actual)
       expiry_date = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, fechaActual.getDate());
   }

   return expiry_date;
}