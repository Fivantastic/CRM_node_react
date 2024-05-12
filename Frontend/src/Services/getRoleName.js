  // Convertir el rol
  export const getRoleName = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'deliverer':
        return 'Repartidor';
      case 'salesAgent':
        return 'Comercial';
      default:
        return role;
    }
  };