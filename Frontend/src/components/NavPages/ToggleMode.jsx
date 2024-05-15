import { useState } from 'react';
import './toggleMode.css';

export const ToggleMode = ({ onClick }) => {
    // Estado para controlar el modo
    const [isListView, setIsListView] = useState(true);

    // Función para manejar el cambio de modo
    const handleModeChange = () => {
        setIsListView(prevMode => !prevMode);
        onClick(); // Llama a la función onClick pasada como prop para notificar el cambio de modo
    };

    return (
        <div className="checkbox-wrapper-35">
            <input
                value="private"
                name="mode"
                id="mode"
                type="checkbox"
                className="mode"
                checked={isListView} // Establece el estado checked del checkbox según el modo actual
                onChange={handleModeChange} // Maneja el cambio de modo
            />
            <label className="modeLabel" htmlFor="mode">
                <span className="switch-x-text">Modo </span>
                <span className="switch-x-toggletext">
                    <span className="switch-x-unchecked">
                        <span className="switch-x-hiddenlabel">Unchecked: </span>Lista
                    </span>
                    <span className="switch-x-checked">
                        <span className="switch-x-hiddenlabel">Checked: </span>Ventana
                    </span>
                </span>
            </label>
        </div>
    );
};