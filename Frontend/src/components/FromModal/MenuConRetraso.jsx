import { useEffect, useState } from 'react';
import { components } from 'react-select';

const MenuConRetraso = (props) => {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setMostrarMenu(true);
    }, 150);

    return () => clearTimeout(temporizador);
  }, []);

  if (!mostrarMenu) return null;
  return <components.Menu {...props} />;
};

export default MenuConRetraso;
