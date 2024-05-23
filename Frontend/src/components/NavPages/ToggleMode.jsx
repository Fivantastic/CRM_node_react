import './toggleMode.css';

export const ToggleMode = ({ onClick, isListView }) => {
    // Función para manejar el cambio de modo
    const handleModeChange = () => {
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
                checked={isListView}
                onChange={handleModeChange} 
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
